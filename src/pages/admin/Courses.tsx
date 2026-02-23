import { useTeachers } from '../../TeacherContext';
import { BookOpen, Users, Clock, Plus, Trash2, Save, X, Target, FileSpreadsheet, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { exportToExcel } from '../../lib/excel';
import { Course } from '../../types';
import { cn } from '../../lib/utils';

export const Courses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useTeachers();
  const [showModal, setShowModal] = React.useState(false);
  const [editingCourse, setEditingCourse] = React.useState<Course | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    const data = courses.map(c => ({
      'Kurs nomi': c.title,
      'Narxi': c.price,
      'Davomiyligi': c.duration,
      'O\'quvchilar soni': c.studentsCount,
      'Maqsadli auditoriya': c.targetAudience,
      'Tavsif': c.description
    }));
    exportToExcel(data, 'Kurslar');
  };

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    targetAudience: '',
  });

  React.useEffect(() => {
    if (editingCourse) {
      setFormData({
        title: editingCourse.title,
        description: editingCourse.description,
        price: editingCourse.price,
        duration: editingCourse.duration,
        targetAudience: editingCourse.targetAudience,
      });
    } else {
      setFormData({ title: '', description: '', price: 0, duration: '', targetAudience: '' });
    }
  }, [editingCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse({
        ...editingCourse,
        ...formData,
      });
    } else {
      addCourse({
        ...formData,
        id: Date.now().toString(),
        studentsCount: 0,
      });
    }
    setShowModal(false);
    setEditingCourse(null);
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kurslar</h1>
          <p className="text-slate-500">Mavjud o'quv dasturlari boshqaruvi</p>
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
            <Plus className="w-5 h-5" /> Yangi kurs
          </button>
        </div>
      </div>

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
                  {editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
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
                  <label className="text-sm font-bold text-slate-700">Kurs nomi</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="Masalan: Frontend React"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Oylik to'lov (so'm)</label>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Davomiyligi</label>
                    <input 
                      required
                      type="text" 
                      value={formData.duration}
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                      placeholder="Masalan: 6 oy"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kimlar uchun</label>
                  <input 
                    required
                    type="text" 
                    value={formData.targetAudience}
                    onChange={e => setFormData({...formData, targetAudience: e.target.value})}
                    placeholder="Masalan: 7-11 sinf o'quvchilari"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tavsif</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 hover:shadow-md transition-all relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button 
                onClick={() => openEditModal(course)}
                className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => deleteCourse(course.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-between items-start">
              <div className="bg-indigo-50 p-3 rounded-2xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-lg font-bold text-indigo-600">
                {course.price.toLocaleString()} <span className="text-xs text-slate-400">so'm/oy</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Target className="w-4 h-4 text-indigo-500" />
                <span className="font-medium">Kimlar uchun:</span> {course.targetAudience}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="font-medium">Muddati:</span> {course.duration}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                {course.studentsCount} o'quvchi
              </div>
            </div>
          </div>
        ))}
        {paginatedCourses.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            Hozircha kurslar mavjud emas. Yangi kurs qo'shing.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">
            Jami <span className="font-bold text-slate-900">{courses.length}</span> tadan 
            <span className="font-bold text-slate-900"> {startIndex + 1}-{Math.min(startIndex + itemsPerPage, courses.length)}</span> ko'rsatilmoqda
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
    </div>
  );
};
