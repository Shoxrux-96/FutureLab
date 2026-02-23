import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TeacherProvider } from './TeacherContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Vacancies } from './pages/Vacancies';
import { Apply } from './pages/Apply';
import { Login } from './pages/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { Students } from './pages/admin/Students';
import { Groups } from './pages/admin/Groups';
import { GroupDetail } from './pages/admin/GroupDetail';
import { Courses } from './pages/admin/Courses';
import { Teachers } from './pages/admin/Teachers';
import { BlogManagement } from './pages/admin/BlogManagement';
import { VacanciesManagement } from './pages/admin/VacanciesManagement';
import { Applications } from './pages/admin/Applications';
import { StudentDetail } from './pages/admin/StudentDetail';

export default function App() {
  return (
    <TeacherProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* CRM Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/:id" element={<StudentDetail />} />
            <Route path="groups" element={<Groups />} />
            <Route path="groups/:id" element={<GroupDetail />} />
            <Route path="courses" element={<Courses />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="vacancies" element={<VacanciesManagement />} />
            <Route path="applications" element={<Applications />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TeacherProvider>
  );
}
