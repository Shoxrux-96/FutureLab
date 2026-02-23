import { useParams, Link } from 'react-router-dom';
import { useTeachers } from '../TeacherContext';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogDetail = () => {
  const { id } = useParams();
  const { blogPosts } = useTeachers();
  const post = blogPosts.find(p => p.id === id && p.status === 'published');

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
        <h1 className="text-4xl font-bold text-slate-900">Maqola topilmadi yoki hali chop etilmagan</h1>
        <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-600 font-bold">
          <ArrowLeft className="w-5 h-5" /> Blogga qaytish
        </Link>
      </div>
    );
  }

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = post.videoUrl ? getYoutubeId(post.videoUrl) : null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-16 space-y-12"
    >
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
        <ArrowLeft className="w-5 h-5" /> Orqaga
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span>•</span>
            <span>5 daqiqa o'qish</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>
        </div>

        {videoId ? (
          <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">
              {post.excerpt}
            </p>
            <div 
              className="text-slate-700 leading-relaxed space-y-6 blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-900">Ulashish</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
