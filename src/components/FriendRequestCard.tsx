import { Button } from './ui/button';

interface FriendRequest {
  id: string;
  name: string;
  email: string;
}

interface FriendRequestCardProps {
  request: FriendRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const FriendRequestCard = ({ request, onAccept, onReject }: FriendRequestCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
          {request.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{request.name}</h3>
          <p className="text-sm text-muted-foreground">{request.email}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onAccept(request.id)} size="sm">
          Accept
        </Button>
        <Button 
          onClick={() => onReject(request.id)} 
          variant="outline" 
          size="sm"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
