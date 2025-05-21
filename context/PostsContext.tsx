import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { mockPosts } from '@/data/mockData';
import { Post, Comment } from '@/types';

interface PostsContextType {
  posts: Post[];
  loading: boolean;
  addPost: (post: Post) => void;
  addComment: (postId: string, comment: Comment) => void;
  likePost: (postId: string) => void;
}

const PostsContext = createContext<PostsContextType | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setPosts(mockPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const addComment = (postId: string, comment: Comment) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), comment],
          };
        }
        return p;
      })
    );
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        addPost,
        addComment,
        likePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }

  return context;
}
