'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const langColors: Record<string, string> = {
  javascript: 'text-green-400',
  typescript: 'text-blue-400',
  bash: 'text-gray-400',
  json: 'text-purple-400',
  yaml: 'text-orange-400',
};

interface Props {
  lang: string;
  filename?: string;
  code: string;
  highlightedHtml?: string;
}

export function CodeBlock({ lang, filename, code, highlightedHtml }: Props) {
  const t = useTranslations('blog');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelColor = langColors[lang.toLowerCase()] || 'text-gray-400';

  return (
    <div className="glass-card rounded-xl overflow-hidden mb-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
        <span className={`text-xs font-bold uppercase tracking-wider ${labelColor}`}>
          {lang}
        </span>
        {filename && <span className="text-xs text-theme-muted font-mono">{filename}</span>}
        <button
          onClick={copy}
          className={`ml-auto text-xs px-2.5 py-1 rounded border transition-colors ${
            copied
              ? 'text-green-400 border-green-500/30 bg-green-500/10'
              : 'text-theme-secondary border-white/10 hover:border-white/20 hover:text-theme-primary'
          }`}
        >
          {copied ? t('copied') : t('copyCode')}
        </button>
      </div>
      {highlightedHtml ? (
        <div
          className="text-sm overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="p-4 text-sm overflow-x-auto font-mono leading-relaxed text-theme-secondary">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
