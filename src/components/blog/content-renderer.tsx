import { codeToHtml } from 'shiki';
import { CodeBlock } from './code-block';
import { Callout } from './callout';
import type { ContentBlock } from '@/types/tutorial';

async function renderCode(code: string, lang: string): Promise<string> {
  try {
    return await codeToHtml(code, {
      lang,
      themes: {
        dark: 'one-dark-pro',
        light: 'one-light',
      },
      defaultColor: 'dark',
    });
  } catch {
    return `<pre class="p-4 text-sm font-mono leading-relaxed overflow-x-auto"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  }
}

export async function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  const rendered = await Promise.all(
    blocks.map(async (block) => {
      if (block.type === 'code') {
        const html = await renderCode(block.code, block.lang);
        return { block, html };
      }
      return { block, html: '' };
    })
  );

  return (
    <div>
      {rendered.map(({ block, html }, i) => {
        switch (block.type) {
          case 'text':
            return (
              <div
                key={i}
                className="prose prose-sm prose-invert max-w-none mb-4 text-theme-secondary leading-relaxed [&_strong]:font-semibold [&_strong]:text-theme-primary [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_a]:text-primary-400 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );

          case 'code':
            return (
              <CodeBlock
                key={i}
                lang={block.lang}
                filename={block.filename}
                code={block.code}
                highlightedHtml={html}
              />
            );

          case 'callout':
            return (
              <Callout
                key={i}
                variant={block.variant}
                title={block.title}
                html={block.html}
              />
            );

          case 'table':
            return (
              <div key={i} className="mb-6 overflow-x-auto glass-card rounded-xl">
                {block.caption && (
                  <p className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-theme-muted border-b border-white/10">
                    {block.caption}
                  </p>
                )}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      {block.headers.map((h, j) => (
                        <th key={j} className="px-4 py-3 text-left font-semibold text-theme-primary">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 text-theme-secondary"
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'step-list':
            return (
              <ol key={i} className="mb-4 space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-sm text-theme-secondary">
                    <span className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {j + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ol>
            );

          case 'feature-grid':
            return (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {block.items.map((item, j) => (
                  <div key={j} className="glass-card p-4 rounded-xl">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-theme-primary text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-theme-muted leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            );

          case 'compare':
            return (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/10">
                    <h4 className="font-semibold text-sm text-theme-secondary">{block.left.title}</h4>
                  </div>
                  <div className="p-4">
                    <ContentRenderer blocks={block.left.blocks} />
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-primary-500/20 bg-primary-500/5">
                  <div className="px-4 py-2 border-b border-primary-500/20">
                    <h4 className="font-semibold text-sm text-primary-400">{block.right.title}</h4>
                  </div>
                  <div className="p-4">
                    <ContentRenderer blocks={block.right.blocks} />
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
