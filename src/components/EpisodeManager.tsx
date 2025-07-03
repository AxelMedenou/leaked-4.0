import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  DollarSign, 
  Target, 
  Video, 
  Users, 
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  Play,
  Pause,
  MoreHorizontal,
  Search,
  Filter,
  TrendingUp,
  Package,
  Eye,
  ArrowRight,
  ChevronLeft,
  Instagram,
  Youtube,
  Camera,
  Image as ImageIcon,
  User,
  AlertCircle,
  BarChart3,
  Lightbulb,
  Save,
  X,
  Upload,
  FileText,
  File
} from 'lucide-react';
import PasswordModal from './PasswordModal';

interface Episode {
  id: string;
  name: string;
  concept: string;
  status: 'planning' | 'in-progress' | 'production' | 'marketing' | 'launched' | 'completed';
  startDate: string;
  launchDate: string;
  budget: number;
  spent: number;
  targetRevenue: number;
  videoViews: number;
  tasks: Task[];
  products: Product[];
  contentPlan: ContentItem[];
  timeline: TimelineItem[];
  teamMembers: TeamMember[];
  ideas: Idea[];
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  category: 'design' | 'production' | 'marketing' | 'content' | 'sales';
  assignedTo?: string;
}

interface Product {
  id: string;
  name: string;
  variants: string[];
  quantity: number;
  cost: number;
  price: number;
}

interface ContentItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'website';
  status: 'planned' | 'in-progress' | 'completed';
  dueDate: string;
  description: string;
}

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  status: 'upcoming' | 'current' | 'completed';
  category: 'milestone' | 'deadline' | 'launch';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  files: IdeaFile[];
  createdAt: string;
}

interface IdeaFile {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface EpisodeManagerProps {
  selectedEpisodeId?: string | null;
  onEpisodeSelect?: (episodeId: string | null) => void;
}

export default function EpisodeManager({ selectedEpisodeId, onEpisodeSelect }: EpisodeManagerProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: '1',
      name: 'Episode 12: Winter Drop',
      concept: 'Urban winter essentials with crystalline patterns',
      status: 'in-progress',
      startDate: '2024-01-01',
      launchDate: '2024-02-15',
      budget: 15000,
      spent: 8500,
      targetRevenue: 45000,
      videoViews: 125000,
      tasks: [
        { id: '1', title: 'Design concept sketches', completed: true, dueDate: '2024-01-05', category: 'design', assignedTo: 'Sarah' },
        { id: '2', title: 'Source materials', completed: true, dueDate: '2024-01-10', category: 'production' },
        { id: '3', title: 'Create teaser video', completed: false, dueDate: '2024-01-20', category: 'content', assignedTo: 'Mike' },
        { id: '4', title: 'Plan social media campaign', completed: false, dueDate: '2024-01-25', category: 'marketing' },
        { id: '5', title: 'Set up pre-orders', completed: false, dueDate: '2024-02-01', category: 'sales' },
      ],
      products: [
        { id: '1', name: 'Leaked Hoodie Winter', variants: ['S', 'M', 'L', 'XL'], quantity: 100, cost: 35, price: 89 },
        { id: '2', name: 'Leaked Beanie Crystal', variants: ['One Size'], quantity: 50, cost: 12, price: 29 },
      ],
      contentPlan: [
        { id: '1', type: 'video', title: 'Winter Drop Teaser', platform: 'instagram', status: 'in-progress', dueDate: '2024-01-20', description: 'Short teaser showcasing key pieces' },
        { id: '2', type: 'photo', title: 'Product Flat Lays', platform: 'website', status: 'completed', dueDate: '2024-01-15', description: 'Clean product photography for website' },
        { id: '3', type: 'video', title: 'Behind the Scenes', platform: 'tiktok', status: 'planned', dueDate: '2024-01-25', description: 'Design process and production insights' },
      ],
      timeline: [
        { id: '1', title: 'Concept Finalization', date: '2024-01-05', status: 'completed', category: 'milestone' },
        { id: '2', title: 'Production Start', date: '2024-01-15', status: 'completed', category: 'milestone' },
        { id: '3', title: 'Content Creation Deadline', date: '2024-01-25', status: 'current', category: 'deadline' },
        { id: '4', title: 'Launch Date', date: '2024-02-15', status: 'upcoming', category: 'launch' },
      ],
      teamMembers: [
        { id: '1', name: 'Sarah Chen', role: 'Designer' },
        { id: '2', name: 'Mike Rodriguez', role: 'Content Creator' },
        { id: '3', name: 'Alex Kim', role: 'Marketing' },
      ],
      ideas: [
        { 
          id: '1', 
          title: 'Holographic Elements', 
          description: 'Add holographic details to winter pieces for a futuristic look',
          category: 'Design',
          priority: 'high',
          files: [],
          createdAt: '2024-01-01'
        },
        { 
          id: '2', 
          title: 'Collaboration with Local Artists', 
          description: 'Partner with street artists for unique graphic designs',
          category: 'Marketing',
          priority: 'medium',
          files: [],
          createdAt: '2024-01-02'
        }
      ],
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Episode 11: Street Essentials',
      concept: 'Minimalist spring collection with leaked branding',
      status: 'planning',
      startDate: '2024-03-01',
      launchDate: '2024-04-15',
      budget: 12000,
      spent: 1200,
      targetRevenue: 35000,
      videoViews: 0,
      tasks: [
        { id: '5', title: 'Market research', completed: false, dueDate: '2024-02-01', category: 'design' },
        { id: '6', title: 'Color palette selection', completed: false, dueDate: '2024-02-05', category: 'design' },
        { id: '7', title: 'Fabric sourcing', completed: false, dueDate: '2024-02-10', category: 'production' },
      ],
      products: [],
      contentPlan: [],
      timeline: [
        { id: '5', title: 'Research Phase', date: '2024-02-01', status: 'upcoming', category: 'milestone' },
        { id: '6', title: 'Design Phase', date: '2024-02-15', status: 'upcoming', category: 'milestone' },
      ],
      teamMembers: [
        { id: '1', name: 'Sarah Chen', role: 'Designer' },
      ],
      ideas: [],
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'Episode 10: Urban Collection',
      concept: 'Bold summer pieces with urban influence',
      status: 'completed',
      startDate: '2023-11-01',
      launchDate: '2023-12-15',
      budget: 18000,
      spent: 16500,
      targetRevenue: 52000,
      videoViews: 280000,
      tasks: [
        { id: '8', title: 'Design finalization', completed: true, dueDate: '2023-11-15', category: 'design' },
        { id: '9', title: 'Production complete', completed: true, dueDate: '2023-12-01', category: 'production' },
        { id: '10', title: 'Launch campaign', completed: true, dueDate: '2023-12-15', category: 'marketing' },
      ],
      products: [
        { id: '3', name: 'Leaked Tee Summer', variants: ['S', 'M', 'L', 'XL'], quantity: 150, cost: 18, price: 45 },
        { id: '4', name: 'Leaked Shorts Urban', variants: ['S', 'M', 'L', 'XL'], quantity: 80, cost: 25, price: 65 },
      ],
      contentPlan: [],
      timeline: [],
      teamMembers: [],
      ideas: [],
      createdAt: '2023-11-01'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'content' | 'timeline' | 'ideas'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Password modal states
  const [passwordModal, setPasswordModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onSuccess: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onSuccess: () => {}
  });

  // Edit states
  const [editingTeamMember, setEditingTeamMember] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingTimelineItem, setEditingTimelineItem] = useState<string | null>(null);
  const [editingIdea, setEditingIdea] = useState<string | null>(null);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [showAddIdeaForm, setShowAddIdeaForm] = useState(false);

  // Edit form states
  const [editTeamMemberForm, setEditTeamMemberForm] = useState({ name: '', role: '' });
  const [editTaskForm, setEditTaskForm] = useState({ title: '', dueDate: '', category: 'design' as const, assignedTo: '' });
  const [editTimelineForm, setEditTimelineForm] = useState({ title: '', date: '', status: 'upcoming' as const, category: 'milestone' as const });
  const [editIdeaForm, setEditIdeaForm] = useState({ title: '', description: '', category: '', priority: 'medium' as const });
  const [newIdeaForm, setNewIdeaForm] = useState({ 
    title: '', 
    description: '', 
    category: '', 
    priority: 'medium' as const,
    files: [] as File[]
  });

  // Filter episodes based on search and status
  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.concept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || episode.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate quick stats
  const activeEpisodes = episodes.filter(e => ['planning', 'in-progress', 'production', 'marketing'].includes(e.status)).length;
  const totalBudget = episodes.reduce((sum, e) => sum + e.budget, 0);
  const averageProgress = episodes.reduce((sum, e) => {
    const completed = e.tasks.filter(t => t.completed).length;
    const total = e.tasks.length;
    return sum + (total > 0 ? (completed / total) * 100 : 0);
  }, 0) / episodes.length;

  const nextDrop = episodes
    .filter(e => new Date(e.launchDate) > new Date())
    .sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime())[0];

  const daysToNextDrop = nextDrop ? 
    Math.ceil((new Date(nextDrop.launchDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const getStatusColor = (status: Episode['status']) => {
    switch (status) {
      case 'planning': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'production': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'marketing': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'launched': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCompletionPercentage = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const toggleTask = (episodeId: string, taskId: string) => {
    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? {
            ...episode,
            tasks: episode.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : episode
    ));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'tiktok': return <Video className="w-4 h-4" />;
      case 'website': return <Eye className="w-4 h-4" />;
      default: return <Camera className="w-4 h-4" />;
    }
  };

  const getTimelineStatusColor = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'current': return 'bg-yellow-500/20 text-yellow-400';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const sortTimelineItems = (items: TimelineItem[]) => {
    const statusOrder = { 'completed': 0, 'current': 1, 'upcoming': 2 };
    return [...items].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  };

  // Password-protected edit functions
  const requestTeamMemberEdit = (episodeId: string, memberId: string) => {
    const episode = episodes.find(e => e.id === episodeId);
    const member = episode?.teamMembers.find(m => m.id === memberId);
    if (!member) return;

    setPasswordModal({
      isOpen: true,
      title: 'Edit Team Member',
      description: 'Enter password to edit team member details',
      onSuccess: () => {
        setEditingTeamMember(memberId);
        setEditTeamMemberForm({ name: member.name, role: member.role });
      }
    });
  };

  const requestTaskEdit = (episodeId: string, taskId: string) => {
    const episode = episodes.find(e => e.id === episodeId);
    const task = episode?.tasks.find(t => t.id === taskId);
    if (!task) return;

    setPasswordModal({
      isOpen: true,
      title: 'Edit Task',
      description: 'Enter password to edit task details',
      onSuccess: () => {
        setEditingTask(taskId);
        setEditTaskForm({ 
          title: task.title, 
          dueDate: task.dueDate, 
          category: task.category,
          assignedTo: task.assignedTo || ''
        });
      }
    });
  };

  const requestTimelineEdit = (episodeId: string, timelineId: string) => {
    const episode = episodes.find(e => e.id === episodeId);
    const timelineItem = episode?.timeline.find(t => t.id === timelineId);
    if (!timelineItem) return;

    setPasswordModal({
      isOpen: true,
      title: 'Edit Timeline Item',
      description: 'Enter password to edit timeline item',
      onSuccess: () => {
        setEditingTimelineItem(timelineId);
        setEditTimelineForm({ 
          title: timelineItem.title, 
          date: timelineItem.date, 
          status: timelineItem.status,
          category: timelineItem.category
        });
      }
    });
  };

  // Save functions
  const saveTeamMember = (episodeId: string, memberId: string) => {
    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? {
            ...episode,
            teamMembers: episode.teamMembers.map(member =>
              member.id === memberId 
                ? { ...member, name: editTeamMemberForm.name, role: editTeamMemberForm.role }
                : member
            )
          }
        : episode
    ));
    setEditingTeamMember(null);
  };

  const saveTask = (episodeId: string, taskId: string) => {
    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? {
            ...episode,
            tasks: episode.tasks.map(task =>
              task.id === taskId 
                ? { 
                    ...task, 
                    title: editTaskForm.title,
                    dueDate: editTaskForm.dueDate,
                    category: editTaskForm.category,
                    assignedTo: editTaskForm.assignedTo || undefined
                  }
                : task
            )
          }
        : episode
    ));
    setEditingTask(null);
  };

  const saveTimelineItem = (episodeId: string, timelineId: string) => {
    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? {
            ...episode,
            timeline: sortTimelineItems(episode.timeline.map(item =>
              item.id === timelineId 
                ? { 
                    ...item, 
                    title: editTimelineForm.title,
                    date: editTimelineForm.date,
                    status: editTimelineForm.status,
                    category: editTimelineForm.category
                  }
                : item
            ))
          }
        : episode
    ));
    setEditingTimelineItem(null);
  };

  // Ideas functions
  const saveIdea = (episodeId: string, ideaId: string) => {
    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? {
            ...episode,
            ideas: episode.ideas.map(idea =>
              idea.id === ideaId 
                ? { 
                    ...idea, 
                    title: editIdeaForm.title,
                    description: editIdeaForm.description,
                    category: editIdeaForm.category,
                    priority: editIdeaForm.priority
                  }
                : idea
            )
          }
        : episode
    ));
    setEditingIdea(null);
  };

  const addIdea = (episodeId: string) => {
    const newIdea: Idea = {
      id: Date.now().toString(),
      title: newIdeaForm.title,
      description: newIdeaForm.description,
      category: newIdeaForm.category,
      priority: newIdeaForm.priority,
      files: newIdeaForm.files.map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      })),
      createdAt: new Date().toISOString()
    };

    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? { ...episode, ideas: [...episode.ideas, newIdea] }
        : episode
    ));

    setNewIdeaForm({ title: '', description: '', category: '', priority: 'medium', files: [] });
    setShowAddIdeaForm(false);
  };

  const deleteIdea = (episodeId: string, ideaId: string) => {
    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? { ...episode, ideas: episode.ideas.filter(idea => idea.id !== ideaId) }
        : episode
    ));
    setSelectedIdeaId(null);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setNewIdeaForm(prev => ({
        ...prev,
        files: [...prev.files, ...fileArray]
      }));
    }
  };

  const removeFile = (index: number) => {
    setNewIdeaForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  if (selectedEpisodeId) {
    const episode = episodes.find(e => e.id === selectedEpisodeId);
    if (!episode) return null;

    // Show selected idea in full view
    if (selectedIdeaId) {
      const selectedIdea = episode.ideas.find(idea => idea.id === selectedIdeaId);
      if (!selectedIdea) return null;

      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-white/60">
            <button
              onClick={() => setSelectedIdeaId(null)}
              className="flex items-center space-x-2 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Ideas</span>
            </button>
            <span>/</span>
            <span className="text-white">{selectedIdea.title}</span>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  {editingIdea === selectedIdea.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editIdeaForm.title}
                        onChange={(e) => setEditIdeaForm({ ...editIdeaForm, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-2xl font-black"
                      />
                      <textarea
                        value={editIdeaForm.description}
                        onChange={(e) => setEditIdeaForm({ ...editIdeaForm, description: e.target.value })}
                        rows={4}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                      />
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={editIdeaForm.category}
                          onChange={(e) => setEditIdeaForm({ ...editIdeaForm, category: e.target.value })}
                          placeholder="Category"
                          className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                        />
                        <select
                          value={editIdeaForm.priority}
                          onChange={(e) => setEditIdeaForm({ ...editIdeaForm, priority: e.target.value as any })}
                          className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => saveIdea(episode.id, selectedIdea.id)}
                          className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingIdea(null)}
                          className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-black text-white mb-4">{selectedIdea.title}</h1>
                      <p className="text-white/80 text-lg mb-6">{selectedIdea.description}</p>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-white/10 px-3 py-1 rounded-full text-white/80 text-sm">
                          {selectedIdea.category}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          selectedIdea.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          selectedIdea.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {selectedIdea.priority.toUpperCase()} PRIORITY
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {editingIdea !== selectedIdea.id && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setEditingIdea(selectedIdea.id);
                        setEditIdeaForm({
                          title: selectedIdea.title,
                          description: selectedIdea.description,
                          category: selectedIdea.category,
                          priority: selectedIdea.priority
                        });
                      }}
                      className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteIdea(episode.id, selectedIdea.id)}
                      className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {selectedIdea.files.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Attached Files</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedIdea.files.map((file) => (
                      <div key={file.id} className="bg-white/5 rounded-lg p-4 flex items-center space-x-3">
                        <File className="w-8 h-8 text-white/60" />
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium truncate">{file.name}</div>
                          <div className="text-white/40 text-xs">{file.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-white/60">
          <button
            onClick={() => onEpisodeSelect?.(null)}
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Episodes</span>
          </button>
          <span>/</span>
          <span className="text-white">{episode.name}</span>
        </div>

        {/* Episode Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl"></div>
          <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black tracking-wider text-white mb-2">{episode.name}</h1>
                <p className="text-white/60 text-lg mb-4">{episode.concept}</p>
                <div className="flex items-center space-x-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(episode.status)}`}>
                    {episode.status.toUpperCase().replace('-', ' ')}
                  </div>
                  <div className="text-white/60">
                    Launch: {new Date(episode.launchDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">{getCompletionPercentage(episode.tasks)}%</div>
                <div className="text-white/60 text-sm">Complete</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-white/60" />
                  <span className="text-white/60 text-sm">Budget</span>
                </div>
                <div className="text-white font-bold">${episode.budget.toLocaleString()}</div>
                <div className="text-white/40 text-xs">Spent: ${episode.spent.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-white/60" />
                  <span className="text-white/60 text-sm">Target Revenue</span>
                </div>
                <div className="text-white font-bold">${episode.targetRevenue.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-white/60" />
                  <span className="text-white/60 text-sm">Tasks</span>
                </div>
                <div className="text-white font-bold">
                  {episode.tasks.filter(t => t.completed).length}/{episode.tasks.length}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-white/60" />
                  <span className="text-white/60 text-sm">Team</span>
                </div>
                <div className="text-white font-bold">{episode.teamMembers.length} members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'checklist', label: 'Checklist', icon: CheckCircle2 },
            { id: 'content', label: 'Content Plan', icon: Camera },
            { id: 'timeline', label: 'Timeline', icon: Calendar },
            { id: 'ideas', label: 'Ideas', icon: Lightbulb },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm"></div>
          <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-white">EPISODE OVERVIEW</h2>
                
                {/* Budget Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Budget Tracking</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Total Budget</span>
                        <span className="text-white font-bold">${episode.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Spent</span>
                        <span className="text-white font-bold">${episode.spent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Remaining</span>
                        <span className="text-green-400 font-bold">${(episode.budget - episode.spent).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div 
                          className="bg-white h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(episode.spent / episode.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Products</h3>
                    <div className="space-y-3">
                      {episode.products.map((product) => (
                        <div key={product.id} className="bg-white/5 rounded-lg p-4">
                          <div className="font-bold text-white mb-1">{product.name}</div>
                          <div className="text-white/60 text-sm">
                            {product.quantity} units • ${product.price} each
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Team Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {episode.teamMembers.map((member) => (
                      <div key={member.id} className="bg-white/5 rounded-lg p-4 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white/60" />
                        </div>
                        <div>
                          <div className="text-white font-bold">{member.name}</div>
                          <div className="text-white/60 text-sm">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Checklist Tab */}
            {activeTab === 'checklist' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-white">PRODUCTION CHECKLIST</h2>
                
                {['design', 'content', 'marketing', 'production', 'sales'].map((category) => {
                  const categoryTasks = episode.tasks.filter(task => task.category === category);
                  if (categoryTasks.length === 0) return null;

                  return (
                    <div key={category} className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 capitalize">{category}</h3>
                      <div className="space-y-3">
                        {categoryTasks.map((task) => (
                          <div key={task.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                            <button
                              onClick={() => toggleTask(episode.id, task.id)}
                              className={`transition-colors ${
                                task.completed ? 'text-green-400' : 'text-white/40 hover:text-white/60'
                              }`}
                            >
                              {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                            </button>
                            
                            {editingTask === task.id ? (
                              <div className="flex-1 space-y-3">
                                <input
                                  type="text"
                                  value={editTaskForm.title}
                                  onChange={(e) => setEditTaskForm({ ...editTaskForm, title: e.target.value })}
                                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                                />
                                <div className="grid grid-cols-3 gap-3">
                                  <input
                                    type="date"
                                    value={editTaskForm.dueDate}
                                    onChange={(e) => setEditTaskForm({ ...editTaskForm, dueDate: e.target.value })}
                                    className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                                  />
                                  <select
                                    value={editTaskForm.category}
                                    onChange={(e) => setEditTaskForm({ ...editTaskForm, category: e.target.value as any })}
                                    className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                                  >
                                    <option value="design">Design</option>
                                    <option value="production">Production</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="content">Content</option>
                                    <option value="sales">Sales</option>
                                  </select>
                                  <input
                                    type="text"
                                    value={editTaskForm.assignedTo}
                                    onChange={(e) => setEditTaskForm({ ...editTaskForm, assignedTo: e.target.value })}
                                    placeholder="Assigned to"
                                    className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                                  />
                                </div>
                                <div className="flex space-x-3">
                                  <button
                                    onClick={() => saveTask(episode.id, task.id)}
                                    className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-lg hover:bg-green-500/30 transition-colors"
                                  >
                                    <Save className="w-4 h-4" />
                                    <span>Save</span>
                                  </button>
                                  <button
                                    onClick={() => setEditingTask(null)}
                                    className="flex items-center space-x-2 bg-white/10 text-white px-3 py-1 rounded-lg hover:bg-white/20 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                    <span>Cancel</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex-1 flex items-center justify-between">
                                <div>
                                  <div className={`${task.completed ? 'text-white/40 line-through' : 'text-white'}`}>
                                    {task.title}
                                  </div>
                                  <div className="text-white/40 text-sm">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                    {task.assignedTo && ` • Assigned to ${task.assignedTo}`}
                                  </div>
                                </div>
                                <button
                                  onClick={() => requestTaskEdit(episode.id, task.id)}
                                  className="text-white/40 hover:text-white/60 transition-colors"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Content Plan Tab */}
            {activeTab === 'content' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-white">CONTENT PLAN</h2>
                  <button className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Add Content
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {episode.contentPlan.map((content) => (
                    <div key={content.id} className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {content.type === 'video' ? <Video className="w-5 h-5 text-white/60" /> : <ImageIcon className="w-5 h-5 text-white/60" />}
                          <span className="text-white/60 text-sm capitalize">{content.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(content.platform)}
                          <span className="text-white/60 text-sm capitalize">{content.platform}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-white font-bold mb-2">{content.title}</h3>
                      <p className="text-white/60 text-sm mb-4">{content.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          content.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          content.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {content.status.toUpperCase().replace('-', ' ')}
                        </div>
                        <div className="text-white/40 text-xs">
                          Due: {new Date(content.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-white">EPISODE TIMELINE</h2>
                
                <div className="space-y-4">
                  {sortTimelineItems(episode.timeline).map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          item.status === 'completed' ? 'bg-green-400' :
                          item.status === 'current' ? 'bg-yellow-400' :
                          'bg-blue-400'
                        }`}></div>
                        {index < episode.timeline.length - 1 && (
                          <div className="w-0.5 h-8 bg-white/20 mt-2"></div>
                        )}
                      </div>
                      
                      {editingTimelineItem === item.id ? (
                        <div className="flex-1 bg-white/5 rounded-lg p-4 space-y-3">
                          <input
                            type="text"
                            value={editTimelineForm.title}
                            onChange={(e) => setEditTimelineForm({ ...editTimelineForm, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                          />
                          <div className="grid grid-cols-3 gap-3">
                            <input
                              type="date"
                              value={editTimelineForm.date}
                              onChange={(e) => setEditTimelineForm({ ...editTimelineForm, date: e.target.value })}
                              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                            />
                            <select
                              value={editTimelineForm.status}
                              onChange={(e) => setEditTimelineForm({ ...editTimelineForm, status: e.target.value as any })}
                              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="upcoming">Upcoming</option>
                              <option value="current">Current</option>
                              <option value="completed">Completed</option>
                            </select>
                            <select
                              value={editTimelineForm.category}
                              onChange={(e) => setEditTimelineForm({ ...editTimelineForm, category: e.target.value as any })}
                              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="milestone">Milestone</option>
                              <option value="deadline">Deadline</option>
                              <option value="launch">Launch</option>
                            </select>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => saveTimelineItem(episode.id, item.id)}
                              className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-lg hover:bg-green-500/30 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingTimelineItem(null)}
                              className="flex items-center space-x-2 bg-white/10 text-white px-3 py-1 rounded-lg hover:bg-white/20 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 bg-white/5 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-bold">{item.title}</h3>
                              <div className="text-white/60 text-sm">
                                {new Date(item.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className={`px-3 py-1 rounded-full text-xs font-bold ${getTimelineStatusColor(item.status)}`}>
                                {item.status.toUpperCase()}
                              </div>
                              <button
                                onClick={() => requestTimelineEdit(episode.id, item.id)}
                                className="text-white/40 hover:text-white/60 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ideas Tab */}
            {activeTab === 'ideas' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-white">IDEAS & INSPIRATION</h2>
                  <button
                    onClick={() => setShowAddIdeaForm(true)}
                    className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Idea</span>
                  </button>
                </div>

                {/* Add Idea Form */}
                {showAddIdeaForm && (
                  <div className="bg-white/5 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">Add New Idea</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={newIdeaForm.title}
                        onChange={(e) => setNewIdeaForm({ ...newIdeaForm, title: e.target.value })}
                        placeholder="Idea Title"
                        className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40"
                      />
                      <input
                        type="text"
                        value={newIdeaForm.category}
                        onChange={(e) => setNewIdeaForm({ ...newIdeaForm, category: e.target.value })}
                        placeholder="Category"
                        className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40"
                      />
                    </div>
                    <textarea
                      value={newIdeaForm.description}
                      onChange={(e) => setNewIdeaForm({ ...newIdeaForm, description: e.target.value })}
                      placeholder="Describe your idea..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 resize-none"
                    />
                    <div className="flex items-center space-x-4">
                      <select
                        value={newIdeaForm.priority}
                        onChange={(e) => setNewIdeaForm({ ...newIdeaForm, priority: e.target.value as any })}
                        className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                      <div className="flex-1">
                        <label className="flex items-center justify-center w-full h-12 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors">
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                          />
                          <Upload className="w-5 h-5 text-white/60 mr-2" />
                          <span className="text-white/60">Upload Files</span>
                        </label>
                      </div>
                    </div>
                    
                    {newIdeaForm.files.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-white/80 font-medium">Attached Files:</h4>
                        {newIdeaForm.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-white/60" />
                              <span className="text-white text-sm">{file.name}</span>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <button
                        onClick={() => addIdea(episode.id)}
                        disabled={!newIdeaForm.title || !newIdeaForm.description}
                        className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add Idea
                      </button>
                      <button
                        onClick={() => {
                          setShowAddIdeaForm(false);
                          setNewIdeaForm({ title: '', description: '', category: '', priority: 'medium', files: [] });
                        }}
                        className="bg-white/10 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Ideas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {episode.ideas.map((idea) => (
                    <div 
                      key={idea.id} 
                      onClick={() => setSelectedIdeaId(idea.id)}
                      className="bg-white/5 rounded-lg p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="w-5 h-5 text-yellow-400" />
                          <span className="text-white/60 text-sm">{idea.category}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                          idea.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          idea.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {idea.priority.toUpperCase()}
                        </div>
                      </div>
                      
                      <h3 className="text-white font-bold mb-2 group-hover:text-yellow-400 transition-colors">{idea.title}</h3>
                      <p className="text-white/60 text-sm mb-4 line-clamp-3">{idea.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-white/40 text-xs">
                          {new Date(idea.createdAt).toLocaleDateString()}
                        </div>
                        {idea.files.length > 0 && (
                          <div className="flex items-center space-x-1 text-white/60">
                            <File className="w-4 h-4" />
                            <span className="text-xs">{idea.files.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {episode.ideas.length === 0 && (
                  <div className="text-center py-12">
                    <Lightbulb className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <h3 className="text-white/60 text-lg mb-2">No Ideas Yet</h3>
                    <p className="text-white/40">Start brainstorming and add your first idea!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Password Modal */}
        <PasswordModal
          isOpen={passwordModal.isOpen}
          onClose={() => setPasswordModal({ ...passwordModal, isOpen: false })}
          onSuccess={passwordModal.onSuccess}
          title={passwordModal.title}
          description={passwordModal.description}
        />
      </div>
    );
  }

  // Episodes Overview Page
  return (
    <div className="space-y-8">
      {/* Header with Quick Stats */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl"></div>
        <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-wider text-white mb-2">🚀 EPISODE PLANNING</h1>
              <p className="text-white/60 text-lg">Manage your drops from concept to launch</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>NEW EPISODE</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Play className="w-6 h-6 text-blue-400" />
                <span className="text-white/60">Active Episodes</span>
              </div>
              <div className="text-3xl font-black text-white">{activeEpisodes}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="w-6 h-6 text-green-400" />
                <span className="text-white/60">Total Budget</span>
              </div>
              <div className="text-3xl font-black text-white">${totalBudget.toLocaleString()}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
                <span className="text-white/60">Avg Progress</span>
              </div>
              <div className="text-3xl font-black text-white">{Math.round(averageProgress)}%</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-6 h-6 text-purple-400" />
                <span className="text-white/60">Next Drop</span>
              </div>
              <div className="text-3xl font-black text-white">{daysToNextDrop}d</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 appearance-none pr-10"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="production">Production</option>
            <option value="marketing">Marketing</option>
            <option value="launched">Launched</option>
            <option value="completed">Completed</option>
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEpisodes.map((episode) => (
          <div key={episode.id} className="relative group cursor-pointer" onClick={() => onEpisodeSelect?.(episode.id)}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
              
              {/* Episode Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-black text-white mb-1">{episode.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{episode.concept}</p>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(episode.status)}`}>
                    {episode.status.toUpperCase().replace('-', ' ')}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-xs font-medium">PROGRESS</span>
                  <span className="text-white text-xs font-bold">{getCompletionPercentage(episode.tasks)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage(episode.tasks)}%` }}
                  ></div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-xs font-medium">BUDGET</span>
                  </div>
                  <div className="text-white font-bold">${episode.budget.toLocaleString()}</div>
                  <div className="text-white/40 text-xs">Spent: ${episode.spent.toLocaleString()}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-xs font-medium">TARGET</span>
                  </div>
                  <div className="text-white font-bold">${episode.targetRevenue.toLocaleString()}</div>
                </div>
              </div>

              {/* Launch Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-xs font-medium">LAUNCH:</span>
                  <span className="text-white text-xs font-bold">
                    {new Date(episode.launchDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-white/40 text-xs">
                  {episode.tasks.filter(t => t.completed).length}/{episode.tasks.length} tasks
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Episode Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm"></div>
            <div className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">CREATE NEW EPISODE</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-white/40 hover:text-white/60 transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="text-center py-12">
                <div className="text-white/60 text-lg mb-4">Episode Creation Wizard</div>
                <div className="text-white/40">
                  This will be a comprehensive form for creating new episodes with all the planning details.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}