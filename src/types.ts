export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  month: string;
}

export interface Student {
  id: string;
  customId: string;
  name: string;
  phone: string;
  address: string;
  school: string;
  grade: string;
  course: string;
  courseId: string;
  status: 'active' | 'graduated' | 'dropped';
  joinedDate: string;
  payments: Payment[];
}

export interface Group {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  studentIds: string[];
  createdAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  experience: string;
  phone: string;
  image: string;
  tags: string[];
  quote: string;
}

export interface Application {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  school: string;
  grade: string;
  courseId: string;
  courseName: string;
  comment: string;
  date: string;
  status: 'pending' | 'confirmed';
  contractUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  studentsCount: number;
  targetAudience: string;
}

export interface Contract {
  id: string;
  studentId: string;
  studentName: string;
  courseName: string;
  amount: number;
  date: string;
  status: 'active' | 'cancelled';
  fileUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  videoUrl?: string;
  status: 'published' | 'draft';
}

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Remote';
  location: string;
  date: string;
  status: 'active' | 'closed';
}
