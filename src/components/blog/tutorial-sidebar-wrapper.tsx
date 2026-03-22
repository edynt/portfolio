'use client';

import { useState, useEffect } from 'react';
import { TutorialSidebar } from './tutorial-sidebar';
import type { Chapter } from '@/types/tutorial';

export function TutorialSidebarWrapper({ chapters }: { chapters: Chapter[] }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = chapters.flatMap((ch) => ch.sections.map((s) => s.id));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-10% 0px -80% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [chapters]);

  return <TutorialSidebar chapters={chapters} activeSection={activeSection} />;
}
