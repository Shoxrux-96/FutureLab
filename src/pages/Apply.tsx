import React from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, BookOpen, Clock, DollarSign, Target, ChevronRight, FileText, Users } from 'lucide-react';
import { useTeachers } from '../TeacherContext';

export const Apply = () => {
  const { courses, addApplication } = useTeachers();
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    address: '',
    school: '',
    grade: '',
    courseId: '',
    comment: ''
  });

  React.useEffect(() => {
    if (courses.length > 0 && !formData.courseId) {
      setFormData(prev => ({ ...prev, courseId: courses[0].id }));
    }
  }, [courses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCourse = courses.find(c => c.id === formData.courseId);
    addApplication({
      ...formData,
      courseName: selectedCourse?.title || 'Noma\'lum kurs'
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-slate-900">Arizangiz qabul qilindi!</h1>
        <p className="text-slate-600">
          Tez orada operatorlarimiz siz bilan bog'lanishadi. Bizni tanlaganingiz uchun rahmat!
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Yana ariza qoldirish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">Kursga yozilish</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            O'zingizga ma'qul kursni tanlang va ma'lumotlaringizni qoldiring. Biz sizga maslahat beramiz.
          </p>
        </div>

        {/* Application Form at the Top */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Ism va Familiya</label>
                <input 
                  required
                  type="text" 
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Ali Valiyev"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Telefon raqam</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                />
              </div>
            </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Yashash manzili</label>
                <input 
                  required
                  type="text" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  placeholder="Shovot tumani, Mustaqillik ko'chasi"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-3 md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 ml-1">Maktabi</label>
                  <input 
                    required
                    type="text" 
                    value={formData.school}
                    onChange={e => setFormData({...formData, school: e.target.value})}
                    placeholder="1-maktab"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                  />
                </div>
                <div className="space-y-3 md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 ml-1">Sinfi</label>
                  <input 
                    required
                    type="text" 
                    value={formData.grade}
                    onChange={e => setFormData({...formData, grade: e.target.value})}
                    placeholder="9-sinf"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                  />
                </div>
                <div className="space-y-3 col-span-2 md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 ml-1">Kursni tanlang</label>
                  <select 
                    value={formData.courseId}
                    onChange={e => setFormData({...formData, courseId: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-white"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Qo'shimcha izoh</label>
                <textarea 
                  rows={3}
                  value={formData.comment}
                  onChange={e => setFormData({...formData, comment: e.target.value})}
                  placeholder="Savollaringiz bo'lsa yozing..."
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none bg-slate-50/50"
                />
              </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 group"
            >
              Arizani yuborish 
              <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Courses Table */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" /> Mavjud kurslar ro'yxati
              </h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Kurs</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Muddati</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">To'lov</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900">{course.title}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{course.targetAudience}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-indigo-400" />
                          {course.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-indigo-600 font-bold text-sm">
                          {course.price.toLocaleString()} so'm
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Telegram Bot Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-sky-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col justify-between shadow-2xl shadow-sky-200 relative overflow-hidden group"
          >
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl group-hover:bg-sky-400/30 transition-all duration-700"></div>
            
            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-start">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl"
                >
                  <svg viewBox="0 0 24 24" fill="#0284c7" className="w-10 h-10">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-3.903 16.355-3.903 16.355-.12.54-.42.66-.84.42l-6-4.44-2.88 2.76c-.3.3-.54.54-.9.54l.42-6.12 11.1-10.02c.48-.42-.12-.66-.72-.24l-13.74 8.64-5.94-1.86c-1.26-.42-1.26-1.26.24-1.86l23.22-8.94c1.08-.42 2.04.24 1.56 2.1z" />
                  </svg>
                </motion.div>
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                  Online 24/7
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-black leading-tight">Arizani tasdiqlash va Shartnoma</h2>
                <p className="text-sky-100 text-lg leading-relaxed">
                  FutureLab o'quv markazida o'qishni boshlash uchun so'nggi qadam! Botimiz orqali siz:
                </p>
                
                <ul className="grid gap-3">
                  {[
                    { icon: CheckCircle2, text: 'Arizangizni bir zumda tasdiqlang' },
                    { icon: FileText, text: 'Elektron shartnomani yuklab oling' },
                    { icon: Users, text: 'Guruhlar va dars jadvalini ko\'ring' },
                    { icon: Send, text: 'Adminlar bilan to\'g\'ridan-to\'g\'ri bog\'laning' }
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default"
                    >
                      <item.icon className="w-5 h-5 text-sky-300" />
                      <span className="font-medium text-sm">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.a 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="https://t.me/futurelab_bot" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-sky-600 w-full py-5 rounded-2xl font-black text-xl hover:bg-sky-50 transition-all shadow-2xl shadow-sky-900/30 group/btn"
              >
                Botga o'tish
                <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
              </motion.a>
              
              <p className="text-center text-sky-200/60 text-xs font-medium">
                * Shartnoma qonuniy kuchga ega va avtomatik shakllantiriladi
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subjects Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-black text-slate-900">Bizning yo'nalishlarimiz</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Siz uchun eng kerakli va ommabop fanlar bo'yicha chuqurlashtirilgan kurslar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Matematika', icon: 'Σ' },
            { name: 'Fizika', icon: '⚛' },
            { name: 'Ona tili', icon: '✍' },
            { name: 'Ingliz tili', icon: 'A' },
            { name: 'Rus tili', icon: 'Я' },
            { name: 'Kimyo', icon: 'H₂O' },
            { name: 'Biologiya', icon: '🧬' },
            { name: 'Tarix', icon: '📜' },
            { name: 'Huquq', icon: '⚖' },
            { name: 'IT Dasturlash', icon: '</>' },
          ].map((subject, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center space-y-4 group">
              <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {subject.icon}
              </div>
              <h3 className="font-bold text-slate-900">{subject.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
