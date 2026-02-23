import { useTeachers } from '../../TeacherContext';
import { FileText, Eye, CheckCircle, Download, X, Calendar, Phone, MapPin, GraduationCap, FileSpreadsheet, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Application } from '../../types';
import { exportToExcel } from '../../lib/excel';

export const Applications = () => {
  const { applications, confirmApplication } = useTeachers();
  const [selectedApp, setSelectedApp] = React.useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 100;

  const handleExport = () => {
    const data = applications.map(app => ({
      'F.I.SH': app.fullName,
      'Telefon': app.phone,
      'Kurs': app.courseName,
      'Sana': app.date,
      'Holat': app.status === 'confirmed' ? 'Tasdiqlangan' : 'Kutilmoqda',
      'Manzil': app.address,
      'Maktab': app.school,
      'Sinf': app.grade
    }));
    exportToExcel(data, 'Arizalar');
  };

  const filteredApps = applications.filter(app => 
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredApps.length / rowsPerPage);
  const currentApps = filteredApps.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Arizalar</h1>
          <p className="text-slate-500">Kelib tushgan barcha arizalar ro'yxati</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
        >
          <FileSpreadsheet className="w-5 h-5" /> Excelga yuklash
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">F.I.SH</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Telefon</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Kurs</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Sana</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Holat</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Shartnoma</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{app.fullName}</div>
                    <div className="text-xs text-slate-400">{app.address}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                      {app.courseName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'confirmed' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {app.status === 'confirmed' ? 'Tasdiqlangan' : 'Kutilmoqda'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {app.status === 'confirmed' ? (
                      <a 
                        href="#" 
                        className="flex items-center gap-1 text-indigo-600 hover:underline text-sm font-bold"
                      >
                        <Download className="w-4 h-4" /> PDF
                      </a>
                    ) : (
                      <span className="text-slate-300 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {app.status === 'pending' && (
                        <button 
                          onClick={() => confirmApplication(app.id)}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {currentApps.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Arizalar topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="text-sm text-slate-500">
              Jami {filteredApps.length} tadan {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredApps.length)} ko'rsatilmoqda
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">Ariza tafsilotlari</h2>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4 md:p-8 space-y-8 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">F.I.SH</div>
                        <div className="font-bold text-slate-900">{selectedApp.fullName}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Telefon</div>
                        <div className="font-bold text-slate-900">{selectedApp.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Manzil</div>
                        <div className="font-bold text-slate-900">{selectedApp.address}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Kurs</div>
                        <div className="font-bold text-slate-900">{selectedApp.courseName}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Maktab / Sinf</div>
                        <div className="font-bold text-slate-900">{selectedApp.school}, {selectedApp.grade}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Yuborilgan sana</div>
                        <div className="font-bold text-slate-900">{selectedApp.date}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedApp.comment && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Qo'shimcha izoh</div>
                    <p className="text-slate-700 leading-relaxed">{selectedApp.comment}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {selectedApp.status === 'pending' && (
                    <button 
                      onClick={() => {
                        confirmApplication(selectedApp.id);
                        setSelectedApp(null);
                      }}
                      className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                    >
                      Arizani tasdiqlash
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
