import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  DollarSign, 
  Target, 
  Users, 
  Plus, 
  Trash2,
  User,
  Package,
  CheckCircle2
} from 'lucide-react';

interface EpisodeFormData {
  name: string;
  concept: string;
  status: 'planning' | 'in-progress' | 'production' | 'marketing' | 'launched' | 'completed';
  startDate: string;
  launchDate: string;
  budget: number;
  targetRevenue: number;
  teamMembers: { name: string; role: string; }[];
  products: { name: string; variants: string[]; quantity: number; cost: number; price: number; }[];
  initialTasks: { title: string; category: 'design' | 'production' | 'marketing' | 'content' | 'sales'; dueDate: string; }[];
}

interface EpisodeCreationFormProps {
  onClose: () => void;
  onSubmit: (episodeData: EpisodeFormData) => void;
}

export default function EpisodeCreationForm({ onClose, onSubmit }: EpisodeCreationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EpisodeFormData>({
    name: '',
    concept: '',
    status: 'planning',
    startDate: '',
    launchDate: '',
    budget: 0,
    targetRevenue: 0,
    teamMembers: [],
    products: [],
    initialTasks: []
  });

  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '' });
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    variants: [''], 
    quantity: 0, 
    cost: 0, 
    price: 0 
  });
  const [newTask, setNewTask] = useState({ 
    title: '', 
    category: 'design' as const, 
    dueDate: '' 
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: CheckCircle2 },
    { id: 2, title: 'Timeline & Budget', icon: Calendar },
    { id: 3, title: 'Team', icon: Users },
    { id: 4, title: 'Products', icon: Package },
    { id: 5, title: 'Initial Tasks', icon: CheckCircle2 }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const addTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, newTeamMember]
      });
      setNewTeamMember({ name: '', role: '' });
    }
  };

  const removeTeamMember = (index: number) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index)
    });
  };

  const addProduct = () => {
    if (newProduct.name) {
      setFormData({
        ...formData,
        products: [...formData.products, {
          ...newProduct,
          variants: newProduct.variants.filter(v => v.trim() !== '')
        }]
      });
      setNewProduct({ name: '', variants: [''], quantity: 0, cost: 0, price: 0 });
    }
  };

  const removeProduct = (index: number) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index)
    });
  };

  const addVariant = () => {
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, '']
    });
  };

  const updateVariant = (index: number, value: string) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index] = value;
    setNewProduct({
      ...newProduct,
      variants: updatedVariants
    });
  };

  const removeVariant = (index: number) => {
    setNewProduct({
      ...newProduct,
      variants: newProduct.variants.filter((_, i) => i !== index)
    });
  };

  const addTask = () => {
    if (newTask.title && newTask.dueDate) {
      setFormData({
        ...formData,
        initialTasks: [...formData.initialTasks, newTask]
      });
      setNewTask({ title: '', category: 'design', dueDate: '' });
    }
  };

  const removeTask = (index: number) => {
    setFormData({
      ...formData,
      initialTasks: formData.initialTasks.filter((_, i) => i !== index)
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.concept;
      case 2:
        return formData.startDate && formData.launchDate && formData.budget > 0 && formData.targetRevenue > 0;
      case 3:
        return true; // Team members are optional
      case 4:
        return true; // Products are optional
      case 5:
        return true; // Tasks are optional
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm"></div>
        <div className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-black text-white">CREATE NEW EPISODE</h2>
              <p className="text-white/60">Step {currentStep} of {steps.length}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/60 transition-colors text-2xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between p-6 bg-white/5">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-white text-black border-white' 
                    : 'border-white/30 text-white/60'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-bold ${
                    currentStep >= step.id ? 'text-white' : 'text-white/60'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-white' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-bold mb-2">
                    Episode Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Episode 13: Summer Vibes"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-bold mb-2">
                    Concept Description *
                  </label>
                  <textarea
                    value={formData.concept}
                    onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                    placeholder="Describe the theme, inspiration, and vision for this episode..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-bold mb-2">
                    Initial Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="production">Production</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Timeline & Budget */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2">
                      Launch Date *
                    </label>
                    <input
                      type="date"
                      value={formData.launchDate}
                      onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2">
                      Budget ($) *
                    </label>
                    <input
                      type="number"
                      value={formData.budget || ''}
                      onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                      placeholder="15000"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-bold mb-2">
                      Target Revenue ($) *
                    </label>
                    <input
                      type="number"
                      value={formData.targetRevenue || ''}
                      onChange={(e) => setFormData({ ...formData, targetRevenue: Number(e.target.value) })}
                      placeholder="45000"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Team */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-4">Add Team Member</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={newTeamMember.name}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                      placeholder="Name"
                      className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    />
                    <input
                      type="text"
                      value={newTeamMember.role}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                      placeholder="Role"
                      className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <button
                    onClick={addTeamMember}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Member</span>
                  </button>
                </div>

                {formData.teamMembers.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-white font-bold">Team Members</h3>
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-white/60" />
                          <div>
                            <div className="text-white font-bold">{member.name}</div>
                            <div className="text-white/60 text-sm">{member.role}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Products */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-4">Add Product</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Product Name"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    />
                    
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Variants</label>
                      {newProduct.variants.map((variant, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            value={variant}
                            onChange={(e) => updateVariant(index, e.target.value)}
                            placeholder="e.g., S, M, L, XL"
                            className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                          />
                          {newProduct.variants.length > 1 && (
                            <button
                              onClick={() => removeVariant(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addVariant}
                        className="text-white/60 hover:text-white text-sm"
                      >
                        + Add Variant
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-1">Quantity</label>
                        <input
                          type="number"
                          value={newProduct.quantity || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-1">Cost ($)</label>
                        <input
                          type="number"
                          value={newProduct.cost || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, cost: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={newProduct.price || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={addProduct}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors mt-4"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                {formData.products.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-white font-bold">Products</h3>
                    {formData.products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                        <div>
                          <div className="text-white font-bold">{product.name}</div>
                          <div className="text-white/60 text-sm">
                            {product.variants.join(', ')} • {product.quantity} units • ${product.price}
                          </div>
                        </div>
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Initial Tasks */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-4">Add Initial Task</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Task Title"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                        className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                      >
                        <option value="design">Design</option>
                        <option value="production">Production</option>
                        <option value="marketing">Marketing</option>
                        <option value="content">Content</option>
                        <option value="sales">Sales</option>
                      </select>
                      
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={addTask}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors mt-4"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                </div>

                {formData.initialTasks.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-white font-bold">Initial Tasks</h3>
                    {formData.initialTasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                        <div>
                          <div className="text-white font-bold">{task.title}</div>
                          <div className="text-white/60 text-sm capitalize">
                            {task.category} • Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => removeTask(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 text-white/60 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-4">
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Create Episode
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}