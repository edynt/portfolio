import { getLocale, getTranslations } from 'next-intl/server';
import Navbar from '@/components/navbar';
import { BlogCard } from '@/components/blog/blog-card';
import { tutorialsMeta } from '@/data/blog-metadata';

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations('blog');
  const isVi = locale === 'vi';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <div className="glass py-16 px-6 text-center border-b border-white/10">
          <div className="max-w-lg mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 text-primary-400 text-xs font-semibold rounded-full mb-5 border border-primary-500/20">
              🚀 {t('handson')}
            </span>
            <h1 className="text-4xl font-extrabold text-theme-primary mb-3 tracking-tight leading-tight">
              {t('title')}
            </h1>
            <p className="text-theme-secondary text-base leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Tutorial grid */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-theme-muted mb-5">
            {t('allTutorials')}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tutorialsMeta.map((tut) => (
              <BlogCard
                key={tut.id}
                icon={tut.icon}
                iconBg={tut.iconBg}
                category={tut.category}
                categoryColor={tut.categoryColor}
                href={`/blog/${tut.id}`}
                title={isVi ? tut.titleVi : tut.titleEn}
                desc={isVi ? tut.descVi : tut.descEn}
                steps={tut.steps}
                tags={tut.tags}
                stepsLabel={t('steps')}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
