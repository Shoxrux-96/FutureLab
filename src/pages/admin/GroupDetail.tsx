import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTeachers } from '../../TeacherContext';
import { 
  ArrowLeft, 
  Users, 
  Plus, 
  Search, 
  X, 
  UserPlus,
  Trash2,
  GraduationCap,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { exportToExcel } from '../../lib/excel';

export const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { groups, students, addStudentToGroup } = useTeachers();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const group = groups.find(g => g.id === id);

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="text-slate-400">Guruh topilmadi</div>
        <button 
          onClick={() => navigate('/admin/groups')}
          className="text-indigo-600 font-bold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Ro'yxatga qaytish
        </button>
      </div>
    );
  }

  const groupStudents = students.filter(s => group.studentIds.includes(s.id));

  const handleExport = () => {
    const data = groupStudents.map(s => ({
      'ID': s.customId,
      'F.I.SH': s.name,
      'Telefon': s.phone,
      'Holat': s.status === 'active' ? 'Faol' : 'Tark etgan',
      'Maktab': s.school,
      'Sinf': s.grade
    }));
    exportToExcel(data, `${group.name}_oquvchilari`);
  };

  // Students available to add (not in group and match search)
  const availableStudents = students.filter(s => 
    !group.studentIds.includes(s.id) && 
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     s.customId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/admin/groups')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Orqaga
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-slate-900">{group.name}</h1>
            <p className="text-slate-500 text-sm">{group.courseName} • {group.teacherName}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Guruh o'quvchilari</h3>
            <p className="text-slate-500 text-sm">Jami: {groupStudents.length} ta o'quvchi</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExport}
              className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
            >
              <FileSpreadsheet className="w-5 h-5" /> Excel
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              <UserPlus className="w-5 h-5" /> O'quvchi qo'shish
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-6">ID</th>
                <th className="px-8 py-6">F.I.SH</th>
                <th className="px-8 py-6">Telefon</th>
                <th className="px-8 py-6">Holat</th>
                <th className="px-8 py-6 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {groupStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-mono text-indigo-600 font-bold">{student.customId}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900">{student.name}</div>
                    <div className="text-xs text-slate-400">{student.school}, {student.grade}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-600">{student.phone}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      student.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    )}>
                      {student.status === 'active' ? 'Faol' : 'Tark etgan'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {groupStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400">
                    Guruhda hozircha o'quvchilar yo'q.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">O'quvchi biriktirish</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Ism yoki ID (FL...) bo'yicha qidirish"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  {availableStudents.map(student => (
                    <button
                      key={student.id}
                      onClick={() => {
                        addStudentToGroup(group.id, student.id);
                        setSearchTerm('');
                      }}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100">
                          <GraduationCap className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{student.customId}</div>
                        </div>
                      </div>
                      <Plus className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                    </button>
                  ))}
                  {availableStudents.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      O'quvchilar topilmadi
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-full bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-300 transition-all"
                >
                  Yopish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
