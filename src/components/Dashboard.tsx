import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Package, 
  Video, 
  BarChart3, 
  Settings,
  Eye,
  DollarSign,
  Users,
  Clock,
  Target
} from 'lucide-react';
import EpisodeManager from './EpisodeManager';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);

  const stats = [
    { label: 'Total Episodes', value: '12', change: '+2 this month', icon: Video },
    { label: 'Stock Value', value: '$24,580', change: '+12% from last month', icon: Package },
    { label: 'Video Views', value: '1.2M', change: '+18% this week', icon: Eye },
    { label: 'Revenue', value: '$45,230', change: '+25% this month', icon: DollarSign },
  ];

  const recentEpisodes = [
    { id: '1', name: 'Episode 12: Winter Drop', status: 'Live', views: '125K', date: '2024-01-15' },
    { id: '2', name: 'Episode 11: Street Essentials', status: 'Planning', views: '98K', date: '2024-01-08' },
    { id: '3', name: 'Episode 10: Urban Collection', status: 'Completed', views: '156K', date: '2024-01-01' },
  ];

  const stockAlerts = [
    { item: 'Leaked Hoodie - Black M', stock: 5, status: 'low' },
    { item: 'Leaked Tee - White L', stock: 2, status: 'critical' },
    { item: 'Leaked Cap - Black', stock: 15, status: 'good' },
  ];

  const handleEpisodeClick = (episodeId: string) => {
    setSelectedEpisodeId(episodeId);
    setActiveSection('episodes');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-2xl font-black text-white tracking-wider">LEAKED</div>
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'OVERVIEW', icon: BarChart3 },
                  { id: 'episodes', label: 'EPISODES', icon: Video },
                  { id: 'analytics', label: 'ANALYTICS', icon: TrendingUp },
                  { id: 'stock', label: 'STOCK', icon: Package },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (item.id !== 'episodes') {
                        setSelectedEpisodeId(null);
                      }
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-bold tracking-wide transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-white text-black'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl"></div>
              <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h1 className="text-4xl font-black tracking-wider mb-2">BRAND COMMAND CENTER</h1>
                <p className="text-white/60 text-lg">Manage your drops, track performance, and control your empire.</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-8 h-8 text-white/80" />
                      <div className="text-right">
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                        <div className="text-xs text-white/60 font-medium">{stat.label}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/50 font-medium">{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Episodes & Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Episodes */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm"></div>
                <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black tracking-wide">RECENT EPISODES</h2>
                    <button 
                      onClick={() => setActiveSection('episodes')}
                      className="bg-white text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-100 transition-colors"
                    >
                      MANAGE
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentEpisodes.map((episode) => (
                      <div 
                        key={episode.id} 
                        onClick={() => handleEpisodeClick(episode.id)}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div>
                          <div className="font-bold text-white text-sm">{episode.name}</div>
                          <div className="text-white/60 text-xs">{episode.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/80 text-sm font-medium">{episode.views}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            episode.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                            episode.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {episode.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stock Alerts */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-sm"></div>
                <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-black tracking-wide mb-6">STOCK ALERTS</h2>
                  <div className="space-y-4">
                    {stockAlerts.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <div className="font-bold text-white text-sm">{item.item}</div>
                          <div className="text-white/60 text-xs">Stock: {item.stock} units</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                          item.status === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {item.status.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Episodes Section */}
        {activeSection === 'episodes' && (
          <EpisodeManager 
            selectedEpisodeId={selectedEpisodeId}
            onEpisodeSelect={setSelectedEpisodeId}
          />
        )}

        {/* Placeholder sections for other tabs */}
        {activeSection !== 'overview' && activeSection !== 'episodes' && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <h1 className="text-3xl font-black tracking-wider mb-4">
                {activeSection.toUpperCase()} SECTION
              </h1>
              <p className="text-white/60 text-lg">
                This section is under development. Coming soon with advanced features for your brand management.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}