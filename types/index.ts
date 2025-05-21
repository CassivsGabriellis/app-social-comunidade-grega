export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  postId?: string;
  createdAt: string;
  read: boolean;
}
