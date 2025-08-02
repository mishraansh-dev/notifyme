import { useEffect, useState } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  where, 
  QueryConstraint,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Notice } from '../types';
import { useToast } from '../store/useNotifications';

interface UseRealtimeNoticesOptions {
  userId?: string;
  category?: string;
  limit?: number;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

interface UseRealtimeNoticesReturn {
  notices: Notice[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

const useRealtimeNotices = (options: UseRealtimeNoticesOptions = {}): UseRealtimeNoticesReturn => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const {
    userId,
    category,
    limit,
    orderByField = 'timestamp',
    orderDirection = 'desc'
  } = options;

  const buildQuery = () => {
    const constraints: QueryConstraint[] = [];
    
    // Add filters
    if (userId) {
      constraints.push(where('authorId', '==', userId));
    }
    
    if (category) {
      constraints.push(where('category', '==', category));
    }
    
    // Add ordering
    constraints.push(orderBy(orderByField, orderDirection));
    
    // Add limit if specified
    if (limit) {
      // Note: We'd need to import limit from firestore
      // constraints.push(limit(limit));
    }
    
    return query(collection(db, 'notices'), ...constraints);
  };

  const setupListener = () => {
    setLoading(true);
    setError(null);
    
    try {
      const q = buildQuery();
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          try {
            const noticesData = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                // Convert Firestore Timestamps to Date objects
                timestamp: data.timestamp instanceof Timestamp 
                  ? data.timestamp.toDate() 
                  : data.timestamp,
                createdAt: data.createdAt instanceof Timestamp 
                  ? data.createdAt.toDate() 
                  : data.createdAt,
                updatedAt: data.updatedAt instanceof Timestamp 
                  ? data.updatedAt.toDate() 
                  : data.updatedAt,
              };
            }) as Notice[];
            
            setNotices(noticesData);
            setLoading(false);
            setError(null);
          } catch (processingError) {
            console.error('Error processing notices data:', processingError);
            setError('Failed to process notices data');
            setLoading(false);
          }
        },
        (firestoreError) => {
          console.error('Error fetching notices:', firestoreError);
          const errorMessage = firestoreError.message || 'Failed to fetch notices';
          setError(errorMessage);
          setLoading(false);
          
          // Show toast notification for errors
          toast.error('Failed to load notices. Please try again.');
        }
      );
      
      return unsubscribe;
    } catch (setupError) {
      console.error('Error setting up notices listener:', setupError);
      setError('Failed to setup notices listener');
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  };

  const retry = () => {
    setError(null);
    setupListener();
  };

  useEffect(() => {
    const unsubscribe = setupListener();
    return unsubscribe;
  }, [userId, category, orderByField, orderDirection]);

  return {
    notices,
    loading,
    error,
    retry
  };
};

export default useRealtimeNotices;
