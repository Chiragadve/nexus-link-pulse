import Navbar from '@/components/Navbar';
import FriendList from '@/components/FriendList';

const Friends = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <FriendList />
      </main>
    </div>
  );
};

export default Friends;
