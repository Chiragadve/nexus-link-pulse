import { useState } from 'react';
import FriendRequestCard from './FriendRequestCard';
import { useToast } from '@/hooks/use-toast';

interface FriendRequest {
  id: string;
  name: string;
  email: string;
}

const FriendRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<FriendRequest[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com' },
    { id: '2', name: 'Lisa Anderson', email: 'lisa@example.com' },
    { id: '3', name: 'David Brown', email: 'david@example.com' }
  ]);

  const handleAccept = (id: string) => {
    const request = requests.find(r => r.id === id);
    setRequests(requests.filter(r => r.id !== id));
    toast({
      title: "Friend request accepted",
      description: `You are now friends with ${request?.name}!`,
    });
  };

  const handleReject = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
    toast({
      title: "Friend request rejected",
      description: "The request has been declined.",
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-md border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Friend Requests</h2>
        <span className="bg-accent/10 text-accent px-4 py-1 rounded-full font-semibold">
          {requests.length}
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pending friend requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <FriendRequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
