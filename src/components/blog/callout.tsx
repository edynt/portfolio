import type { CalloutVariant } from '@/types/tutorial';

const styles: Record<CalloutVariant, { bg: string; border: string; icon: string; titleColor: string; textColor: string }> = {
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'ℹ️', titleColor: 'text-blue-400', textColor: 'text-blue-300/80' },
  warn: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: '⚠️', titleColor: 'text-amber-400', textColor: 'text-amber-300/80' },
  danger: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: '🚨', titleColor: 'text-red-400', textColor: 'text-red-300/80' },
  ok: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: '✅', titleColor: 'text-green-400', textColor: 'text-green-300/80' },
  tip: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: '💡', titleColor: 'text-purple-400', textColor: 'text-purple-300/80' },
};

interface Props {
  variant: CalloutVariant;
  title?: string;
  html: string;
}

export function Callout({ variant, title, html }: Props) {
  const s = styles[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border mb-4 ${s.bg} ${s.border}`}>
      <span className="text-lg shrink-0 mt-0.5">{s.icon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className={`font-semibold text-sm mb-1 ${s.titleColor}`}>{title}</p>}
        <div
          className={`text-sm leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_li]:mt-1 [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_strong]:font-semibold [&_a]:text-primary-400 [&_a]:underline text-theme-secondary`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
