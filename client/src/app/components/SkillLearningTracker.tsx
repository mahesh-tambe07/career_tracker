import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  LinearProgress,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ExpandMore, Add, Delete, School, Edit } from '@mui/icons-material';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
}

interface Category {
  id: string;
  name: string;
  topics: Topic[];
}

export function SkillLearningTracker() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'OOPS',
      topics: [
        { id: '1-1', name: 'Encapsulation', completed: true },
        { id: '1-2', name: 'Inheritance', completed: true },
        { id: '1-3', name: 'Polymorphism', completed: false },
        { id: '1-4', name: 'Abstraction', completed: false },
      ],
    },
    {
      id: '2',
      name: 'DSA',
      topics: [
        { id: '2-1', name: 'Arrays & Strings', completed: true },
        { id: '2-2', name: 'Linked Lists', completed: false },
        { id: '2-3', name: 'Trees & Graphs', completed: false },
      ],
    },
    {
      id: '3',
      name: 'DBMS',
      topics: [
        { id: '3-1', name: 'Normalization', completed: false },
        { id: '3-2', name: 'Indexing', completed: false },
      ],
    },
  ]);

  const [newTopics, setNewTopics] = useState<{ [key: string]: string }>({});
  const [addSubjectDialogOpen, setAddSubjectDialogOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  const toggleTopic = (categoryId: string, topicId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              topics: cat.topics.map((topic) =>
                topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
              ),
            }
          : cat
      )
    );
  };

  const addTopic = (categoryId: string) => {
    if (newTopics[categoryId]?.trim()) {
      setCategories(
        categories.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                topics: [
                  ...cat.topics,
                  {
                    id: `${categoryId}-${Date.now()}`,
                    name: newTopics[categoryId],
                    completed: false,
                  },
                ],
              }
            : cat
        )
      );
      setNewTopics({ ...newTopics, [categoryId]: '' });
    }
  };

  const deleteTopic = (categoryId: string, topicId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, topics: cat.topics.filter((t) => t.id !== topicId) }
          : cat
      )
    );
  };

  const addSubject = () => {
    if (newSubjectName.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newSubjectName,
          topics: [],
        },
      ]);
      setNewSubjectName('');
      setAddSubjectDialogOpen(false);
    }
  };

  const deleteSubject = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  const getProgress = (category: Category) => {
    if (category.topics.length === 0) return 0;
    return (category.topics.filter((t) => t.completed).length / category.topics.length) * 100;
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 19, 36, 0.8) 100%)',
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
              <School sx={{ color: '#10B981' }} />
              <span>Skill Learning Tracker</span>
            </div>
            <IconButton
              size="small"
              onClick={() => setAddSubjectDialogOpen(true)}
              sx={{
                color: '#10B981',
                '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </div>
        }
      />
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => {
            const progress = getProgress(category);
            const isCompleted = category.topics.length > 0 && progress === 100;
            
            return (
              <Accordion
                key={category.id}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: '#E8EAED' }} />}
                  sx={{ borderRadius: '12px' }}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{category.name}</span>
                        {isCompleted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.2)] text-[#10B981] font-semibold">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {category.topics.filter((t) => t.completed).length}/{category.topics.length}
                        </span>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSubject(category.id);
                          }}
                          sx={{ color: '#EF4444' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background:
                            progress === 100
                              ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
                              : 'linear-gradient(90deg, #0A6CF1 0%, #1E88E5 100%)',
                          borderRadius: 3,
                        },
                      }}
                    />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="space-y-2">
                    {category.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)]"
                      >
                        <Checkbox
                          checked={topic.completed}
                          onChange={() => toggleTopic(category.id, topic.id)}
                          sx={{
                            color: '#9CA3AF',
                            '&.Mui-checked': { color: '#10B981' },
                          }}
                        />
                        <span
                          className={`flex-1 ${
                            topic.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {topic.name}
                        </span>
                        <IconButton
                          size="small"
                          onClick={() => deleteTopic(category.id, topic.id)}
                          sx={{ color: '#EF4444' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-3">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add new topic..."
                        value={newTopics[category.id] || ''}
                        onChange={(e) =>
                          setNewTopics({ ...newTopics, [category.id]: e.target.value })
                        }
                        onKeyPress={(e) => e.key === 'Enter' && addTopic(category.id)}
                        sx={{
                          '& .MuiInputBase-root': {
                            color: '#E8EAED',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => addTopic(category.id)}
                        sx={{
                          minWidth: 'auto',
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        }}
                      >
                        <Add />
                      </Button>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </CardContent>

      {/* Add Subject Dialog */}
      <Dialog
        open={addSubjectDialogOpen}
        onClose={() => setAddSubjectDialogOpen(false)}
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
            <School sx={{ color: '#10B981' }} />
            <span>Add New Subject</span>
          </div>
        </DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <div className="pt-2">
            <TextField
              fullWidth
              autoFocus
              size="small"
              label="Subject Name"
              placeholder="e.g., Operating Systems, Computer Networks, React..."
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubject()}
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
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => {
              setAddSubjectDialogOpen(false);
              setNewSubjectName('');
            }}
            sx={{ color: '#9CA3AF' }}
          >
            Cancel
          </Button>
          <Button
            onClick={addSubject}
            variant="contained"
            disabled={!newSubjectName.trim()}
            sx={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              '&:disabled': {
                background: 'rgba(156, 163, 175, 0.3)',
              },
            }}
          >
            Add Subject
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}