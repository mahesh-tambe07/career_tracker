//widget file

import { Card, CardContent } from '@mui/material';
import { Code, Whatshot, Business, TrendingUp } from '@mui/icons-material';

export function MobileWidgets() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* LeetCode Widget */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Code sx={{ fontSize: 32, color: '#fff', mb: 1 }} />
            <div className="text-white text-2xl font-bold">2/3</div>
            <div className="text-white/80 text-xs mt-1">Today's LeetCode</div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Widget */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Whatshot sx={{ fontSize: 32, color: '#fff', mb: 1 }} />
            <div className="text-white text-2xl font-bold">7</div>
            <div className="text-white/80 text-xs mt-1">Day Streak</div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Companies Widget */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Business sx={{ fontSize: 34, color: '#fff', mb: 1 }} />
            <div className="text-white text-2xl font-bold">3</div>
            <div className="text-white/80 text-xs mt-1">Referral Ready</div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Progress Widget */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
          borderRadius: '18px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <TrendingUp sx={{ fontSize: 32, color: '#fff', mb: 1 }} />
            <div className="text-white text-2xl font-bold">42%</div>
            <div className="text-white/80 text-xs mt-1">Learning Progress</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
