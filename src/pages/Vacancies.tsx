import React from 'react';
import { motion } from 'motion/react';
import { useTeachers } from '../TeacherContext';
import { Briefcase, MapPin, Clock, DollarSign, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const Vacancies = () => {
  const { vacancies } = useTeachers();
  const activeVacancies = vacancies.filter(v => v.status === 'active');

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold"
          >
            <Briefcase className="w-4 h-4" /> Vakansiyalar
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight"
          >
            Bizning jamoaga <span className="text-indigo-600">qo'shiling</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Kelajakni birgalikda quramiz. O'z sohangizning ustasi bo'lsangiz, biz sizni kutamiz!
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeVacancies.map((vacancy, i) => (
            <motion.div
              key={vacancy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-600 transition-all">
                  <Briefcase className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all" />
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {vacancy.type}
                </span>
              </div>

              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {vacancy.title}
                </h3>
                <p className="text-slate-500 line-clamp-3 leading-relaxed">
                  {vacancy.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {vacancy.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    {vacancy.salary}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Clock className="w-4 h-4" />
                  {vacancy.date}
                </div>
                <Link 
                  to="/apply"
                  className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
                >
                  Ariza topshirish <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}

          {activeVacancies.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Hozircha bo'sh ish o'rinlari yo'q</h3>
                <p className="text-slate-500">Keyinroq yana tekshirib ko'ring yoki bizga ariza qoldiring.</p>
              </div>
              <Link 
                to="/apply"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Umumiy ariza qoldirish
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
