import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  Users, 
  Package, 
  CheckCircle2, 
  Clock,
  Edit3,
  Save,
  X,
  Trash2,
  User
} from 'lucide-react';
import EpisodeCreationForm from './EpisodeCreationForm';
import PasswordModal from './PasswordModal';

interface TeamMember {
  name: string;
  role: string;
}

interface Episode {
  id: string;
  name: string;
  concept: string;
  status: 'planning' | 'in-progress' | 'production' | 'marketing' | 'launched' | 'completed';
  startDate: string;
  launchDate: string;
  budget: number;
  targetRevenue: number;
  teamMembers: TeamMember[];
  products: any[];
  tasks: any[];
}

interface EpisodeManagerProps {
  selectedEpisodeId: string | null;
  onEpisodeSelect: (id: string | null) => void;
}

export default function EpisodeManager({ selectedEpisodeId, onEpisodeSelect }: EpisodeManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editedTeamMembers, setEditedTeamMembers] = useState<TeamMember[]>([]);
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '' });

  // Mock episodes data
  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: '1',
      name: 'Episode 12: Winter Drop',
      concept: 'A winter-themed collection featuring cozy streetwear with premium materials and minimalist designs.',
      status: 'launched',
      startDate: '2024-01-01',
      launchDate: '2024-01-15',
      budget: 25000,
      targetRevenue: 75000,
      teamMembers: [
        { name: 'Alex Chen', role: 'Creative Director' },
        { name: 'Sarah Kim', role: 'Designer' },
        { name: 'Mike Johnson', role: 'Production Manager' }
      ],
      products: [],
      tasks: []
    },
    {
      id: '2',
      name: 'Episode 11: Street Essentials',
      concept: 'Essential streetwear pieces that blend comfort with urban aesthetics.',
      status: 'planning',
      startDate: '2024-01-08',
      launchDate: '2024-02-01',
      budget: 20000,
      targetRevenue: 60000,
      teamMembers: [
        { name: 'Jordan Lee', role: 'Lead Designer' },
        { name: 'Taylor Swift', role: 'Marketing Lead' }
      ],
      products: [],
      tasks: []
    }
  ]);

  const selectedEpisode = episodes.find(ep => ep.id === selectedEpisodeId);

  const handleCreateEpisode = (episodeData: any) => {
    const newEpisode: Episode = {
      id: Date.now().toString(),
      ...episodeData
    };
    setEpisodes([...episodes, newEpisode]);
  };

  const handleProtectedAction = (action: () => void) => {
    setPendingAction(() => action);
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    pendingAction();
    setShowPasswordModal(false);
  };

  const startEditingTeam = () => {
    if (selectedEpisode) {
      setEditedTeamMembers([...selectedEpisode.teamMembers]);
      setIsEditingTeam(true);
    }
  };

  const cancelEditingTeam = () => {
    setIsEditingTeam(false);
    setEditedTeamMembers([]);
    setNewTeamMember({ name: '', role: '' });
  };

  const saveTeamChanges = () => {
    if (selectedEpisode) {
      const updatedEpisodes = episodes.map(ep => 
        ep.id === selectedEpisode.id 
          ? { ...ep, teamMembers: editedTeamMembers }
          : ep
      );
      setEpisodes(updatedEpisodes);
      setIsEditingTeam(false);
      setEditedTeamMembers([]);
      setNewTeamMember({ name: '', role: '' });
    }
  };

  const addTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      setEditedTeamMembers([...editedTeamMembers, newTeamMember]);
      setNewTeamMember({ name: '', role: '' });
    }
  };

  const removeTeamMember = (index: number) => {
    setEditedTeamMembers(editedTeamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: 'name' | 'role', value: string) => {
    const updated = [...editedTeamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setEditedTeamMembers(updated);
  };

  if (!selectedEpisodeId) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-wider mb-2">EPISODE MANAGER</h1>
            <p className="text-white/60">Create and manage your brand episodes</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>NEW EPISODE</span>
          </button>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <div 
              key={episode.id}
              onClick={() => onEpisodeSelect(episode.id)}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    episode.status === 'launched' ? 'bg-green-500/20 text-green-400' :
                    episode.status === 'planning' ? 'bg-yellow-500/20 text-yellow-400' :
                    episode.status === 'production' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {episode.status.toUpperCase()}
                  </div>
                  <Calendar className="w-5 h-5 text-white/60" />
                </div>
                
                <h3 className="text-xl font-black text-white mb-2">{episode.name}</h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{episode.concept}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Budget:</span>
                    <span className="text-white font-bold">${episode.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Target:</span>
                    <span className="text-white font-bold">${episode.targetRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Team:</span>
                    <span className="text-white font-bold">{episode.teamMembers.length} members</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCreateForm && (
          <EpisodeCreationForm
            onClose={() => setShowCreateForm(false)}
            onSubmit={handleCreateEpisode}
          />
        )}
      </div>
    );
  }

  if (!selectedEpisode) {
    return <div>Episode not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onEpisodeSelect(null)}
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Back to Episodes
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-wider">{selectedEpisode.name}</h1>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
              selectedEpisode.status === 'launched' ? 'bg-green-500/20 text-green-400' :
              selectedEpisode.status === 'planning' ? 'bg-yellow-500/20 text-yellow-400' :
              selectedEpisode.status === 'production' ? 'bg-blue-500/20 text-blue-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {selectedEpisode.status.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Episode Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Concept */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-black tracking-wide mb-4">CONCEPT</h2>
              <p className="text-white/80 leading-relaxed">{selectedEpisode.concept}</p>
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm"></div>
              <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-6 h-6 text-white/80" />
                  <h3 className="text-lg font-black">TIMELINE</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-white/60 text-sm">Start Date</div>
                    <div className="text-white font-bold">{new Date(selectedEpisode.startDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Launch Date</div>
                    <div className="text-white font-bold">{new Date(selectedEpisode.launchDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm"></div>
              <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="w-6 h-6 text-white/80" />
                  <h3 className="text-lg font-black">BUDGET</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-white/60 text-sm">Allocated</div>
                    <div className="text-white font-bold">${selectedEpisode.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Target Revenue</div>
                    <div className="text-white font-bold">${selectedEpisode.targetRevenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm"></div>
          <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-white/80" />
                <h3 className="text-lg font-black">TEAM</h3>
              </div>
              {!isEditingTeam ? (
                <button
                  onClick={() => handleProtectedAction(startEditingTeam)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={saveTeamChanges}
                    className="flex items-center space-x-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={cancelEditingTeam}
                    className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {!isEditingTeam ? (
                // Display mode
                selectedEpisode.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <User className="w-5 h-5 text-white/60" />
                    <div>
                      <div className="text-white font-bold text-sm">{member.name}</div>
                      <div className="text-white/60 text-xs">{member.role}</div>
                    </div>
                  </div>
                ))
              ) : (
                // Edit mode
                <>
                  {editedTeamMembers.map((member, index) => (
                    <div key={index} className="space-y-2 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between">
                        <User className="w-5 h-5 text-white/60" />
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        placeholder="Name"
                        className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                        placeholder="Role"
                        className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
                      />
                    </div>
                  ))}

                  {/* Add new member form */}
                  <div className="space-y-2 p-3 bg-white/10 rounded-lg border border-white/20 border-dashed">
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Plus className="w-4 h-4" />
                      <span>Add New Member</span>
                    </div>
                    <input
                      type="text"
                      value={newTeamMember.name}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
                    />
                    <input
                      type="text"
                      value={newTeamMember.role}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                      placeholder="Role"
                      className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm"
                    />
                    <button
                      onClick={addTeamMember}
                      disabled={!newTeamMember.name || !newTeamMember.role}
                      className="w-full bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Member
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
          title="EDIT TEAM"
          description="Enter password to modify team members"
        />
      )}
    </div>
  );
}