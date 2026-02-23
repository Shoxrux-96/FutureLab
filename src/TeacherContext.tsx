import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Teacher, BlogPost, Course, Application, Student, Contract, Payment, Group, Vacancy } from './types';
import { MOCK_TEACHERS, MOCK_BLOGS, MOCK_COURSES, MOCK_STUDENTS, MOCK_CONTRACTS } from './data';

interface TeacherContextType {
  teachers: Teacher[];
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (teacher: Teacher) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  updateBlogPost: (post: BlogPost) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  applications: Application[];
  addApplication: (app: Omit<Application, 'id' | 'date' | 'status'>) => void;
  confirmApplication: (id: string) => void;
  students: Student[];
  updateStudentStatus: (id: string, status: Student['status']) => void;
  addPayment: (studentId: string, payment: Omit<Payment, 'id'>) => void;
  contracts: Contract[];
  deleteContract: (id: string) => void;
  groups: Group[];
  addGroup: (group: Omit<Group, 'id' | 'createdAt' | 'studentIds'>) => void;
  addStudentToGroup: (groupId: string, studentId: string) => void;
  vacancies: Vacancy[];
  addVacancy: (vacancy: Vacancy) => void;
  updateVacancy: (vacancy: Vacancy) => void;
  deleteVacancy: (id: string) => void;
  settings: {
    telegramLink: string;
    youtubeLink: string;
    instagramLink: string;
  };
  updateSettings: (settings: { telegramLink: string; youtubeLink: string; instagramLink: string }) => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export const TeacherProvider = ({ children }: { children: ReactNode }) => {
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(MOCK_BLOGS);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [applications, setApplications] = useState<Application[]>([]);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [groups, setGroups] = useState<Group[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [settings, setSettings] = useState({
    telegramLink: 'https://t.me/futurelab_uz',
    youtubeLink: 'https://youtube.com/@futurelab',
    instagramLink: 'https://instagram.com/futurelab_uz'
  });

  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [teacher, ...prev]);
  };

  const updateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) => prev.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter(post => post.id !== id));
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts((prev) => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses((prev) => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter(c => c.id !== id));
  };

  const addApplication = (appData: Omit<Application, 'id' | 'date' | 'status'>) => {
    const newApp: Application = {
      ...appData,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      status: 'pending'
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const confirmApplication = (id: string) => {
    const app = applications.find(a => a.id === id);
    if (!app || app.status === 'confirmed') return;

    const course = courses.find(c => c.id === app.courseId);
    const studentId = Date.now().toString();
    const contractId = `CON-${Date.now()}`;
    
    // Generate custom ID: FL + 4 digits
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const customId = `FL${randomDigits}`;

    // Update application status
    setApplications((prev) => prev.map(a => 
      a.id === id 
        ? { ...a, status: 'confirmed', contractUrl: '#' } 
        : a
    ));

    // Add to students
    const newStudent: Student = {
      id: studentId,
      customId: customId,
      name: app.fullName,
      phone: app.phone,
      address: app.address,
      school: app.school,
      grade: app.grade,
      course: app.courseName,
      courseId: app.courseId,
      status: 'active',
      joinedDate: new Date().toLocaleDateString(),
      payments: []
    };
    setStudents(prev => [newStudent, ...prev]);

    // Add to contracts
    const newContract: Contract = {
      id: contractId,
      studentId: studentId,
      studentName: app.fullName,
      courseName: app.courseName,
      amount: course?.price || 0,
      date: new Date().toLocaleDateString(),
      status: 'active',
      fileUrl: '#'
    };
    setContracts(prev => [newContract, ...prev]);
  };

  const updateStudentStatus = (id: string, status: Student['status']) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const addPayment = (studentId: string, paymentData: Omit<Payment, 'id'>) => {
    const payment: Payment = {
      ...paymentData,
      id: Date.now().toString()
    };
    setStudents(prev => prev.map(s => 
      s.id === studentId 
        ? { ...s, payments: [payment, ...s.payments] } 
        : s
    ));
  };

  const deleteContract = (id: string) => {
    setContracts(prev => prev.filter(c => c.id !== id));
  };

  const addGroup = (groupData: Omit<Group, 'id' | 'createdAt' | 'studentIds'>) => {
    const newGroup: Group = {
      ...groupData,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
      studentIds: []
    };
    setGroups(prev => [newGroup, ...prev]);
  };

  const addStudentToGroup = (groupId: string, studentId: string) => {
    setGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        if (g.studentIds.includes(studentId)) return g;
        return { ...g, studentIds: [...g.studentIds, studentId] };
      }
      return g;
    }));
  };

  const addVacancy = (vacancy: Vacancy) => {
    setVacancies(prev => [vacancy, ...prev]);
  };

  const updateVacancy = (updatedVacancy: Vacancy) => {
    setVacancies(prev => prev.map(v => v.id === updatedVacancy.id ? updatedVacancy : v));
  };

  const deleteVacancy = (id: string) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
  };

  const updateSettings = (newSettings: { telegramLink: string; youtubeLink: string; instagramLink: string }) => {
    setSettings(newSettings);
  };

  return (
    <TeacherContext.Provider value={{ 
      teachers, addTeacher, updateTeacher,
      blogPosts, addBlogPost, deleteBlogPost, updateBlogPost,
      courses, addCourse, updateCourse, deleteCourse,
      applications, addApplication, confirmApplication,
      students, updateStudentStatus, addPayment,
      contracts, deleteContract,
      groups, addGroup, addStudentToGroup,
      vacancies, addVacancy, updateVacancy, deleteVacancy,
      settings, updateSettings 
    }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeachers = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error('useTeachers must be used within a TeacherProvider');
  }
  return context;
};
