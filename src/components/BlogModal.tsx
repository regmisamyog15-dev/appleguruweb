import React from 'react';
import { BlogPost } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  MessageCircle, 
  Sparkles,
  ArrowLeft,
  Tag
} from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  post,
  onClose,
  onOpenWhatsApp,
}) => {
  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div
      id="blog-modal-overlay"
      className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="blog-modal-container"
        className="w-full max-w-4xl bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-auto text-left relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Back & Share */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md sticky top-0 z-30 font-mono">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share article"
              className="p-2 rounded-sm bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-[#D4AF37] border border-white/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10">
          
          {/* Article Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-4 font-mono">
            <span className="text-[9px] uppercase font-bold tracking-widest px-3 py-1 bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{post.author}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Featured Cover Image */}
          <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-8 border border-white/10 bg-zinc-950">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaway Box */}
          <div className="glass-surface p-5 sm:p-6 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-8">
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[#D4AF37] mb-1.5 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Key Editorial Takeaway</span>
            </div>
            <p className="text-sm text-zinc-200 font-medium leading-relaxed">
              {post.keyTakeaway}
            </p>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            {post.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono">
            <span className="text-xs text-zinc-500 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Topics:</span>
            </span>
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>

          {/* Discussion / WhatsApp CTA */}
          <div className="mt-8 p-6 rounded-xl glass-surface border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">Have questions about this article?</h4>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">Consult with our team at Apple Guru showroom, Indra Dev Marga.</p>
            </div>
            <button
              onClick={() => onOpenWhatsApp(`Hello Apple Guru! I just read your article "${post.title}" and would like to ask a question.`)}
              className="btn-artistic btn-artistic-accent text-xs py-2.5 px-4 rounded-none sm:rounded-sm shrink-0 flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
