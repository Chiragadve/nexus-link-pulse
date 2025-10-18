import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PostForm, { Post } from '@/components/PostForm';
import PostCard from '@/components/PostCard';
import { useAuth } from '@/contexts/AuthContext';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Emma Davis',
      description: 'Just finished an amazing workout session! 💪 Feeling energized and ready for the day!',
      likes: 12,
      likedBy: [],
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      id: '2',
      userId: '3',
      userName: 'Mike Wilson',
      description: 'Check out this stunning sunset from my evening walk! 🌅',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      likes: 24,
      likedBy: [],
      timestamp: new Date(Date.now() - 30 * 60000)
    },
    {
      id: '3',
      userId: '4',
      userName: 'Sarah Johnson',
      description: 'Coffee and code - perfect combination for a productive morning! ☕️💻',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
      likes: 18,
      likedBy: [],
      timestamp: new Date(Date.now() - 2 * 60 * 60000)
    }
  ]);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const isLiked = post.likedBy.includes(user!.id);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked
            ? post.likedBy.filter(userId => userId !== user!.id)
            : [...post.likedBy, user!.id]
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Post Creation Form */}
        <PostForm onPostCreated={handlePostCreated} />

        {/* Posts Feed */}
        <div className="mt-6 space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Feed;
