// Common types for the NotifyMe application

export interface Notice {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  tag?: string;
  category?: string;
  location?: string;
  author?: string;
  authorId?: string;
  isPinned?: boolean;
  expirationDate?: Date;
  status?: 'pending' | 'ongoing' | 'completed';
  assignedOrg?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  reactions?: {
    likes: number;
    thumbsUp: number;
    sad: number;
  };
  comments?: Comment[];
}

export interface NoticeFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  tag?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'org' | 'warden';
  block?: string;
  floor?: string;
  room?: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  submittedAt?: Date;
  assignedTo?: string;
  comments?: string[];
}

export interface NavLink {
  name: string;
  href: string;
  current?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  userId?: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface ToastNotification {
  id: string;
  title?: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  isVisible: boolean;
}
