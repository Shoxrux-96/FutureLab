import { useTeachers } from '../../TeacherContext';
import { Plus, Trash2, Calendar, Image as ImageIcon, FileText, Send, X, Upload, Youtube, Edit3, Eye, EyeOff, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BlogPost } from '../../types';
import { cn } from '../../lib/utils';

export const BlogManagement = () => {
  const { blogPosts, addBlogPost, deleteBlogPost, updateBlogPost } = useTeachers();
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 10;

  const [formData, setFormData] = React.useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    videoUrl: '',
    status: 'draft' as 'published' | 'draft'
  });

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '', image: '', videoUrl: '', status: 'draft' });
    setIsAdding(false);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      videoUrl: post.videoUrl || '',
      status: post.status
    });
    setIsAdding(true);
  };

  const handleSubmit = (status: 'published' | 'draft') => {
    const postData = {
      ...formData,
      status,
      id: editingPost ? editingPost.id : Date.now().toString(),
      date: editingPost ? editingPost.date : new Date().toISOString().split('T')[0],
      image: formData.image || 'https://picsum.photos/seed/blog/800/400'
    };

    if (editingPost) {
      updateBlogPost(postData as BlogPost);
    } else {
      addBlogPost(postData as BlogPost);
    }
    resetForm();
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Yangiliklar boshqaruvi</h1>
          <p className="text-slate-500">Blog postlarini tahrirlash, saqlash va publish qilish</p>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-4xl rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]"
            >
              <div className="p-4 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  {editingPost ? 'Yangilikni tahrirlash' : 'Yangi yangilik qo\'shish'}
                </h2>
                <button 
                  onClick={resetForm}
                  className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4 md:p-8 space-y-6 overflow-y-auto flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Sarlavha</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="Yangilik sarlavhasi"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Rasm yuklash</label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 transition-all group">
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                        <span className="text-sm text-slate-500 group-hover:text-indigo-500 text-center">Rasm tanlang</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">YouTube Video Link (ixtiyoriy)</label>
                    <div className="relative">
                      <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                      <input 
                        type="text" 
                        value={formData.videoUrl}
                        onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {formData.image && (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                    <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, image: ''})}
                      className="absolute top-2 right-2 p-1 bg-white/80 rounded-lg text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Qisqacha mazmun</label>
                  <input 
                    required
                    type="text" 
                    value={formData.excerpt}
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Ro'yxatda ko'rinadigan qisqa matn"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">To'liq matn (Interaktiv tahrirlash)</label>
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                    <ReactQuill 
                      theme="snow" 
                      value={formData.content} 
                      onChange={content => setFormData({...formData, content})}
                      modules={quillModules}
                      className="h-64 mb-12"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => handleSubmit('published')}
                  className="flex-1 bg-indigo-600 text-white py-3 md:py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Publish qilish
                </button>
                <button 
                  onClick={() => handleSubmit('draft')}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 md:py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> Saqlash (Draft)
                </button>
                <button 
                  onClick={resetForm}
                  className="px-8 bg-slate-200 text-slate-600 py-3 md:py-4 rounded-2xl font-bold hover:bg-slate-300 transition-all"
                >
                  Bekor qilish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid gap-6">
        {paginatedPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-start group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 relative">
              <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              {post.videoUrl && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Youtube className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              )}
              <div className={cn(
                "absolute top-2 left-2 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                post.status === 'published' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
              )}>
                {post.status === 'published' ? 'Published' : 'Draft'}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                    {post.videoUrl && <span className="flex items-center gap-1 text-red-500 font-medium"><Youtube className="w-4 h-4" /> Video</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="Tahrirlash"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      const newStatus = post.status === 'published' ? 'draft' : 'published';
                      updateBlogPost({ ...post, status: newStatus });
                    }}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      post.status === 'published' ? "text-amber-500 hover:bg-amber-50" : "text-emerald-500 hover:bg-emerald-50"
                    )}
                    title={post.status === 'published' ? "Unpublish qilish" : "Publish qilish"}
                  >
                    {post.status === 'published' ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
                        deleteBlogPost(post.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="O'chirish"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-slate-600 line-clamp-2 text-sm">{post.excerpt}</p>
            </div>
          </div>
        ))}
        {blogPosts.length === 0 && (
          <div className="py-20 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
            Hozircha yangiliklar yo'q. Yangi yangilik qo'shing.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">
            Jami <span className="font-bold text-slate-900">{blogPosts.length}</span> tadan 
            <span className="font-bold text-slate-900"> {startIndex + 1}-{Math.min(startIndex + postsPerPage, blogPosts.length)}</span> ko'rsatilmoqda
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Oldingi
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                    currentPage === i + 1 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm"
            >
              Keyingi <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
