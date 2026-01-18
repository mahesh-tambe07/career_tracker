//profile.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  Email,
  CalendarMonth,
  ExitToApp,
  Edit,
  Save,
  Cancel,
  Person,
  Phone,
  LocationOn,
  Work,
  CameraAlt,
} from '@mui/icons-material';
import { toast } from 'sonner';

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  jobTitle?: string;
  bio?: string;
  joinedDate: string;
}

export function Profile({ open, onClose }: ProfileProps) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setEditedData(parsedUser);
    }
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully');
    navigate('/login');
    onClose();
  };

  const handleSave = () => {
    if (!editedData) return;

    // Validate required fields
    if (!editedData.name || !editedData.email) {
      toast.error('Name and email are required');
      return;
    }

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(editedData));
    setUserData(editedData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!userData || !editedData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: 'rgba(14, 19, 36, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(10, 108, 241, 0.2)',
          boxShadow: '0 8px 32px rgba(10, 108, 241, 0.15)',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header with gradient */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
            padding: 4,
            position: 'relative',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#fff',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ textAlign: 'center', pt: 2 }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: '0 auto',
                  fontSize: 48,
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {userData.name.charAt(0).toUpperCase()}
              </Avatar>
              {isEditing && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 36,
                    height: 36,
                    background: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      background: '#fff',
                    },
                  }}
                >
                  <CameraAlt sx={{ fontSize: 20, color: '#0A6CF1' }} />
                </IconButton>
              )}
            </Box>
            {!isEditing ? (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    mt: 2,
                  }}
                >
                  {userData.name}
                </Typography>
                {userData.jobTitle && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      mt: 0.5,
                    }}
                  >
                    {userData.jobTitle}
                  </Typography>
                )}
              </>
            ) : (
              <TextField
                fullWidth
                value={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
                placeholder="Your Name"
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            )}
          </Box>
        </Box>

        {/* Profile Information */}
        <Box sx={{ p: 4, maxHeight: '60vh', overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {isEditing ? 'Edit Profile Information' : 'Profile Information'}
            </Typography>
            {!isEditing && (
              <IconButton
                onClick={() => setIsEditing(true)}
                sx={{
                  background: 'rgba(10, 108, 241, 0.1)',
                  '&:hover': {
                    background: 'rgba(10, 108, 241, 0.2)',
                  },
                }}
              >
                <Edit sx={{ fontSize: 20, color: '#0A6CF1' }} />
              </IconButton>
            )}
          </Box>

          {/* Email Field */}
          <Box sx={{ mb: 3 }}>
            {!isEditing ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'rgba(10, 108, 241, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <Email sx={{ fontSize: 20, color: '#0A6CF1' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Email Address
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, wordBreak: 'break-all' }}>
                    {userData.email}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={editedData.email}
                onChange={(e) =>
                  setEditedData({ ...editedData, email: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#0A6CF1' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
            )}
          </Box>

          {/* Phone Field */}
          <Box sx={{ mb: 3 }}>
            {!isEditing ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'rgba(10, 108, 241, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <Phone sx={{ fontSize: 20, color: '#0A6CF1' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Phone Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userData.phone || 'Not provided'}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={editedData.phone || ''}
                onChange={(e) =>
                  setEditedData({ ...editedData, phone: e.target.value })
                }
                placeholder="+1 (555) 000-0000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: '#0A6CF1' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
            )}
          </Box>

          {/* Job Title Field */}
          <Box sx={{ mb: 3 }}>
            {!isEditing ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'rgba(10, 108, 241, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <Work sx={{ fontSize: 20, color: '#0A6CF1' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Job Title
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userData.jobTitle || 'Not provided'}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <TextField
                fullWidth
                label="Job Title"
                value={editedData.jobTitle || ''}
                onChange={(e) =>
                  setEditedData({ ...editedData, jobTitle: e.target.value })
                }
                placeholder="e.g., Software Engineer"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work sx={{ color: '#0A6CF1' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
            )}
          </Box>

          {/* Location Field */}
          <Box sx={{ mb: 3 }}>
            {!isEditing ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'rgba(10, 108, 241, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <LocationOn sx={{ fontSize: 20, color: '#0A6CF1' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userData.location || 'Not provided'}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <TextField
                fullWidth
                label="Location"
                value={editedData.location || ''}
                onChange={(e) =>
                  setEditedData({ ...editedData, location: e.target.value })
                }
                placeholder="e.g., San Francisco, CA"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn sx={{ color: '#0A6CF1' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
            )}
          </Box>

          {/* Bio Field */}
          {isEditing && (
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={editedData.bio || ''}
                onChange={(e) =>
                  setEditedData({ ...editedData, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                      <Person sx={{ color: '#0A6CF1' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
            </Box>
          )}

          {!isEditing && userData.bio && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'rgba(10, 108, 241, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <Person sx={{ fontSize: 20, color: '#0A6CF1' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Bio
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {userData.bio}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* Member Since */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: 'rgba(10, 108, 241, 0.1)',
                  flexShrink: 0,
                }}
              >
                <CalendarMonth sx={{ fontSize: 20, color: '#0A6CF1' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatDate(userData.joinedDate)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

          {/* Action Buttons */}
          {!isEditing ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderRadius: '12px',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'rgba(10, 108, 241, 0.3)',
                  color: '#0A6CF1',
                  '&:hover': {
                    borderColor: '#0A6CF1',
                    background: 'rgba(10, 108, 241, 0.1)',
                  },
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                sx={{
                  borderRadius: '12px',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0854C1 0%, #1876D1 100%)',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Cancel />}
                onClick={handleCancel}
                sx={{
                  borderRadius: '12px',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#9CA3AF',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Save />}
                onClick={handleSave}
                sx={{
                  borderRadius: '12px',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0854C1 0%, #1876D1 100%)',
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}