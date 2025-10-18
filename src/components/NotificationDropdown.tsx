import { useEffect, useRef } from 'react';
import { Notification } from './NotificationBell';
import { formatDistanceToNow } from 'date-fns';

interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationDropdown = ({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case 'friend_request':
        return `${notification.sender} sent you a friend request`;
      case 'post_like':
        return `${notification.sender} liked your post`;
      case 'new_post':
        return `${notification.sender} shared a new post`;
      default:
        return '';
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'friend_request':
        return '👥';
      case 'post_like':
        return '👍';
      case 'new_post':
        return '📝';
      default:
        return '🔔';
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/50">
        <h3 className="font-semibold text-foreground">Notifications</h3>
        <button
          onClick={onMarkAllAsRead}
          className="text-sm text-primary hover:text-primary-hover transition-colors"
        >
          Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => onMarkAsRead(notification.id)}
              className={`p-4 border-b border-border last:border-b-0 cursor-pointer transition-colors hover:bg-secondary/50 ${
                !notification.read ? 'bg-accent/10' : ''
              }`}
            >
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    {getNotificationText(notification)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
