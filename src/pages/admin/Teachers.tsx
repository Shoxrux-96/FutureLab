import { useTeachers } from '../../TeacherContext';
import { Mail, Phone, Plus, MoreHorizontal } from 'lucide-react';

export const Teachers = () => {
  const { teachers, addTeacher } = useTeachers();

  const handleAddTeacher = () => {
    const newTeacher = {
      id: Date.now().toString(),
      name: 'Yangi Ustoz',
      subject: 'IT DASTURLASH',
      experience: '5 Yil',
      phone: '+998 90 000 00 00',
      image: 'https://picsum.photos/seed/new/400/400',
      tags: ['Dasturlash', 'Algoritmlar'],
      quote: 'Bilim — bu kuch.'
    };
    addTeacher(newTeacher);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">O'qituvchilar</h1>
          <p className="text-slate-500">Mentorlar va mutaxassislar jamoasi</p>
        </div>
        <button 
          onClick={handleAddTeacher}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Yangi o'qituvchi
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="w-16 h-16 rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{teacher.name}</h3>
                <p className="text-sm text-indigo-600 font-medium">{teacher.subject}</p>
              </div>
              <button className="p-1 hover:bg-slate-50 rounded-lg">
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-500 line-clamp-2 italic">"{teacher.quote}"</p>
              <div className="flex flex-wrap gap-1">
                {teacher.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 pt-2">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>
                {teacher.phone}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tajriba:</span>
                <span className="font-bold text-slate-900">{teacher.experience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
