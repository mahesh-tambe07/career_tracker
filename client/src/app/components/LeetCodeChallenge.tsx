import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import {
  ToggleButtonGroup,
  ToggleButton,
  Slider,
  LinearProgress,
  Chip,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Code, TrendingUp, NotificationsActive, Edit } from '@mui/icons-material';

export function LeetCodeChallenge() {
  const [challenge, setChallenge] = useState<'30' | '100' | '365'>('30');
  const [dailyTarget, setDailyTarget] = useState(1);
  const [completedDays, setCompletedDays] = useState(12);
  const [missedDays, setMissedDays] = useState(2);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tempTarget, setTempTarget] = useState(1);

  const totalDays = parseInt(challenge);
  const progress = (completedDays / totalDays) * 100;
  const currentStreak = 5;

  const handleEditOpen = () => {
    setTempTarget(dailyTarget);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (tempTarget >= 1 && tempTarget <= 50) {
      setDailyTarget(tempTarget);
      setEditDialogOpen(false);
    }
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(14, 19, 36, 0.8) 100%)',
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
              <Code sx={{ color: '#F59E0B' }} />
              <span>LeetCode Challenge</span>
            </div>
            <IconButton
              size="small"
              onClick={handleEditOpen}
              sx={{
                color: '#F59E0B',
                '&:hover': { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </div>
        }
      />
      <CardContent>
        <div className="space-y-6">
          {/* Challenge Duration */}
          <div>
            <div className="text-sm text-muted-foreground mb-3">Challenge Duration</div>
            <ToggleButtonGroup
              value={challenge}
              exclusive
              onChange={(_, val) => val && setChallenge(val)}
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  color: '#9CA3AF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="30">30 Days</ToggleButton>
              <ToggleButton value="100">100 Days</ToggleButton>
              <ToggleButton value="365">365 Days</ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* Daily Target Display */}
          <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            <div className="text-sm text-muted-foreground mb-1">Daily Target</div>
            <div className="text-2xl font-bold text-foreground">
              {dailyTarget} {dailyTarget === 1 ? 'problem' : 'problems'}
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-semibold text-foreground">
                {completedDays}/{totalDays} days
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: 4,
                },
              }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp fontSize="small" sx={{ color: '#10B981' }} />
                <span className="text-sm text-muted-foreground">Current Streak</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 mb-1">
                <NotificationsActive fontSize="small" sx={{ color: '#EF4444' }} />
                <span className="text-sm text-muted-foreground">Missed Days</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{missedDays}</div>
            </div>
          </div>

          {/* Warning */}
          {missedDays > 0 && (
            <Alert
              severity="warning"
              sx={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#F59E0B',
                '& .MuiAlert-icon': { color: '#F59E0B' },
              }}
            >
              You've missed {missedDays} {missedDays === 1 ? 'day' : 'days'}. Stay consistent!
            </Alert>
          )}

          <div className="flex gap-2">
            <Chip
              label="Email Reminders Active"
              size="small"
              icon={<NotificationsActive />}
              sx={{
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                color: '#06B6D4',
                '& .MuiChip-icon': { color: '#06B6D4' },
              }}
            />
          </div>
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(14, 19, 36, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{ color: '#E8EAED' }}>
          <div className="flex items-center gap-2">
            <Code sx={{ color: '#F59E0B' }} />
            <span>Set Daily Target</span>
          </div>
        </DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <div className="space-y-4 pt-2">
            <TextField
              fullWidth
              type="number"
              label="Daily Target (1-50 problems)"
              value={tempTarget}
              onChange={(e) => setTempTarget(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              InputProps={{
                inputProps: { min: 1, max: 50 },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  color: '#E8EAED',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
                '& .MuiInputLabel-root': {
                  color: '#9CA3AF',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            />
            <Slider
              value={tempTarget}
              onChange={(_, val) => setTempTarget(val as number)}
              min={1}
              max={50}
              marks={[
                { value: 1, label: '1' },
                { value: 10, label: '10' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
              ]}
              sx={{
                color: '#F59E0B',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#F59E0B',
                },
                '& .MuiSlider-track': {
                  background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                },
                '& .MuiSlider-markLabel': {
                  color: '#9CA3AF',
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setEditDialogOpen(false)}
            sx={{ color: '#9CA3AF' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}