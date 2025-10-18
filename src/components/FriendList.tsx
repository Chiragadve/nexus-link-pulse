import { useState } from 'react';
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

interface Friend {
  id: string;
  name: string;
  email: string;
}

const FriendList = () => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Emma Davis', email: 'emma@example.com' },
    { id: '2', name: 'Mike Wilson', email: 'mike@example.com' },
    { id: '3', name: 'Sarah Johnson', email: 'sarah@example.com' },
    { id: '4', name: 'Alex Chen', email: 'alex@example.com' }
  ]);

  const handleRemove = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  return (
    <div className="bg-card rounded-xl shadow-md border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">My Friends</h2>
        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">
          {friends.length}
        </span>
      </div>

      {friends.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No friends yet. Start connecting!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {friends.map((friend, index) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md"
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(135deg, hsl(210, 100%, 50%), hsl(170, 100%, 40%))'
                      : 'linear-gradient(135deg, hsl(210, 100%, 50%), hsl(280, 100%, 50%))'
                  }}
                >
                  {friend.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground">{friend.email}</p>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    Remove
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove friend?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove {friend.name} from your friends?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleRemove(friend.id)}>
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;
