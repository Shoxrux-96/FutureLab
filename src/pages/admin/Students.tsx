import { MOCK_STUDENTS } from '../../data';
import { Search, Plus, MoreVertical, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Students = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">O'quvchilar</h1>
          <p className="text-slate-500">Barcha o'quvchilar ro'yxati va holati</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all">
          <Plus className="w-5 h-5" /> Yangi o'quvchi
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Ism yoki telefon bo'yicha qidirish..."
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
              {MOCK_STUDENTS.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{student.name}</div>
                    <div className="text-xs text-slate-400">ID: {student.id}</div>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
