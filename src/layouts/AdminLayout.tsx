import { Outlet, Navigate, Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import React from 'react';
import { Menu, GraduationCap } from 'lucide-react';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const isOwner = localStorage.getItem('isOwner') === 'true';

  if (!isOwner) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-30 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors">Kelajak Labaratoriyasi</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
