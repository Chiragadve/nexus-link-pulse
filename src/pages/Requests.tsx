import Navbar from '@/components/Navbar';
import FriendRequests from '@/components/FriendRequests';

const Requests = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <FriendRequests />
      </main>
    </div>
  );
};

export default Requests;
