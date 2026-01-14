import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { TextField, Button, IconButton } from '@mui/material';
import { ContentCopy, Message } from '@mui/icons-material';
import { toast } from 'sonner';

export function LinkedInMessageGenerator() {
  const [formData, setFormData] = useState({
    company: '',
    jobId: '',
    position: '',
  });

  const generateMessage = () => {
    if (!formData.company || !formData.jobId || !formData.position) return '';
    return `Hi [Name],

I hope this message finds you well. I noticed you work at ${formData.company}, and I'm very interested in the ${formData.position} position (Job ID: ${formData.jobId}).

I believe my skills and experience align well with this role, and I would be grateful if you could refer me or provide any guidance on the application process.

I'd be happy to share my resume and discuss how I can contribute to the team.

Thank you for your time and consideration!

Best regards`;
  };

  const message = generateMessage();

  const handleCopy = () => {
    if (message) {
      navigator.clipboard.writeText(message);
      toast.success('Message copied to clipboard!');
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
          <div className="flex items-center gap-2">
            <Message sx={{ color: '#06B6D4' }} />
            <span>LinkedIn Message Generator</span>
          </div>
        }
      />
      <CardContent>
        <div className="space-y-4">
          <TextField
            fullWidth
            label="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            sx={{
              '& .MuiInputBase-root': {
                color: '#E8EAED',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          />
          <TextField
            fullWidth
            label="Job ID"
            value={formData.jobId}
            onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
            sx={{
              '& .MuiInputBase-root': {
                color: '#E8EAED',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          />
          <TextField
            fullWidth
            label="Position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            sx={{
              '& .MuiInputBase-root': {
                color: '#E8EAED',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          />

          {message && (
            <div className="relative p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
              <div className="absolute top-3 right-3">
                <IconButton onClick={handleCopy} size="small" sx={{ color: '#06B6D4' }}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap pr-10">{message}</div>
            </div>
          )}

          {!message && (
            <div className="text-center text-muted-foreground text-sm p-8 border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl">
              Fill in the details to generate a LinkedIn referral message
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
