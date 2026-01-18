//ReferralCompanies tsx file

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@mui/material';
import { IconButton, Chip, TextField, Button } from '@mui/material';
import { Add, Delete, Business } from '@mui/icons-material';

interface Company {
  id: string;
  name: string;
  status: string;
}

export function ReferralCompanies() {
  const [companies, setCompanies] = useState<Company[]>([
    { id: '1', name: 'Google', status: 'Available anytime' },
    { id: '2', name: 'Microsoft', status: 'Available anytime' },
    { id: '3', name: 'Amazon', status: 'Available anytime' },
  ]);
  const [newCompany, setNewCompany] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newCompany.trim()) {
      setCompanies([
        ...companies,
        { id: Date.now().toString(), name: newCompany, status: 'Available anytime' },
      ]);
      setNewCompany('');
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
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
              <Business sx={{ color: '#0A6CF1' }} />
              <span>Referral Companies</span>
            </div>
            <Chip
              label={`${companies.length} Ready`}
              size="small"
              sx={{
                backgroundColor: '#10B981',
                color: '#fff',
                fontWeight: 600,
              }}
            />
          </div>
        }
      />
      <CardContent>
        <div className="space-y-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              <div>
                <div className="font-semibold text-foreground">{company.name}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  {company.status}
                  <Chip
                    label="Referral Ready"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(6, 182, 212, 0.2)',
                      color: '#06B6D4',
                      fontSize: '0.7rem',
                      height: '20px',
                    }}
                  />
                </div>
              </div>
              <IconButton
                onClick={() => handleDelete(company.id)}
                size="small"
                sx={{ color: '#EF4444' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          ))}

          {isAdding ? (
            <div className="flex gap-2 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
              <TextField
                fullWidth
                size="small"
                placeholder="Company name"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                autoFocus
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E8EAED',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  background: 'linear-gradient(135deg, #0A6CF1 0%, #1E88E5 100%)',
                  minWidth: 'auto',
                }}
              >
                Add
              </Button>
            </div>
          ) : (
            <Button
              fullWidth
              startIcon={<Add />}
              onClick={() => setIsAdding(true)}
              sx={{
                border: '2px dashed rgba(255, 255, 255, 0.1)',
                color: '#0A6CF1',
                padding: '12px',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(10, 108, 241, 0.1)',
                  border: '2px dashed #0A6CF1',
                },
              }}
            >
              Add Company
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
