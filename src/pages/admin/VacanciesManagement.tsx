import { useTeachers } from '../../TeacherContext';
import { Plus, Trash2, Briefcase, MapPin, Clock, DollarSign, Edit3, X, Save, Search, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vacancy } from '../../types';
import { cn } from '../../lib/utils';

export const VacanciesManagement = () => {
  const { vacancies, addVacancy, updateVacancy, deleteVacancy } = useTeachers();
  const [showModal, setShowModal] = React.useState(false);
  const [editingVacancy, setEditingVacancy] = React.useState<Vacancy | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = React.useState<Omit<Vacancy, 'id' | 'date'>>({
    title: '',
    description: '',
    requirements: [],
    salary: '',
    type: 'Full-time',
    location: 'Shovot',
    status: 'active'
  });

  const [reqInput, setReqInput] = React.useState('');

  React.useEffect(() => {
    if (editingVacancy) {
      setFormData({
        title: editingVacancy.title,
        description: editingVacancy.description,
        requirements: editingVacancy.requirements,
        salary: editingVacancy.salary,
        type: editingVacancy.type,
        location: editingVacancy.location,
        status: editingVacancy.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        requirements: [],
        salary: '',
        type: 'Full-time',
        location: 'Shovot',
        status: 'active'
      });
    }
  }, [editingVacancy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vacancyData: Vacancy = {
      ...formData,
      id: editingVacancy ? editingVacancy.id : Date.now().toString(),
      date: editingVacancy ? editingVacancy.date : new Date().toLocaleDateString(),
    };

    if (editingVacancy) {
      updateVacancy(vacancyData);
    } else {
      addVacancy(vacancyData);
    }
    setShowModal(false);
    setEditingVacancy(null);
  };

  const addRequirement = () => {
    if (reqInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, reqInput.trim()]
      }));
      setReqInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const filteredVacancies = vacancies.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVacancies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVacancies = filteredVacancies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vakansiyalar boshqaruvi</h1>
          <p className="text-slate-500">Ish o'rinlarini yaratish va tahrirlash</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all w-64"
            />
          </div>
          <button 
            onClick={() => {
              setEditingVacancy(null);
              setShowModal(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all"
          >
            <Plus className="w-5 h-5" /> Yangi vakansiya
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {paginatedVacancies.map((vacancy) => (
          <div key={vacancy.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6 items-start group hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
              <Briefcase className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{vacancy.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {vacancy.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {vacancy.type}</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-bold"><DollarSign className="w-4 h-4" /> {vacancy.salary}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingVacancy(vacancy);
                      setShowModal(true);
                    }}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
                        deleteVacancy(vacancy.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-slate-600 text-sm line-clamp-2">{vacancy.description}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {vacancy.status === 'active' ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3" /> Faol
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-1 rounded-md">
                      <AlertCircle className="w-3 h-3" /> Yopilgan
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">Yaratilgan: {vacancy.date}</span>
              </div>
            </div>
          </div>
        ))}

        {paginatedVacancies.length === 0 && (
          <div className="py-20 text-center text-slate-400 bg-white rounded-[2rem] border border-dashed border-slate-200">
            Vakansiyalar topilmadi.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">
            Jami <span className="font-bold text-slate-900">{filteredVacancies.length}</span> tadan 
            <span className="font-bold text-slate-900"> {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVacancies.length)}</span> ko'rsatilmoqda
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Oldingi
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm"
            >
              Keyingi <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingVacancy ? 'Vakansiyani tahrirlash' : 'Yangi vakansiya qo\'shish'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Lavozim nomi</label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="Masalan: Matematika o'qituvchisi"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Ish turi</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value as any})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Maosh (so'm)</label>
                    <input 
                      required
                      type="text" 
                      value={formData.salary}
                      onChange={e => setFormData({...formData, salary: e.target.value})}
                      placeholder="Masalan: 5,000,000 - 8,000,000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Manzil</label>
                    <input 
                      required
                      type="text" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      placeholder="Shovot, IT Park"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tavsif</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Ish haqida qisqacha ma'lumot..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">Talablar</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={reqInput}
                      onChange={e => setReqInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      placeholder="Talab qo'shish..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <button 
                      type="button"
                      onClick={addRequirement}
                      className="px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                    >
                      Qo'shish
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.map((req, i) => (
                      <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium">
                        {req}
                        <button type="button" onClick={() => removeRequirement(i)} className="hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Status</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, status: 'active'})}
                      className={cn(
                        "flex-1 py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2",
                        formData.status === 'active' 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                          : "bg-white border-slate-200 text-slate-400"
                      )}
                    >
                      <CheckCircle2 className="w-5 h-5" /> Faol
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, status: 'closed'})}
                      className={cn(
                        "flex-1 py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2",
                        formData.status === 'closed' 
                          ? "bg-red-50 border-red-200 text-red-600" 
                          : "bg-white border-slate-200 text-slate-400"
                      )}
                    >
                      <AlertCircle className="w-5 h-5" /> Yopilgan
                    </button>
                  </div>
                </div>
              </form>

              <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> Saqlash
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-8 bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-300 transition-all"
                >
                  Bekor qilish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
