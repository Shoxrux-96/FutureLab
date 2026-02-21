import { useTeachers } from '../../TeacherContext';
import { BookOpen, Users, Clock, Plus, Trash2, Save, X, Target } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Courses = () => {
  const { courses, addCourse, deleteCourse } = useTeachers();
  const [isAdding, setIsAdding] = React.useState(false);
  const [newCourse, setNewCourse] = React.useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    targetAudience: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      ...newCourse,
      id: Date.now().toString(),
      studentsCount: 0,
    });
    setIsAdding(false);
    setNewCourse({ title: '', description: '', price: 0, duration: '', targetAudience: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kurslar</h1>
          <p className="text-slate-500">Mavjud o'quv dasturlari boshqaruvi</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Yangi kurs
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Kurs nomi</label>
                  <input 
                    required
                    type="text" 
                    value={newCourse.title}
                    onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="Masalan: Frontend React"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Oylik to'lov (so'm)</label>
                  <input 
                    required
                    type="number" 
                    value={newCourse.price}
                    onChange={e => setNewCourse({...newCourse, price: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Davomiyligi</label>
                  <input 
                    required
                    type="text" 
                    value={newCourse.duration}
                    onChange={e => setNewCourse({...newCourse, duration: e.target.value})}
                    placeholder="Masalan: 6 oy"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Kimlar uchun</label>
                  <input 
                    required
                    type="text" 
                    value={newCourse.targetAudience}
                    onChange={e => setNewCourse({...newCourse, targetAudience: e.target.value})}
                    placeholder="Masalan: 7-11 sinf o'quvchilari"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tavsif</label>
                <textarea 
                  required
                  rows={3}
                  value={newCourse.description}
                  onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  Saqlash <Save className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 hover:shadow-md transition-all relative group">
            <button 
              onClick={() => deleteCourse(course.id)}
              className="absolute top-4 right-4 p-2 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>

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
      </div>
    </div>
  );
};
