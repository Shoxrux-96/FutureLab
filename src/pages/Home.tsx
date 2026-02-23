import { motion } from 'motion/react';
import { cn } from '../lib/utils';
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
  Atom,
  Rocket,
  Newspaper,
  Calendar
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
  const { teachers, courses, blogPosts } = useTeachers();
  const recentPosts = blogPosts.filter(p => p.status === 'published').slice(0, 3);

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


      {/* Interactive Courses Section with Rocket */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
        >
          {/* Animated Rocket */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute right-10 top-10 md:right-20 md:top-20 opacity-20 md:opacity-40 pointer-events-none"
          >
            <Rocket size={200} className="text-white" />
          </motion.div>

          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black leading-tight">Bizning kurslarimiz</h2>
              <p className="text-xl text-indigo-100 leading-relaxed">
                O'zingizga ma'qul yo'nalishni tanlang va bilim olishni boshlang. 
                Biz bilan kelajak cho'qqilariga parvoz qiling!
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                to="/apply" 
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                Kurslarni ko'rish <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 rounded-full blur-[100px]" />
        </motion.div>
      </section>
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Kelajak Labaratoriyasi – O'quv markazi</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                "Kelajak Labaratoriyasi" — bu shunchaki o'quv markazi emas, bu kelajak bunyodkorlari maskani. Biz 2018-yildan buyon minglab yoshlarga o'z maqsadlariga erishishda ko'maklashib kelmoqdamiz. Bizning asosiy maqsadimiz — sifatli ta'limni hamma uchun ochiq qilishdir.
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
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Bizning yo'nalishlarimiz</h3>
                <p className="text-slate-500">O'zingizga mos yo'nalishni tanlang</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {courses.slice(0, 6).map((course, i) => (
                  <motion.div 
                    key={course.id}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "p-6 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all",
                      i % 6 === 0 ? 'bg-blue-50 text-blue-600' :
                      i % 6 === 1 ? 'bg-indigo-50 text-indigo-600' :
                      i % 6 === 2 ? 'bg-amber-50 text-amber-600' :
                      i % 6 === 3 ? 'bg-emerald-50 text-emerald-600' :
                      i % 6 === 4 ? 'bg-rose-50 text-rose-600' :
                      'bg-purple-50 text-purple-600'
                    )}
                  >
                    <BookOpen className="w-8 h-8" />
                    <span className="font-bold text-sm text-center">{course.title}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/${i+10}/100/100`} 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      alt="Student"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                    +500
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">500+</div>
                  <div className="text-xs text-slate-500 font-medium">Muvaffaqiyatli o'quvchilar</div>
                </div>
              </div>
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
      {teachers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black text-slate-900">Bizning mahoratli ustozlarimiz</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              O'z sohasining haqiqiy mutaxassislari sizga bilim berishga tayyor.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
            {teachers.map((teacher, i) => (
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
      )}

      {/* Recent News Section */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900">So'nggi yangiliklar</h2>
              <p className="text-slate-500 max-w-xl">
                O'quv markazimiz hayotidagi eng muhim voqealar va foydali maqolalar.
              </p>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all group"
            >
              Barcha yangiliklar <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all flex flex-col"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    {post.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 line-clamp-2 flex-1 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:gap-3 transition-all pt-4"
                  >
                    Batafsil <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

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
                  <div className="text-xl font-bold text-slate-900">+998 99 964 96 95</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                  <Mail className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email</div>
                  <div className="text-xl font-bold text-slate-900">groupwebtexno@gmail.com</div>
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
