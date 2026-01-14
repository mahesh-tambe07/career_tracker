import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@mui/material';
import {
  IconButton,
  Chip,
  TextField,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Delete,
  Work,
  Link as LinkIcon,
  Edit,
  OpenInNew,
} from '@mui/icons-material';

interface Job {
  id: string;
  company: string;
  jobId: string;
  position: string;
  dateAdded: string;
  jobLink: string;
  status:
    | 'Connection Sent'
    | 'Connection Accepted'
    | 'Messaged'
    | 'Ready to Refer'
    | 'No Reply'
    | 'Referred'
    | 'Applied'
    | 'Job Expired';
}

const statusColors = {
  'Connection Sent': '#9CA3AF',
  'Connection Accepted': '#0EA5E9',
  Messaged: '#8B5CF6',
  'Ready to Refer': '#F59E0B',
  'No Reply': '#EF4444',
  Referred: '#10B981',
  Applied: '#06B6D4',
  'Job Expired': '#6B7280',
};

export function JobTracker() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      company: 'Meta',
      jobId: 'META-2024-001',
      position: 'Software Engineer',
      dateAdded: '2026-01-10',
      jobLink: 'https://www.metacareers.com/jobs/123456',
      status: 'Referred',
    },
    {
      id: '2',
      company: 'Netflix',
      jobId: 'NFLX-2024-042',
      position: 'Frontend Developer',
      dateAdded: '2026-01-12',
      jobLink: 'https://jobs.netflix.com/jobs/123456',
      status: 'Messaged',
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newJob, setNewJob] = useState({
    company: '',
    jobId: '',
    position: '',
    jobLink: '',
  });
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleAdd = () => {
    if (newJob.company && newJob.jobId && newJob.position && newJob.jobLink) {
      setJobs([
        ...jobs,
        {
          id: Date.now().toString(),
          ...newJob,
          dateAdded: new Date().toISOString().split('T')[0],
          status: 'Connection Sent',
        },
      ]);
      setNewJob({ company: '', jobId: '', position: '', jobLink: '' });
      setIsAdding(false);
    }
  };

  const handleStatusChange = (id: string, status: Job['status']) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status } : job)));
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleEditOpen = (job: Job) => {
    setEditingJob({ ...job });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingJob) {
      setJobs(jobs.map((job) => (job.id === editingJob.id ? editingJob : job)));
      setEditDialogOpen(false);
      setEditingJob(null);
    }
  };

  const openJobLink = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.05) 0%, rgba(14, 19, 36, 0.8) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <CardHeader
        title={
          <div className="flex items-center gap-2">
            <Work sx={{ color: '#1E88E5' }} />
            <span>Job Tracker</span>
          </div>
        }
      />
      <CardContent>
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{job.company}</div>
                  <div className="text-sm text-muted-foreground">{job.position}</div>
                </div>
                <div className="flex gap-1">
                  <Tooltip title="Edit job details">
                    <IconButton
                      onClick={() => handleEditOpen(job)}
                      size="small"
                      sx={{ color: '#0A6CF1' }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Open job link">
                    <IconButton
                      onClick={() => openJobLink(job.jobLink)}
                      size="small"
                      sx={{ color: '#10B981' }}
                    >
                      <OpenInNew fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    onClick={() => handleDelete(job.id)}
                    size="small"
                    sx={{ color: '#EF4444' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LinkIcon fontSize="small" />
                  <span className="font-mono">{job.jobId}</span>
                </div>
                <div className="text-sm text-muted-foreground">{job.dateAdded}</div>
                <Select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job.id, e.target.value as Job['status'])}
                  size="small"
                  sx={{
                    backgroundColor: statusColors[job.status],
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { padding: '6px 12px', fontSize: '0.75rem' },
                  }}
                >
                  <MenuItem value="Connection Sent">Connection Sent</MenuItem>
                  <MenuItem value="Connection Accepted">Connection Accepted</MenuItem>
                  <MenuItem value="Messaged">Messaged</MenuItem>
                  <MenuItem value="Ready to Refer">Ready to Refer</MenuItem>
                  <MenuItem value="No Reply">No Reply</MenuItem>
                  <MenuItem value="Referred">Referred</MenuItem>
                  <MenuItem value="Applied">Applied</MenuItem>
                  <MenuItem value="Job Expired">Job Expired</MenuItem>
                </Select>
              </div>
            </div>
          ))}

          {isAdding ? (
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] space-y-3">
              <TextField
                fullWidth
                size="small"
                placeholder="Company name"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                placeholder="Job ID"
                value={newJob.jobId}
                onChange={(e) => setNewJob({ ...newJob, jobId: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                placeholder="Position"
                value={newJob.position}
                onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                placeholder="Job Link (paste URL here)"
                value={newJob.jobLink}
                onChange={(e) => setNewJob({ ...newJob, jobLink: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  onClick={handleAdd}
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
                  }}
                >
                  Add Job
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsAdding(false)}
                  sx={{ color: '#9CA3AF', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              fullWidth
              startIcon={<Add />}
              onClick={() => setIsAdding(true)}
              sx={{
                border: '2px dashed rgba(255, 255, 255, 0.1)',
                color: '#1E88E5',
                padding: '12px',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(30, 136, 229, 0.1)',
                  border: '2px dashed #1E88E5',
                },
              }}
            >
              Add New Job
            </Button>
          )}
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
            minWidth: 500,
          },
        }}
      >
        <DialogTitle sx={{ color: '#E8EAED' }}>
          <div className="flex items-center gap-2">
            <Work sx={{ color: '#1E88E5' }} />
            <span>Edit Job Details</span>
          </div>
        </DialogTitle>
        <DialogContent>
          {editingJob && (
            <div className="space-y-3 pt-2">
              <TextField
                fullWidth
                size="small"
                label="Company"
                value={editingJob.company}
                onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9CA3AF',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Job ID"
                value={editingJob.jobId}
                onChange={(e) => setEditingJob({ ...editingJob, jobId: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9CA3AF',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Position"
                value={editingJob.position}
                onChange={(e) => setEditingJob({ ...editingJob, position: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9CA3AF',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Job Link"
                value={editingJob.jobLink}
                onChange={(e) => setEditingJob({ ...editingJob, jobLink: e.target.value })}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9CA3AF',
                  },
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setEditDialogOpen(false)} sx={{ color: '#9CA3AF' }}>
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}