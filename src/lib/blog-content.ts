import type { Tutorial } from '@/types/tutorial';

export type TutorialId =
  | 'lambda'
  | 'aws-setup'
  | 'aws-rds'
  | 'docker'
  | 'github-actions'
  | 'linux-server-setup'
  | 'server-troubleshooting'
  | 'server-backup'
  | 'k8s'
  | 'devops-edge-cases'
  | 'git-advanced';

export const tutorialIds: TutorialId[] = [
  'lambda',
  'aws-setup',
  'aws-rds',
  'docker',
  'github-actions',
  'linux-server-setup',
  'server-troubleshooting',
  'server-backup',
  'k8s',
  'devops-edge-cases',
  'git-advanced',
];

export async function getTutorial(id: TutorialId, locale: 'vi' | 'en'): Promise<Tutorial> {
  const mod = await import(`@/data/blog/${id}/${locale}`);
  return mod.default as Tutorial;
}

export async function getAllTutorials(locale: 'vi' | 'en'): Promise<Tutorial[]> {
  return Promise.all(tutorialIds.map((id) => getTutorial(id, locale)));
}
