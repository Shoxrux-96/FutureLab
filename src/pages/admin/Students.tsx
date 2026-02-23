import { useTeachers } from '../../TeacherContext';
import { Search, Plus, MoreVertical, Phone, ExternalLink, FileSpreadsheet, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import React from 'react';
import { exportToExcel } from '../../lib/excel';

export const Students = () => {
  const { students } = useTeachers();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 100;

  const handleExport = () => {
    const data = students.map(s => ({
      'ID': s.customId,
      'F.I.O': s.name,
      'Kurs': s.course,
      'Telefon': s.phone,
      'Holat': s.status === 'active' ? 'Faol' : s.status === 'graduated' ? 'Bitirgan' : 'Tark etgan',
      'Manzil': s.address,
      'Maktab': s.school,
      'Sinf': s.grade,
      'Qo\'shilgan sana': s.joinedDate
    }));
    exportToExcel(data, 'O\'quvchilar');
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.phone.includes(searchTerm) ||
    s.customId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const currentStudents = filteredStudents.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">O'quvchilar</h1>
          <p className="text-slate-500">Barcha o'quvchilar ro'yxati va holati</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            <FileSpreadsheet className="w-5 h-5" /> Excel
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all">
            <Plus className="w-5 h-5" /> Yangi o'quvchi
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Ism yoki telefon bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">F.I.O</th>
                <th className="px-6 py-4">Kurs</th>
                <th className="px-6 py-4">Telefon</th>
                <th className="px-6 py-4">Holat</th>
                <th className="px-6 py-4">Sana</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <Link 
                      to={`/admin/students/${student.id}`}
                      className="group-hover:text-indigo-600 transition-colors"
                    >
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        {student.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-slate-400 font-mono font-bold text-indigo-600">{student.customId}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.course}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-3 h-3" /> {student.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      student.status === 'active' ? "bg-emerald-50 text-emerald-600" :
                      student.status === 'graduated' ? "bg-blue-50 text-blue-600" :
                      "bg-red-50 text-red-600"
                    )}>
                      {student.status === 'active' ? 'Faol' : 
                       student.status === 'graduated' ? 'Bitirgan' : 'Tark etgan'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{student.joinedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
              {currentStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    O'quvchilar topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="text-sm text-slate-500">
              Jami {filteredStudents.length} tadan {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredStudents.length)} ko'rsatilmoqda
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Oldingi
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm"
              >
                Keyingi <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
