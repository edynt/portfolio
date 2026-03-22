'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';

interface BlogCardProps {
  icon: string;
  iconBg: string;
  category: string;
  categoryColor: string;
  href: string;
  title: string;
  desc: string;
  steps: number;
  tags: string[];
  stepsLabel: string;
}

export function BlogCard({ icon, iconBg, category, categoryColor, href, title, desc, steps, tags, stepsLabel }: BlogCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(href as Parameters<typeof router.push>[0]);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="group flex flex-col glass-card rounded-2xl p-5 hover:border-primary-500/30 transition-all duration-200 text-left w-full relative overflow-hidden cursor-pointer"
    >
      {loading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
          <div className="flex items-center gap-2 text-primary-400">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Card header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${iconBg} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-sm`}>
          {icon}
        </div>
        <div className="min-w-0">
          <span className={`inline-flex text-xs font-semibold px-1.5 py-0.5 rounded-full mb-1 ${categoryColor}`}>
            {category}
          </span>
          <h3 className="font-bold text-theme-primary text-base leading-tight group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-theme-muted leading-relaxed flex-1 mb-3">{desc}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-white/10 gap-2">
        <div className="flex flex-wrap gap-1 min-w-0">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-1.5 py-0.5 bg-white/5 text-theme-muted rounded font-medium whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm text-theme-muted font-medium shrink-0 group-hover:text-primary-400 transition-colors">
          {steps} {stepsLabel} →
        </span>
      </div>
    </button>
  );
}
