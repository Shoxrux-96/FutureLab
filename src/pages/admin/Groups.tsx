import { useTeachers } from '../../TeacherContext';
import { BookOpen, Users, Plus, X, UserSquare2, ChevronRight, FileSpreadsheet, ChevronLeft, Search } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { exportToExcel } from '../../lib/excel';

export const Groups = () => {
  const { groups, courses, teachers, addGroup } = useTeachers();
  const [showModal, setShowModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 100;

  const [formData, setFormData] = React.useState({
    name: '',
    courseId: '',
    teacherId: '',
  });

  const handleExport = () => {
    const data = groups.map(g => ({
      'Guruh nomi': g.name,
      'Kurs': g.courseName,
      'O\'qituvchi': g.teacherName,
      'O\'quvchilar soni': g.studentIds.length,
      'Yaratilgan sana': g.createdAt
    }));
    exportToExcel(data, 'Guruhlar');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find(c => c.id === formData.courseId);
    const teacher = teachers.find(t => t.id === formData.teacherId);

    if (!course || !teacher) return;

    addGroup({
      name: formData.name,
      courseId: formData.courseId,
      courseName: course.title,
      teacherId: formData.teacherId,
      teacherName: teacher.name,
    });
    setShowModal(false);
    setFormData({ name: '', courseId: '', teacherId: '' });
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedGroups = filteredGroups.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Guruhlar</h1>
          <p className="text-slate-500">O'quv markazidagi barcha faol guruhlar</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Guruh, kurs yoki o'qituvchi..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all w-64"
            />
          </div>
          <button 
            onClick={handleExport}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            <FileSpreadsheet className="w-5 h-5" /> Excel
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all"
          >
            <Plus className="w-5 h-5" /> Yangi guruh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-6">Guruh nomi</th>
                <th className="px-8 py-6">Kurs</th>
                <th className="px-8 py-6">O'qituvchi</th>
                <th className="px-8 py-6">O'quvchilar soni</th>
                <th className="px-8 py-6 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedGroups.map((group) => (
                <tr key={group.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <Link 
                      to={`/admin/groups/${group.id}`}
                      className="font-bold text-slate-900 hover:text-indigo-600 flex items-center gap-2"
                    >
                      {group.name}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                      {group.courseName}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <UserSquare2 className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="font-medium text-slate-700">{group.teacherName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="font-bold">{group.studentIds.length} ta</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      to={`/admin/groups/${group.id}`}
                      className="text-indigo-600 font-bold text-sm hover:underline"
                    >
                      Batafsil
                    </Link>
                  </td>
                </tr>
              ))}
              {paginatedGroups.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400">
                    Hozircha guruhlar mavjud emas. Yangi guruh yarating.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Jami <span className="font-bold text-slate-900">{filteredGroups.length}</span> tadan 
              <span className="font-bold text-slate-900"> {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredGroups.length)}</span> ko'rsatilmoqda
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
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Yangi guruh yaratish</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Guruh nomi</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Masalan: Frontend-101"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kursni tanlang</label>
                  <select 
                    required
                    value={formData.courseId}
                    onChange={e => setFormData({...formData, courseId: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">Kursni tanlang</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">O'qituvchini tanlang</label>
                  <select 
                    required
                    value={formData.teacherId}
                    onChange={e => setFormData({...formData, teacherId: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">O'qituvchini tanlang</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Yaratish
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
