import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Trophy, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap,
  Star,
  Zap,
  ShieldCheck,
  Globe,
  Clock,
  Atom
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTeachers } from '../TeacherContext';
import { Teacher } from '../types';

const TeacherCard = ({ teacher }: { teacher: Teacher }) => {
  return (
    <div className="group relative w-full max-w-[380px] h-[480px] bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-indigo-500/30 transition-all duration-500 flex flex-col items-center text-center overflow-hidden cursor-pointer hover:-translate-y-2">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image Section */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 ring-4 ring-white">
          <img 
            src={teacher.image} 
            alt={teacher.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-3 -right-3 bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
          {teacher.subject === "FIZIKA" ? <Atom size={18} /> : <BookOpen size={18} />}
        </div>
      </div>

      {/* Title & Subject */}
      <div className="space-y-1 mb-4">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{teacher.name}</h3>
        <p className="text-indigo-600 font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
           <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
           {teacher.subject}
        </p>
      </div>

      {/* Quote/Description */}
      <div className="relative px-2 mb-8">
        <span className="absolute -top-3 left-0 text-4xl text-indigo-100 font-serif">“</span>
        <p className="text-slate-500 text-sm leading-relaxed italic">
          {teacher.quote}
        </p>
        <span className="absolute -bottom-6 right-0 text-4xl text-indigo-100 font-serif rotate-180">“</span>
      </div>

      {/* Skills/Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 mt-auto">
        {teacher.tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="px-4 py-1.5 bg-slate-50 text-slate-600 text-[11px] font-semibold rounded-full border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Stats */}
      <div className="w-full pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] tracking-widest uppercase">
          <Clock size={14} className="text-indigo-500" />
          Tajriba
        </div>
        <div className="bg-slate-900 text-white px-4 py-1 rounded-xl text-xs font-black shadow-lg shadow-slate-200">
          {teacher.experience}
        </div>
      </div>

      {/* Hover Action Button */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export const Home = () => {
  const { teachers } = useTeachers();

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.1]"
            >
              Bilim bilan <br />
              <span className="text-indigo-600">cho'qqilarni zabt eting</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed font-medium"
            >
              Matematika, IT, tillar va gumanitar fanlar bo'yicha professional ta'lim. 
              Biz bilan oliy o'quv yurtlariga kirish va zamonaviy kasb egasi bo'lish osonroq.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link 
                to="/apply" 
                className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-200 group"
              >
                Hoziroq ro'yxatdan o'ting <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                    alt="User"
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                  +2k
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-100 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-100 rounded-full blur-[120px] opacity-30" />
        </div>
      </section>

      {/* About Detailed Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">FutureLab – Kelajak laboratoriyasi</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                "FutureLab" — bu shunchaki o'quv markazi emas, bu kelajak bunyodkorlari maskani. Biz 2018-yildan buyon minglab yoshlarga o'z maqsadlariga erishishda ko'maklashib kelmoqdamiz. Bizning asosiy maqsadimiz — sifatli ta'limni hamma uchun ochiq qilishdir.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Aniq fanlar', desc: 'Matematika va Fizika bo\'yicha chuqurlashtirilgan darslar.', icon: Zap },
                { title: 'Tillar', desc: 'Ingliz (IELTS), Rus va Ona tili-adabiyot kurslari.', icon: Globe },
                { title: 'Tabiiy fanlar', desc: 'Kimyo va Biologiya — tibbiyotga yo\'l.', icon: ShieldCheck },
                { title: 'Zamonaviy IT', desc: 'Dasturlash va raqamli texnologiyalar.', icon: BookOpen },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/classroom/800/800" 
                alt="Classroom" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-indigo-600 text-white p-10 rounded-3xl shadow-2xl hidden xl:block">
              <div className="text-5xl font-black mb-2">10+</div>
              <div className="text-lg font-bold opacity-80">Yillik tajriba</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-black text-white">Nega aynan bizni tanlashadi?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Bizning o'quv markazimizda har bir o'quvchi uchun individual yondashuv va natija kafolati mavjud.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Professional Ustozlar', 
                desc: 'Barcha ustozlarimiz kamida 5 yillik tajribaga va xalqaro sertifikatlarga ega.',
                icon: Users
              },
              { 
                title: 'Zamonaviy Metodika', 
                desc: 'Darslarimiz eng so\'nggi o\'quv metodlari va texnologiyalar asosida o\'tiladi.',
                icon: Zap
              },
              { 
                title: 'Natija Kafolati', 
                desc: 'O\'quvchilarimizning 90% dan ortig\'i oliy o\'quv yurtlariga muvaffaqiyatli kirishadi.',
                icon: Trophy
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/50 p-10 rounded-[2rem] border border-slate-700/50 space-y-6 hover:bg-slate-800 transition-all">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-black text-slate-900">Bizning mahoratli ustozlarimiz</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            O'z sohasining haqiqiy mutaxassislari sizga bilim berishga tayyor.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
          {teachers.slice(0, 5).map((teacher, i) => (
            <motion.div 
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <TeacherCard teacher={teacher} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact & Map Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden grid lg:grid-cols-2">
          <div className="p-12 lg:p-20 space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900">Biz bilan bog'laning</h2>
              <p className="text-slate-500">Savollaringiz bormi? Bizga qo'ng'iroq qiling yoki tashrif buyuring.</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                  <Phone className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Telefon</div>
                  <div className="text-xl font-bold text-slate-900">+998 71 123 45 67</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                  <Mail className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email</div>
                  <div className="text-xl font-bold text-slate-900">info@futurelab.uz</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                  <MapPin className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manzil</div>
                  <div className="text-xl font-bold text-slate-900">Xorazm viloyati, Shovot tumani, IT Park</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[500px] lg:h-auto bg-slate-100 relative">
            {/* Map Placeholder - Using a real iframe for better UX */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d421.6362060765824!2d60.291262007687514!3d41.65465174970239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41de49003887a0a7%3A0xc84af4a76a6708f4!2sIT%20Park%20Shovot!5e1!3m2!1suz!2s!4v1771686001018!5m2!1suz!2s" 
              className="w-full h-full border-0"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
