import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Teacher, BlogPost, Course, Application } from './types';
import { MOCK_TEACHERS, MOCK_BLOGS, MOCK_COURSES } from './data';

interface TeacherContextType {
  teachers: Teacher[];
  addTeacher: (teacher: Teacher) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  applications: Application[];
  addApplication: (app: Omit<Application, 'id' | 'date' | 'status'>) => void;
  confirmApplication: (id: string) => void;
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
  const [settings, setSettings] = useState({
    telegramLink: 'https://t.me/futurelab_uz',
    youtubeLink: 'https://youtube.com/@futurelab',
    instagramLink: 'https://instagram.com/futurelab_uz'
  });

  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [teacher, ...prev]);
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter(post => post.id !== id));
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
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
    setApplications((prev) => prev.map(app => 
      app.id === id 
        ? { ...app, status: 'confirmed', contractUrl: '#' } 
        : app
    ));
  };

  const updateSettings = (newSettings: { telegramLink: string; youtubeLink: string; instagramLink: string }) => {
    setSettings(newSettings);
  };

  return (
    <TeacherContext.Provider value={{ 
      teachers, addTeacher, 
      blogPosts, addBlogPost, deleteBlogPost, 
      courses, addCourse, deleteCourse,
      applications, addApplication, confirmApplication,
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
