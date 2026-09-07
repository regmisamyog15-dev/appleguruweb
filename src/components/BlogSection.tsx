import React, { useState } from 'react';
import { blogPosts } from '../data/blogPosts';
import { BlogPost } from '../types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface BlogSectionProps {
  onSelectArticle: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Buying Guides', 'Exchange', 'Repair', 'Technology'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch = cleanSearch === '' || 
      post.title.toLowerCase().includes(cleanSearch) ||
      post.excerpt.toLowerCase().includes(cleanSearch) ||
      post.tags.some(t => t.toLowerCase().includes(cleanSearch));
    return matchesCat && matchesSearch;
  });

  const featuredPost = blogPosts[0]; // Crown guide
  const secondaryPosts = filteredPosts.filter(p => p.id !== featuredPost.id);

  return (
    <section id="insights-blog-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">JOURNAL</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="artistic-tag mb-4 justify-center">
            <div className="line" />
            <span>Technology Knowledge Base</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            APPLE GURU <br />
            <span className="font-serif-artistic italic font-light text-[#D4AF37]">INSIGHTS.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light mt-4 leading-relaxed max-w-2xl mx-auto">
            Genuinely useful guides on flagship smartphones, genuine repair science, and trade-in economics—tailored for tech users in Chitwan and across Nepal.
          </p>
        </div>

        {/* Filter Bar & In-Hub Search */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`blog-category-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase font-mono tracking-wider transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides & repair tips..."
              className="w-full bg-[#0d0d11] border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
        </div>

        {/* --- Featured Article: Large Editorial Image & Big Headline --- */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div
            id="featured-blog-card"
            onClick={() => onSelectArticle(featuredPost)}
            className="glass-surface rounded-2xl overflow-hidden border border-white/10 p-6 sm:p-12 mb-16 relative grid lg:grid-cols-12 gap-8 items-center cursor-pointer group shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-500"
          >
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-zinc-400 mb-4">
                  <span className="text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                    Featured Insight
                  </span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  By {featuredPost.author}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
            </div>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === 'All' && !searchQuery ? secondaryPosts : filteredPosts).map((post) => (
            <div
              key={post.id}
              id={`blog-card-${post.id}`}
              onClick={() => onSelectArticle(post)}
              className="glass-surface rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group p-6"
            >
              <div>
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-zinc-950 mb-5 relative border border-white/5">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 bg-black/80 text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/30">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2 font-mono">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {post.title}
                </h4>

                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider text-[11px]">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
