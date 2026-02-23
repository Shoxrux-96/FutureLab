import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { GraduationCap, Instagram, Youtube } from 'lucide-react';
import { useTeachers } from '../TeacherContext';

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

export const PublicLayout = () => {
  const { settings } = useTeachers();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo & About */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-xl">
                  < GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white hover:text-sky-200 transition-colors">Kelajak Labaratoriyasi</span>
              </Link>
              <p className="text-slate-400 leading-relaxed">
                Kelajak Labaratoriyasi – O'zbekistondagi eng zamonaviy o'quv markazlaridan biri. Biz bilan kelajagingizni bugundan quring.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href={settings.youtubeLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href={settings.instagramLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={settings.telegramLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#229ED9] hover:text-white transition-all"
                  title="Telegram"
                >
                  <TelegramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-lg">Tezkor havolalar</h3>
              <ul className="space-y-4">
                {['Bosh sahifa', 'Kurslarimiz', 'O\'qituvchilar', 'Blog', 'Ariza qoldirish'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-lg">Kurslarimiz</h3>
              <ul className="space-y-4">
                {['Matematika & Fizika', 'Ingliz tili (IELTS)', 'IT Dasturlash', 'Kimyo & Biologiya', 'Tarix & Huquq'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Telegram Channel */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-lg">Bizga qo'shiling</h3>
              <p className="text-slate-400 text-sm">So'nggi yangiliklar va chegirmalardan xabardor bo'lish uchun Telegram kanalimizga obuna bo'ling.</p>
              <a 
                href={settings.telegramLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-[#229ED9] text-white py-4 rounded-xl font-bold hover:bg-[#1c84b5] transition-all shadow-lg shadow-sky-500/20"
              >
                <TelegramIcon className="w-5 h-5" /> Telegram kanalimiz
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center">
              © {new Date().getFullYear()} <a href="https://kelajaklaboratoriyasi.uz" target="_blank" rel="noreferrer" className="hover:underline">Kelajak Labaratoriyasi</a>. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex items-center gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300">Maxfiylik siyosati</a>
              <a href="#" className="hover:text-slate-300">Foydalanish shartlari</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
