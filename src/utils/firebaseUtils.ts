import { 
  doc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { NoticeStatus } from '../components/StatusBadge';

export interface NoticeData {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  tag?: string;
  author: string;
  authorId: string;
  status: NoticeStatus;
  assignedOrg?: string | null;
  isPinned: boolean;
  timestamp: any;
  createdAt: any;
  updatedAt: any;
  statusUpdatedAt?: any;
  reactions: {
    likes: number;
    thumbsUp: number;
    sad: number;
  };
}

/**
 * Assigns a notice to an organization
 */
export const assignNotice = async (noticeId: string, orgName: string): Promise<void> => {
  try {
    const noticeRef = doc(db, 'notices', noticeId);
    await updateDoc(noticeRef, {
      assignedOrg: orgName,
      status: 'ongoing' as NoticeStatus,
      updatedAt: serverTimestamp(),
      statusUpdatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error assigning notice:', error);
    throw new Error('Failed to assign notice');
  }
};

/**
 * Updates the status of a notice
 */
export const updateNoticeStatus = async (
  noticeId: string, 
  newStatus: NoticeStatus
): Promise<void> => {
  try {
    const noticeRef = doc(db, 'notices', noticeId);
    await updateDoc(noticeRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
      statusUpdatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating notice status:', error);
    throw new Error('Failed to update notice status');
  }
};

/**
 * Fetches notices for organization dashboard
 * Returns unassigned notices and notices assigned to the specified org
 */
export const fetchOrgNotices = async (orgName?: string): Promise<NoticeData[]> => {
  try {
    const noticesRef = collection(db, 'notices');
    
    // Query for unassigned notices
    const unassignedQuery = query(
      noticesRef,
      where('assignedOrg', '==', null),
      orderBy('createdAt', 'desc')
    );
    
    const unassignedSnapshot = await getDocs(unassignedQuery);
    const unassignedNotices: NoticeData[] = [];
    
    unassignedSnapshot.forEach((doc) => {
      unassignedNotices.push({
        id: doc.id,
        ...doc.data()
      } as NoticeData);
    });

    let assignedNotices: NoticeData[] = [];
    
    // Query for notices assigned to this org (if orgName provided)
    if (orgName) {
      const assignedQuery = query(
        noticesRef,
        where('assignedOrg', '==', orgName),
        orderBy('createdAt', 'desc')
      );
      
      const assignedSnapshot = await getDocs(assignedQuery);
      
      assignedSnapshot.forEach((doc) => {
        assignedNotices.push({
          id: doc.id,
          ...doc.data()
        } as NoticeData);
      });
    }

    // Combine and sort by creation date (newest first)
    const allNotices = [...unassignedNotices, ...assignedNotices];
    return allNotices.sort((a, b) => {
      const aTime = a.createdAt?.toDate?.() || new Date(0);
      const bTime = b.createdAt?.toDate?.() || new Date(0);
      return bTime.getTime() - aTime.getTime();
    });
    
  } catch (error) {
    console.error('Error fetching org notices:', error);
    throw new Error('Failed to fetch notices');
  }
};

/**
 * Fetches all notices (for general viewing)
 */
export const fetchAllNotices = async (): Promise<NoticeData[]> => {
  try {
    const noticesRef = collection(db, 'notices');
    const noticesQuery = query(noticesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(noticesQuery);
    
    const notices: NoticeData[] = [];
    snapshot.forEach((doc) => {
      notices.push({
        id: doc.id,
        ...doc.data()
      } as NoticeData);
    });
    
    return notices;
  } catch (error) {
    console.error('Error fetching all notices:', error);
    throw new Error('Failed to fetch notices');
  }
};

/**
 * Formats timestamp for display
 */
export const formatTimestamp = (timestamp: any): string => {
  if (!timestamp) return 'Unknown';
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } catch (error) {
    return 'Invalid date';
  }
};
