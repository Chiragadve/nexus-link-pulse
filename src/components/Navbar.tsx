import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from './NotificationBell';
import { Button } from './ui/button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center transform transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">SocialConnect</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'text-primary font-semibold bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary'
              }`}
            >
              <span className="text-xl">🏠</span>
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/friends"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/friends') 
                  ? 'text-primary font-semibold bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary'
              }`}
            >
              <span className="text-xl">👥</span>
              <span className="hidden sm:inline">Friends</span>
            </Link>
            <Link
              to="/requests"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/requests') 
                  ? 'text-primary font-semibold bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary'
              }`}
            >
              <span className="text-xl">✉️</span>
              <span className="hidden sm:inline">Requests</span>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <NotificationBell />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-lg shadow-md">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline font-medium text-foreground">{user?.name}</span>
            </div>

            <Button
              onClick={handleLogout}
              variant="destructive"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
