import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/navbar';
import { TutorialSidebarWrapper } from '@/components/blog/tutorial-sidebar-wrapper';
import { ContentRenderer } from '@/components/blog/content-renderer';
import { getTutorial, tutorialIds, type TutorialId } from '@/lib/blog-content';

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations('blog');

  if (!tutorialIds.includes(slug as TutorialId)) {
    notFound();
  }

  const tutorial = await getTutorial(slug as TutorialId, locale as 'vi' | 'en');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-24">
        <TutorialSidebarWrapper chapters={tutorial.chapters} />
        <main className="flex-1 min-w-0 max-w-3xl mx-auto px-6 py-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-sm mb-8" aria-label="Breadcrumb">
            <Link
              href="/blog"
              className="flex items-center gap-1 text-theme-muted hover:text-primary-400 transition-colors group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
              </svg>
              <span className="group-hover:underline underline-offset-2">{t('backToBlog')}</span>
            </Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-muted shrink-0">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            <span className="text-theme-primary font-medium truncate">{tutorial.title}</span>
          </nav>

          {/* Tutorial Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{tutorial.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-theme-primary">{tutorial.title}</h1>
                <p className="text-theme-muted text-sm mt-0.5">{tutorial.description}</p>
              </div>
            </div>
          </div>

          {/* Chapters */}
          {tutorial.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-12">
              <div className="flex items-center gap-3 px-5 py-4 bg-primary-500/10 border border-primary-500/20 rounded-xl mb-8">
                <h2 className="font-bold text-primary-400">{chapter.title}</h2>
              </div>
              {chapter.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-16 scroll-mt-20">
                  {/* Section Header */}
                  <div className="flex items-start gap-4 mb-6 pb-4 border-b border-white/10">
                    {section.icon && (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5 ${section.iconColor || 'bg-primary-500/20'}`}>
                        {section.icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-theme-primary tracking-tight">{section.title}</h2>
                      {section.subtitle && (
                        <p className="text-sm text-theme-muted mt-1">{section.subtitle}</p>
                      )}
                    </div>
                  </div>
                  {/* Section Content */}
                  <ContentRenderer blocks={section.blocks} />
                </section>
              ))}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
