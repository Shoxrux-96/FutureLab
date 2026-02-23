import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTeachers } from '../../TeacherContext';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Plus, 
  CheckCircle2, 
  Clock,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, addPayment, updateStudentStatus } = useTeachers();
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  
  const student = students.find(s => s.id === id);

  const [paymentForm, setPaymentForm] = React.useState({
    amount: '',
    month: new Date().toLocaleString('uz-UZ', { month: 'long' }),
    status: 'paid' as 'paid' | 'pending'
  });

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="text-slate-400">O'quvchi topilmadi</div>
        <button 
          onClick={() => navigate('/admin/students')}
          className="text-indigo-600 font-bold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Ro'yxatga qaytish
        </button>
      </div>
    );
  }

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    addPayment(student.id, {
      amount: Number(paymentForm.amount),
      month: paymentForm.month,
      status: paymentForm.status,
      date: new Date().toLocaleDateString()
    });
    setShowPaymentModal(false);
    setPaymentForm({
      amount: '',
      month: new Date().toLocaleString('uz-UZ', { month: 'long' }),
      status: 'paid'
    });
  };

  return (
    <div className="space-y-8">
      <button 
        onClick={() => navigate('/admin/students')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold"
      >
        <ArrowLeft className="w-4 h-4" /> Orqaga
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold">
                {student.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
                <p className="text-slate-500 text-sm">{student.course}</p>
              </div>
              <div className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                student.status === 'active' ? "bg-emerald-50 text-emerald-600" :
                student.status === 'graduated' ? "bg-blue-50 text-blue-600" :
                "bg-red-50 text-red-600"
              )}>
                {student.status === 'active' ? 'Faol' : 
                 student.status === 'graduated' ? 'Bitirgan' : 'Tark etgan'}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">{student.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">{student.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">{student.school}, {student.grade}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">Qo'shilgan sana: {student.joinedDate}</span>
              </div>
            </div>

            <div className="pt-6">
              <select 
                value={student.status}
                onChange={(e) => updateStudentStatus(student.id, e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="active">Faol</option>
                <option value="graduated">Bitirgan</option>
                <option value="dropped">Tark etgan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">To'lovlar tarixi</h3>
                <p className="text-slate-500 text-sm">O'quvchining barcha amalga oshirgan to'lovlari</p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                <Plus className="w-5 h-5" /> To'lov qo'shish
              </button>
            </div>

            <div className="space-y-4">
              {student.payments.map((payment) => (
                <div 
                  key={payment.id} 
                  className="flex items-center justify-between p-6 rounded-3xl border border-slate-50 hover:border-indigo-100 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      payment.status === 'paid' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{payment.amount.toLocaleString()} so'm</div>
                      <div className="text-xs text-slate-400 font-medium">{payment.month} oyi uchun • {payment.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      payment.status === 'paid' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {payment.status === 'paid' ? 'To\'langan' : 'Kutilmoqda'}
                    </span>
                  </div>
                </div>
              ))}
              {student.payments.length === 0 && (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-400">Hozircha to'lovlar mavjud emas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">To'lov qo'shish</h2>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddPayment} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Summa (so'm)</label>
                  <input 
                    required
                    type="number" 
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    placeholder="Masalan: 450000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Qaysi oy uchun</label>
                  <select 
                    value={paymentForm.month}
                    onChange={(e) => setPaymentForm({ ...paymentForm, month: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    {['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Holati</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setPaymentForm({ ...paymentForm, status: 'paid' })}
                      className={cn(
                        "py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2",
                        paymentForm.status === 'paid' ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "border-slate-100 text-slate-400"
                      )}
                    >
                      <CheckCircle2 className="w-4 h-4" /> To'langan
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentForm({ ...paymentForm, status: 'pending' })}
                      className={cn(
                        "py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2",
                        paymentForm.status === 'pending' ? "bg-amber-50 border-amber-200 text-amber-600" : "border-slate-100 text-slate-400"
                      )}
                    >
                      <Clock className="w-4 h-4" /> Kutilmoqda
                    </button>
                  </div>
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
                    onClick={() => setShowPaymentModal(false)}
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
