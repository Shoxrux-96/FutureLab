export interface Student {
  id: string;
  name: string;
  phone: string;
  course: string;
  status: 'active' | 'graduated' | 'dropped';
  joinedDate: string;
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
  studentName: string;
  courseName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}
