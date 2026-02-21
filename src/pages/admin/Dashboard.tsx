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
  Instagram
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

const data = [
  { name: 'Yan', revenue: 45000000, students: 45 },
  { name: 'Feb', revenue: 52000000, students: 52 },
  { name: 'Mar', revenue: 48000000, students: 48 },
  { name: 'Apr', revenue: 61000000, students: 61 },
  { name: 'May', revenue: 55000000, students: 55 },
  { name: 'Iyun', revenue: 67000000, students: 67 },
];

const stats = [
  { label: 'Jami o\'quvchilar', value: '1,248', icon: Users, trend: '+12%', up: true },
  { label: 'Faol kurslar', value: '24', icon: BookOpen, trend: '+2', up: true },
  { label: 'Oylik daromad', value: '67,000,000', icon: DollarSign, trend: '+8%', up: true },
  { label: 'Yillik daromad', value: '742,000,000', icon: TrendingUp, trend: '+15%', up: true },
];

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
  const { settings, updateSettings } = useTeachers();
  const [tgLink, setTgLink] = React.useState(settings.telegramLink);
  const [ytLink, setYtLink] = React.useState(settings.youtubeLink);
  const [igLink, setIgLink] = React.useState(settings.instagramLink);

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
              <AreaChart data={data}>
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
              <BarChart data={data}>
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

import { cn } from '../../lib/utils';
