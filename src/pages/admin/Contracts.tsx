import { MOCK_CONTRACTS } from '../../data';
import { FileText, Download, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Contracts = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shartnomalar</h1>
          <p className="text-slate-500">Moliyaviy hujjatlar va to'lovlar nazorati</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all">
          <Filter className="w-5 h-5" /> Saralash
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_CONTRACTS.map((contract) => (
          <div key={contract.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{contract.id}</div>
                <div className="text-sm text-slate-500">{contract.studentName} • {contract.courseName}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase mb-1">Summa</div>
                <div className="font-bold text-slate-900">{contract.amount.toLocaleString()} so'm</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase mb-1">Sana</div>
                <div className="text-sm text-slate-600">{contract.date}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase mb-1">Holat</div>
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                  contract.status === 'paid' ? "bg-emerald-50 text-emerald-600" :
                  contract.status === 'pending' ? "bg-amber-50 text-amber-600" :
                  "bg-red-50 text-red-600"
                )}>
                  {contract.status === 'paid' ? 'To\'langan' : 
                   contract.status === 'pending' ? 'Kutilmoqda' : 'Qarzdor'}
                </span>
              </div>
              <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
