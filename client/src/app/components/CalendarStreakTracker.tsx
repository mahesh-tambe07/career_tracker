import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { IconButton, Chip } from '@mui/material';
import { ChevronLeft, ChevronRight, CalendarMonth, Whatshot } from '@mui/icons-material';

interface DayData {
  date: number;
  tasks: boolean;
  learning: boolean;
  leetcode: boolean;
}

export function CalendarStreakTracker() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 14)); // January 14, 2026
  const currentStreak = 7;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Mock data - in real app, this would come from your state
  const mockDayData: { [key: number]: DayData } = {
    1: { date: 1, tasks: true, learning: true, leetcode: true },
    2: { date: 2, tasks: true, learning: false, leetcode: true },
    5: { date: 5, tasks: true, learning: true, leetcode: false },
    7: { date: 7, tasks: true, learning: true, leetcode: true },
    8: { date: 8, tasks: true, learning: true, leetcode: true },
    9: { date: 9, tasks: true, learning: true, leetcode: true },
    10: { date: 10, tasks: true, learning: true, leetcode: true },
    11: { date: 11, tasks: true, learning: true, leetcode: true },
    12: { date: 12, tasks: true, learning: true, leetcode: true },
    13: { date: 13, tasks: true, learning: true, leetcode: true },
    14: { date: 14, tasks: true, learning: true, leetcode: true },
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getActivityColor = (day: number) => {
    const data = mockDayData[day];
    if (!data) return 'transparent';

    const activeCount = [data.tasks, data.learning, data.leetcode].filter(Boolean).length;
    if (activeCount === 3) return '#10B981'; // Green - all activities
    if (activeCount === 2) return '#0A6CF1'; // Blue - 2 activities
    if (activeCount === 1) return '#F59E0B'; // Amber - 1 activity
    return 'transparent';
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(10, 108, 241, 0.05) 0%, rgba(14, 19, 36, 0.8) 100%)',
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
              <CalendarMonth sx={{ color: '#0A6CF1' }} />
              <span>Activity Calendar</span>
            </div>
            <Chip
              icon={<Whatshot />}
              label={`${currentStreak} Day Streak`}
              sx={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#fff',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#fff' },
              }}
            />
          </div>
        }
      />
      <CardContent>
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <IconButton onClick={previousMonth} size="small" sx={{ color: '#E8EAED' }}>
              <ChevronLeft />
            </IconButton>
            <span className="font-semibold text-foreground">{monthName}</span>
            <IconButton onClick={nextMonth} size="small" sx={{ color: '#E8EAED' }}>
              <ChevronRight />
            </IconButton>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground font-semibold p-2">
                {day}
              </div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasActivity = mockDayData[day];
              const isToday = day === 14;
              const activityColor = getActivityColor(day);

              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm relative
                    ${isToday ? 'ring-2 ring-[#0A6CF1]' : ''}
                    ${hasActivity ? 'font-semibold' : 'text-muted-foreground'}
                  `}
                  style={{
                    backgroundColor: activityColor !== 'transparent' 
                      ? `${activityColor}30` 
                      : 'rgba(255, 255, 255, 0.03)',
                    border: `2px solid ${activityColor !== 'transparent' ? activityColor : 'rgba(255, 255, 255, 0.06)'}`,
                  }}
                >
                  {day}
                  {hasActivity && (
                    <div
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: activityColor }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }} />
              <span className="text-muted-foreground">All Activities</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0A6CF1' }} />
              <span className="text-muted-foreground">2 Activities</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }} />
              <span className="text-muted-foreground">1 Activity</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
