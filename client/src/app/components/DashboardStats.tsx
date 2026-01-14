import { Card, CardContent } from '@mui/material';
import { TrendingUp, CheckCircle, Code, Work } from '@mui/icons-material';

export function DashboardStats() {
  const stats = [
    {
      title: 'Active Jobs',
      value: '5',
      change: '+2 this week',
      icon: Work,
      color: '#0A6CF1',
      bgColor: 'rgba(10, 108, 241, 0.1)',
    },
    {
      title: 'Learning Progress',
      value: '42%',
      change: '+8% this week',
      icon: TrendingUp,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      title: 'LeetCode Solved',
      value: '127',
      change: '+12 this week',
      icon: Code,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Current Streak',
      value: '7 days',
      change: 'Keep going!',
      icon: CheckCircle,
      color: '#06B6D4',
      bgColor: 'rgba(6, 182, 212, 0.1)',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            sx={{
              background: 'linear-gradient(135deg, rgba(10, 108, 241, 0.03) 0%, rgba(14, 19, 36, 0.8) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">{stat.title}</div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.change}</div>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon sx={{ color: stat.color, fontSize: 28 }} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
