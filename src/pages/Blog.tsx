import { motion } from 'motion/react';
import { useTeachers } from '../TeacherContext';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export const Blog = () => {
  const { blogPosts } = useTeachers();
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 12;

  // Filter published posts
  const publishedPosts = blogPosts.filter(p => p.status === 'published');

  // Sort by date (newest first)
  const sortedPosts = [...publishedPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Blog va Yangiliklar</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Sohadagi so'nggi yangiliklar, foydali maqolalar va o'quv markazimiz hayotidan lavhalar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post, i) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 3) * 0.1 }}
            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all flex flex-col"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 line-clamp-2 flex-1">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.id}`}
                className="flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:gap-3 transition-all pt-4"
              >
                Batafsil o'qish <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-12">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === num 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
