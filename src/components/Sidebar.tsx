import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BookOpen, 
  UserSquare2, 
  LogOut,
  GraduationCap,
  Briefcase,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

const sidebarItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Arizalar', path: '/admin/applications', icon: FileText },
  { name: 'O\'quvchilar', path: '/admin/students', icon: Users },
  { name: 'Guruhlar', path: '/admin/groups', icon: BookOpen },
  { name: 'Kurslar', path: '/admin/courses', icon: BookOpen },
  { name: 'O\'qituvchilar', path: '/admin/teachers', icon: UserSquare2 },
  { name: 'Yangiliklar', path: '/admin/blog', icon: FileText },
  { name: 'Vakansiyalar', path: '/admin/vacancies', icon: Briefcase },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col h-screen z-50 transition-transform duration-300 lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors">Kelajak Labaratoriyasi CRM</span>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-lg lg:hidden text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => {
              localStorage.removeItem('isOwner');
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Chiqish
          </button>
        </div>
      </div>
    </>
  );
};
