//Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Work,
  School,
  Code,
  CalendarMonth,
  Notifications,
  Person,
} from '@mui/icons-material';
import { Toaster } from 'sonner';
import { Profile } from '@/app/components/Profile';
import { ReferralCompanies } from '@/app/components/ReferralCompanies';
import { JobTracker } from '@/app/components/JobTracker';
import { LinkedInMessageGenerator } from '@/app/components/LinkedInMessageGenerator';
import { SkillLearningTracker } from '@/app/components/SkillLearningTracker';
import { LeetCodeChallenge } from '@/app/components/LeetCodeChallenge';
import { CalendarStreakTracker } from '@/app/components/CalendarStreakTracker';
import { NotificationsReminders } from '@/app/components/NotificationsReminders';
import { DashboardStats } from '@/app/components/DashboardStats';
import { MobileWidgets } from '@/app/components/MobileWidgets';

export function Dashboard() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileTab, setMobileTab] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get user data
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || user.email.split('@')[0]);
    }
  }, [navigate]);

  // Refresh user data when profile dialog is closed
  const handleProfileClose = () => {
    setProfileOpen(false);
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || user.email.split('@')[0]);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'jobs', label: 'Job Tracker', icon: <Work /> },
    { id: 'learning', label: 'Learning', icon: <School /> },
    { id: 'leetcode', label: 'LeetCode', icon: <Code /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarMonth /> },
    { id: 'notifications', label: 'Notifications', icon: <Notifications /> },
  ];

  const renderContent = () => {
    // Mobile view with tabs
    if (window.innerWidth < 768) {
      return (
        <div className="space-y-6">
          {mobileTab === 0 && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Stats</h2>
              <MobileWidgets />
              <div className="mt-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Overview</h2>
                <div className="space-y-4">
                  <ReferralCompanies />
                  <JobTracker />
                </div>
              </div>
            </>
          )}
          {mobileTab === 1 && (
            <div className="space-y-4">
              <JobTracker />
              <LinkedInMessageGenerator />
            </div>
          )}
          {mobileTab === 2 && (
            <div className="space-y-4">
              <SkillLearningTracker />
              <LeetCodeChallenge />
            </div>
          )}
          {mobileTab === 3 && (
            <div className="space-y-4">
              <CalendarStreakTracker />
              <NotificationsReminders />
            </div>
          )}
        </div>
      );
    }

    // Desktop view
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarStreakTracker />
              <LeetCodeChallenge />
              <ReferralCompanies />
              <JobTracker />
              <LinkedInMessageGenerator />
              <SkillLearningTracker />
            </div>
          </>
        );
      case 'jobs':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JobTracker />
            <LinkedInMessageGenerator />
            <ReferralCompanies />
          </div>
        );
      case 'learning':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillLearningTracker />
            <LeetCodeChallenge />
          </div>
        );
      case 'leetcode':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LeetCodeChallenge />
            <CalendarStreakTracker />
          </div>
        );
      case 'calendar':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CalendarStreakTracker />
            <LeetCodeChallenge />
          </div>
        );
      case 'notifications':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NotificationsReminders />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Toaster position="top-right" theme="dark" />

      {/* Desktop App Bar */}
      <AppBar
        position="fixed"
        sx={{
          background: 'rgba(14, 19, 36, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{
              mr: 2,
              display: { md: 'none' },
              background: 'rgba(10, 108, 241, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(10, 108, 241, 0.3)',
              borderRadius: '12px',
              padding: '10px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background:
                  'linear-gradient(135deg, rgba(10, 108, 241, 0.2) 0%, rgba(30, 136, 229, 0.2) 100%)',
                border: '1px solid rgba(10, 108, 241, 0.5)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(10, 108, 241, 0.3)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 24, color: '#0A6CF1' }} />
          </IconButton>
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <DashboardIcon sx={{ color: '#0A6CF1', fontSize: 32 }} />
              <span className="text-xl font-bold bg-gradient-to-r from-[#0A6CF1] to-[#1E88E5] bg-clip-text text-transparent">
                CareerTrack Pro
              </span>
            </div>
          </div>
          <IconButton
            onClick={() => setProfileOpen(true)}
            sx={{
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Avatar
              sx={{
                background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
                width: 40,
                height: 40,
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: 260,
            background: 'rgba(14, 19, 36, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            boxSizing: 'border-box',
            mt: '64px',
          },
        }}
      >
        <List className="p-4">
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              sx={{
                borderRadius: '12px',
                mb: 1,
                cursor: 'pointer',
                backgroundColor:
                  currentView === item.id ? 'rgba(10, 108, 241, 0.15)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(10, 108, 241, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: currentView === item.id ? '#0A6CF1' : '#9CA3AF' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ color: currentView === item.id ? '#0A6CF1' : '#E8EAED' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { md: 'none' },
          '& .MuiDrawer-paper': {
            width: 260,
            background: 'rgba(14, 19, 36, 0.98)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          },
        }}
      >
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2">
            <DashboardIcon sx={{ color: '#0A6CF1', fontSize: 32 }} />
            <span className="text-lg font-bold text-foreground">CareerTrack Pro</span>
          </div>
        </div>
        <List className="p-4">
          {menuItems.map((item) => {
            // Map drawer items to mobile tabs
            const tabMapping: { [key: string]: number } = {
              dashboard: 0,
              jobs: 1,
              learning: 2,
              leetcode: 2,
              calendar: 3,
              notifications: 3,
            };

            return (
              <ListItem
                key={item.id}
                onClick={() => {
                  const tabIndex = tabMapping[item.id] ?? 0;
                  setMobileTab(tabIndex);
                  setCurrentView(item.id);
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: '13px',
                  mb: 1,
                  cursor: 'pointer',
                  backgroundColor:
                    currentView === item.id ? 'rgba(10, 108, 241, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(10, 108, 241, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: currentView === item.id ? '#0A6CF1' : '#9CA3AF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ color: currentView === item.id ? '#0A6CF1' : '#E8EAED' }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          ml: { xs: 0, md: '260px' },
          mb: { xs: '58px', md: 0 },
        }}
      >
        {renderContent()}
      </Box>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        value={mobileTab}
        onChange={(_, newValue) => setMobileTab(newValue)}
        showLabels
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(14, 19, 36, 0.98)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          '& .MuiBottomNavigationAction-root': {
            color: '#9CA3AF',
            '&.Mui-selected': {
              color: '#0A6CF1',
            },
          },
        }}
      >
        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Jobs" icon={<Work />} />
        <BottomNavigationAction label="Learning" icon={<School />} />
        <BottomNavigationAction label="Activity" icon={<CalendarMonth />} />
      </BottomNavigation>

      {/* Profile Dialog */}
      <Profile open={profileOpen} onClose={handleProfileClose} />
    </>
  );
}