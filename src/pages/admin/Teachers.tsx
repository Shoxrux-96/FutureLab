import { useTeachers } from '../../TeacherContext';
import { Mail, Phone, Plus, MoreHorizontal, X, Upload, FileSpreadsheet, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { exportToExcel } from '../../lib/excel';
import { Teacher } from '../../types';
import { cn } from '../../lib/utils';

export const Teachers = () => {
  const { teachers, addTeacher, updateTeacher } = useTeachers();
  const [showModal, setShowModal] = React.useState(false);
  const [editingTeacher, setEditingTeacher] = React.useState<Teacher | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = teachers.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    const data = teachers.map(t => ({
      'F.I.SH': t.name,
      'Mutaxassislik': t.subject,
      'Tajriba': t.experience,
      'Telefon': t.phone,
      'Iqtibos': t.quote
    }));
    exportToExcel(data, 'O\'qituvchilar');
  };

  const [formData, setFormData] = React.useState({
    name: '',
    subject: '',
    experience: '',
    phone: '',
    image: '',
    tags: '',
    quote: ''
  });

  React.useEffect(() => {
    if (editingTeacher) {
      setFormData({
        name: editingTeacher.name,
        subject: editingTeacher.subject,
        experience: editingTeacher.experience,
        phone: editingTeacher.phone,
        image: editingTeacher.image,
        tags: editingTeacher.tags.join(', '),
        quote: editingTeacher.quote
      });
    } else {
      setFormData({
        name: '',
        subject: '',
        experience: '',
        phone: '',
        image: '',
        tags: '',
        quote: ''
      });
    }
  }, [editingTeacher]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacherData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      image: formData.image || 'https://picsum.photos/seed/teacher/400/400'
    };

    if (editingTeacher) {
      updateTeacher({
        ...editingTeacher,
        ...teacherData
      });
    } else {
      addTeacher({
        ...teacherData,
        id: Date.now().toString()
      });
    }
    setShowModal(false);
    setEditingTeacher(null);
  };

  const openAddModal = () => {
    setEditingTeacher(null);
    setShowModal(true);
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setShowModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">O'qituvchilar</h1>
          <p className="text-slate-500">Mentorlar va mutaxassislar jamoasi</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            <FileSpreadsheet className="w-5 h-5" /> Excel
          </button>
          <button 
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all"
          >
            <Plus className="w-5 h-5" /> Yangi o'qituvchi
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button 
                onClick={() => openEditModal(teacher)}
                className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="w-16 h-16 rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{teacher.name}</h3>
                <p className="text-sm text-indigo-600 font-medium">{teacher.subject}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-500 line-clamp-2 italic">"{teacher.quote}"</p>
              <div className="flex flex-wrap gap-1">
                {teacher.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 pt-2">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>
                {teacher.phone}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tajriba:</span>
                <span className="font-bold text-slate-900">{teacher.experience}</span>
              </div>
            </div>
          </div>
        ))}
        {paginatedTeachers.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            Hozircha o'qituvchilar mavjud emas. Yangi o'qituvchi qo'shing.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">
            Jami <span className="font-bold text-slate-900">{teachers.length}</span> tadan 
            <span className="font-bold text-slate-900"> {startIndex + 1}-{Math.min(startIndex + itemsPerPage, teachers.length)}</span> ko'rsatilmoqda
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Oldingi
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                    currentPage === i + 1 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
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

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-4 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  {editingTeacher ? 'O\'qituvchini tahrirlash' : 'Yangi o\'qituvchi qo\'shish'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">F.I.SH</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Masalan: Sardorbek Ismoilov"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mutaxassisligi</label>
                    <input 
                      required
                      type="text" 
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      placeholder="MATEMATIKA"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tajribasi</label>
                    <input 
                      required
                      type="text" 
                      value={formData.experience}
                      onChange={e => setFormData({...formData, experience: e.target.value})}
                      placeholder="8 Yil"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Telefon</label>
                  <input 
                    required
                    type="text" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+998 90 111 22 33"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Rasm yuklash</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 transition-all group">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                      <span className="text-sm text-slate-500 group-hover:text-indigo-500">Rasm tanlang</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {formData.image && (
                      <img src={formData.image} className="w-12 h-12 rounded-xl object-cover" alt="Preview" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Teglar (vergul bilan ajrating)</label>
                  <input 
                    type="text" 
                    value={formData.tags}
                    onChange={e => setFormData({...formData, tags: e.target.value})}
                    placeholder="React, Frontend, JavaScript"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Iqtibos</label>
                  <textarea 
                    rows={2}
                    value={formData.quote}
                    onChange={e => setFormData({...formData, quote: e.target.value})}
                    placeholder="O'qituvchi haqida qisqacha..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Saqlash
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Bekor qilish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
