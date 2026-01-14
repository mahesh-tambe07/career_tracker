import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Chip, IconButton, Switch, Alert } from '@mui/material';
import {
  NotificationsActive,
  Close,
  Warning,
  CheckCircle,
  Info,
  AlarmOn,
} from '@mui/icons-material';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
}

export function NotificationsReminders() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'LeetCode Target Missed',
      message: 'You missed your daily target yesterday',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'info',
      title: 'New Job Posted',
      message: 'Google posted a new SDE position',
      time: '5 hours ago',
    },
    {
      id: '3',
      type: 'success',
      title: '7-Day Streak!',
      message: 'Congratulations on maintaining your streak',
      time: '1 day ago',
    },
  ]);

  const [remindersEnabled, setRemindersEnabled] = useState({
    email: true,
    push: true,
    leetcode: true,
    learning: false,
  });

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <Warning sx={{ color: '#F59E0B' }} />;
      case 'success':
        return <CheckCircle sx={{ color: '#10B981' }} />;
      case 'info':
        return <Info sx={{ color: '#06B6D4' }} />;
      default:
        return <Info sx={{ color: '#06B6D4' }} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' };
      case 'success':
        return { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)' };
      case 'info':
        return { bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.3)' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.03)', border: 'rgba(255, 255, 255, 0.06)' };
    }
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(14, 19, 36, 0.8) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <CardHeader
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <NotificationsActive sx={{ color: '#06B6D4' }} />
              <span>Notifications & Reminders</span>
            </div>
            <Chip
              label={notifications.length}
              size="small"
              sx={{
                backgroundColor: '#EF4444',
                color: '#fff',
                fontWeight: 600,
              }}
            />
          </div>
        }
      />
      <CardContent>
        <div className="space-y-4">
          {/* Notifications */}
          <div className="space-y-2">
            {notifications.map((notification) => {
              const colors = getNotificationColor(notification.type);
              return (
                <Alert
                  key={notification.id}
                  severity={notification.type === 'warning' ? 'warning' : 'info'}
                  icon={getNotificationIcon(notification.type)}
                  action={
                    <IconButton
                      size="small"
                      onClick={() => removeNotification(notification.id)}
                      sx={{ color: 'inherit' }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  }
                  sx={{
                    backgroundColor: colors.bg,
                    border: `1px solid ${colors.border}`,
                    '& .MuiAlert-message': { width: '100%' },
                  }}
                >
                  <div>
                    <div className="font-semibold">{notification.title}</div>
                    <div className="text-sm opacity-90">{notification.message}</div>
                    <div className="text-xs opacity-70 mt-1">{notification.time}</div>
                  </div>
                </Alert>
              );
            })}
          </div>

          {/* Reminder Settings */}
          <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
            <div className="flex items-center gap-2 mb-4">
              <AlarmOn fontSize="small" sx={{ color: '#06B6D4' }} />
              <span className="text-sm font-semibold">Reminder Settings</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                <span className="text-sm text-foreground">Email Notifications</span>
                <Switch
                  checked={remindersEnabled.email}
                  onChange={(e) =>
                    setRemindersEnabled({ ...remindersEnabled, email: e.target.checked })
                  }
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#0A6CF1' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#0A6CF1',
                    },
                  }}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                <span className="text-sm text-foreground">Push Notifications</span>
                <Switch
                  checked={remindersEnabled.push}
                  onChange={(e) =>
                    setRemindersEnabled({ ...remindersEnabled, push: e.target.checked })
                  }
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#0A6CF1' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#0A6CF1',
                    },
                  }}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                <span className="text-sm text-foreground">LeetCode Reminders</span>
                <Switch
                  checked={remindersEnabled.leetcode}
                  onChange={(e) =>
                    setRemindersEnabled({ ...remindersEnabled, leetcode: e.target.checked })
                  }
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#0A6CF1' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#0A6CF1',
                    },
                  }}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                <span className="text-sm text-foreground">Learning Reminders</span>
                <Switch
                  checked={remindersEnabled.learning}
                  onChange={(e) =>
                    setRemindersEnabled({ ...remindersEnabled, learning: e.target.checked })
                  }
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#0A6CF1' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#0A6CF1',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
