import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  Save,
  Globe,
  Youtube,
  Instagram,
  Briefcase,
  MapPin,
  Clock,
  Trash2,
  Newspaper,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useTeachers } from '../../TeacherContext';
import React from 'react';
import { cn } from '../../lib/utils';

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-3.903 16.355-3.903 16.355-.12.54-.42.66-.84.42l-6-4.44-2.88 2.76c-.3.3-.54.54-.9.54l.42-6.12 11.1-10.02c.48-.42-.12-.66-.72-.24l-13.74 8.64-5.94-1.86c-1.26-.42-1.26-1.26.24-1.86l23.22-8.94c1.08-.42 2.04.24 1.56 2.1z" />
  </svg>
);

export const Dashboard = () => {
  const { settings, updateSettings, students, courses, teachers, vacancies, blogPosts, deleteVacancy, deleteBlogPost } = useTeachers();
  const [tgLink, setTgLink] = React.useState(settings.telegramLink);
  const [ytLink, setYtLink] = React.useState(settings.youtubeLink);
  const [igLink, setIgLink] = React.useState(settings.instagramLink);

  // Real-time stats calculation
  const totalStudents = students.length;
  const activeCourses = courses.length;
  
  const allPayments = students.flatMap(s => s.payments);
  const totalRevenue = allPayments.reduce((acc, p) => acc + p.amount, 0);
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const monthlyRevenue = allPayments
    .filter(p => p.month === currentMonth || p.date.includes(new Date().getFullYear().toString())) // Simplified logic
    .reduce((acc, p) => acc + p.amount, 0);

  const stats = [
    { label: 'Jami o\'quvchilar', value: totalStudents.toLocaleString(), icon: Users, trend: '+0%', up: true },
    { label: 'Faol kurslar', value: activeCourses.toLocaleString(), icon: BookOpen, trend: '+0', up: true },
    { label: 'Oylik daromad', value: monthlyRevenue.toLocaleString(), icon: DollarSign, trend: '+0%', up: true },
    { label: 'Umumiy daromad', value: totalRevenue.toLocaleString(), icon: TrendingUp, trend: '+0%', up: true },
  ];

  // Dynamic chart data (last 6 months)
  const chartData = [
    { name: 'Yan', revenue: 0, students: 0 },
    { name: 'Feb', revenue: 0, students: 0 },
    { name: 'Mar', revenue: 0, students: 0 },
    { name: 'Apr', revenue: 0, students: 0 },
    { name: 'May', revenue: 0, students: 0 },
    { name: 'Iyun', revenue: 0, students: 0 },
  ].map(month => {
    // This is a placeholder for real historical data if we had it
    // For now, let's just show current data in the current month
    return month;
  });

  const handleSaveSettings = () => {
    updateSettings({ 
      telegramLink: tgLink,
      youtubeLink: ytLink,
      instagramLink: igLink
    });
    alert('Sozlamalar saqlandi!');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">O'quv markazining umumiy tahlili</p>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
          Bugun: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="bg-indigo-50 p-2 rounded-xl">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900">Daromad dinamikasi (so'm)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(v: number) => [v.toLocaleString() + " so'm", "Daromad"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900">O'quvchilar soni</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="students" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="text-xl font-bold text-slate-900">Oxirgi to'lovlar</h3>
            <p className="text-slate-500 text-sm">Markazga kelib tushgan so'nggi moliyaviy amallar</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-8 py-4">O'quvchi</th>
                  <th className="px-8 py-4">Sana</th>
                  <th className="px-8 py-4">Oy</th>
                  <th className="px-8 py-4">Summa</th>
                  <th className="px-8 py-4">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.flatMap(s => s.payments.map(p => ({ ...p, studentName: s.name }))).slice(0, 5).map((payment, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4 font-bold text-slate-900">{payment.studentName}</td>
                    <td className="px-8 py-4 text-sm text-slate-500">{payment.date}</td>
                    <td className="px-8 py-4 text-sm text-slate-600 font-medium">{payment.month}</td>
                    <td className="px-8 py-4 font-bold text-indigo-600">{payment.amount.toLocaleString()} so'm</td>
                    <td className="px-8 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase">
                        To'langan
                      </span>
                    </td>
                  </tr>
                ))}
                {allPayments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400">
                      Hozircha to'lovlar mavjud emas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Faol vakansiyalar</h3>
              <p className="text-slate-500 text-sm">Jamoaga qo'shilish uchun ochiq o'rinlar</p>
            </div>
            <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
              {vacancies.filter(v => v.status === 'active').length} ta ochiq
            </div>
          </div>
          <div className="p-8 space-y-4">
            {vacancies.filter(v => v.status === 'active').slice(0, 3).map((vacancy) => (
              <div key={vacancy.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all group">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-all">
                  <Briefcase className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{vacancy.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {vacancy.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {vacancy.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-indigo-600">{vacancy.salary}</div>
                    <div className="text-[10px] text-slate-400">{vacancy.date}</div>
                  </div>
                  <button 
                    onClick={() => {
                      if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
                        deleteVacancy(vacancy.id);
                      }
                    }}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {vacancies.filter(v => v.status === 'active').length === 0 && (
              <div className="py-12 text-center text-slate-400">
                Hozircha faol vakansiyalar yo'q
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent News Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Oxirgi yangiliklar</h3>
            <p className="text-slate-500 text-sm">Saytda e'lon qilingan so'nggi maqolalar</p>
          </div>
          <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
            {blogPosts.length} ta jami
          </div>
        </div>
        <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="bg-slate-50/50 rounded-3xl p-4 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all relative">
              <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-3 h-3" /> {post.date}
                </div>
                <h4 className="font-bold text-slate-900 line-clamp-1">{post.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
              </div>
              <button 
                onClick={() => {
                  if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
                    deleteBlogPost(post.id);
                  }
                }}
                className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {blogPosts.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              Hozircha yangiliklar yo'q
            </div>
          )}
        </div>
      </div>

      {/* Settings Section at the Bottom */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" /> Ijtimoiy Tarmoq Sozlamalari
          </h3>
          <p className="text-slate-500 text-sm">Saytdagi ijtimoiy tarmoq havolalarini shu yerdan boshqarishingiz mumkin</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <div className="p-2 bg-sky-50 rounded-lg">
                <TelegramIcon className="w-4 h-4 text-sky-600" />
              </div>
              Telegram Havolasi
            </label>
            <input 
              type="text" 
              value={tgLink}
              onChange={(e) => setTgLink(e.target.value)}
              placeholder="https://t.me/..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/30"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <Youtube className="w-4 h-4 text-red-600" />
              </div>
              YouTube Havolasi
            </label>
            <input 
              type="text" 
              value={ytLink}
              onChange={(e) => setYtLink(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/30"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <div className="p-2 bg-pink-50 rounded-lg">
                <Instagram className="w-4 h-4 text-pink-600" />
              </div>
              Instagram Havolasi
            </label>
            <input 
              type="text" 
              value={igLink}
              onChange={(e) => setIgLink(e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/30"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSaveSettings}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xl shadow-indigo-200"
          >
            <Save className="w-5 h-5" /> Sozlamalarni saqlash
          </button>
        </div>
      </div>
    </div>
  );
};
