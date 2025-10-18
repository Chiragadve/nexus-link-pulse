import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  userId: string;
  userName: string;
  description: string;
  image?: string;
  likes: number;
  likedBy: string[];
  timestamp: Date;
}

interface PostFormProps {
  onPostCreated: (post: Post) => void;
}

const PostForm = ({ onPostCreated }: PostFormProps) => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or GIF image.",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() && !imagePreview) {
      toast({
        variant: "destructive",
        title: "Empty post",
        description: "Please add some text or an image.",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newPost: Post = {
      id: Date.now().toString(),
      userId: user!.id,
      userName: user!.name,
      description,
      image: imagePreview || undefined,
      likes: 0,
      likedBy: [],
      timestamp: new Date()
    };

    onPostCreated(newPost);
    setDescription('');
    setImagePreview(null);
    setLoading(false);

    toast({
      title: "Post created!",
      description: "Your post has been shared successfully.",
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-md border border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Input */}
        <Textarea
          placeholder={`What's on your mind, ${user?.name}?`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] resize-none"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                <span>📷</span>
                <span className="text-sm font-medium">Photo</span>
              </span>
            </label>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Posting...
              </>
            ) : (
              'Post'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
