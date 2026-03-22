'use client';

import type { Chapter } from '@/types/tutorial';

interface Props {
  chapters: Chapter[];
  activeSection: string;
}

export function TutorialSidebar({ chapters, activeSection }: Props) {
  return (
    <aside className="w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-white/10 py-4 hidden lg:block">
      <nav className="px-3">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="mb-4">
            <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-theme-muted mb-1">
              {chapter.title}
            </p>
            {chapter.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md mb-0.5 transition-colors border-l-2 ${
                  activeSection === section.id
                    ? 'bg-primary-500/10 text-primary-400 font-medium border-primary-500'
                    : 'text-theme-secondary hover:bg-white/5 hover:text-theme-primary border-transparent'
                }`}
              >
                {section.icon && <span className="text-base">{section.icon}</span>}
                <span className="truncate">{section.title}</span>
              </a>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
