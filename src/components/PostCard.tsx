import { useState } from 'react';
import { Post } from './PostForm';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
}

const PostCard = ({ post, onDelete, onLike }: PostCardProps) => {
  const { user } = useAuth();
  const isOwner = user?.id === post.userId;
  const isLiked = post.likedBy.includes(user?.id || '');

  return (
    <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-white font-semibold text-lg shadow-md">
            {post.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{post.userName}</h3>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>

        {isOwner && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                🗑️
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete post?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(post.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {post.description && (
          <p className="text-foreground whitespace-pre-wrap">{post.description}</p>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <div className="w-full">
          <img
            src={post.image}
            alt="Post content"
            className="w-full max-h-96 object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-6 pt-4 border-t border-border">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isLiked
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-xl">{isLiked ? '👍' : '👍🏻'}</span>
            <span className="font-medium">{post.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
