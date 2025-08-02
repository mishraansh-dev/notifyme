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
  role: 'resident' | 'admin';
  block?: string;
  floor?: string;
  room?: string;
}

export interface NavLink {
  name: string;
  href: string;
  current?: boolean;
}
