import { useTeachers } from '../../TeacherContext';
import { Plus, Trash2, Calendar, Image as ImageIcon, FileText, Send } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const BlogManagement = () => {
  const { blogPosts, addBlogPost, deleteBlogPost } = useTeachers();
  const [isAdding, setIsAdding] = React.useState(false);
  const [newPost, setNewPost] = React.useState({
    title: '',
    excerpt: '',
    content: '',
    image: 'https://picsum.photos/seed/newblog/800/400'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    addBlogPost(post);
    setIsAdding(false);
    setNewPost({ title: '', excerpt: '', content: '', image: 'https://picsum.photos/seed/newblog/800/400' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Yangiliklar boshqaruvi</h1>
          <p className="text-slate-500">Blog postlarini tahrirlash va qo'shish</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Yangi yangilik
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Sarlavha</label>
                  <input 
                    required
                    type="text" 
                    value={newPost.title}
                    onChange={e => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Yangilik sarlavhasi"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Rasm URL</label>
                  <input 
                    required
                    type="text" 
                    value={newPost.image}
                    onChange={e => setNewPost({...newPost, image: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Qisqacha mazmun (Excerpt)</label>
                <input 
                  required
                  type="text" 
                  value={newPost.excerpt}
                  onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                  placeholder="Ro'yxatda ko'rinadigan qisqa matn"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">To'liq matn</label>
                <textarea 
                  required
                  rows={6}
                  value={newPost.content}
                  onChange={e => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Yangilikning to'liq mazmuni..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  Saqlash <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-start">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
              <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-lg">{post.title}</h3>
                <button 
                  onClick={() => deleteBlogPost(post.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
              </div>
              <p className="text-slate-600 line-clamp-2 text-sm">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
