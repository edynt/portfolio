export type CalloutVariant = 'info' | 'warn' | 'danger' | 'ok' | 'tip';

export interface TextBlock {
  type: 'text';
  html: string;
}

export interface CodeBlock {
  type: 'code';
  lang: string;
  filename?: string;
  code: string;
}

export interface CalloutBlock {
  type: 'callout';
  variant: CalloutVariant;
  title?: string;
  html: string;
}

export interface TableBlock {
  type: 'table';
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface StepListBlock {
  type: 'step-list';
  items: string[];
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridBlock {
  type: 'feature-grid';
  items: FeatureCard[];
}

export interface CompareBlock {
  type: 'compare';
  left: { title: string; blocks: ContentBlock[] };
  right: { title: string; blocks: ContentBlock[] };
}

export type ContentBlock =
  | TextBlock
  | CodeBlock
  | CalloutBlock
  | TableBlock
  | StepListBlock
  | FeatureGridBlock
  | CompareBlock;

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  blocks: ContentBlock[];
}

export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  chapters: Chapter[];
}
