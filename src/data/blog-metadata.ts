import type { TutorialId } from '@/lib/blog-content';

export interface TutorialMeta {
  id: TutorialId;
  icon: string;
  iconBg: string;
  category: string;
  categoryColor: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  steps: number;
  tags: string[];
}

export const tutorialsMeta: TutorialMeta[] = [
  {
    id: 'lambda',
    icon: 'λ',
    iconBg: 'from-violet-500 to-purple-700',
    category: 'JavaScript',
    categoryColor: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
    titleVi: 'Lambda Functions',
    titleEn: 'Lambda Functions',
    descVi: 'Arrow functions, closures, higher-order functions, currying — và hướng dẫn deploy AWS Lambda với TypeScript & Serverless Framework.',
    descEn: 'Arrow functions, closures, higher-order functions, currying — and a full guide to deploying AWS Lambda with TypeScript & Serverless Framework.',
    steps: 16,
    tags: ['JavaScript', 'TypeScript', 'AWS Lambda'],
  },
  {
    id: 'aws-setup',
    icon: '☁',
    iconBg: 'from-orange-400 to-amber-500',
    category: 'DevOps',
    categoryColor: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    titleVi: 'ECR + S3 for Frontend',
    titleEn: 'ECR + S3 for Frontend',
    descVi: 'Deploy backend container lên ECS qua ECR và host frontend tĩnh trên S3 — có CI/CD với GitHub Actions.',
    descEn: 'Deploy backend containers to ECS via ECR and host static frontend on S3 — with GitHub Actions CI/CD.',
    steps: 8,
    tags: ['AWS', 'ECR', 'ECS', 'S3', 'CI/CD'],
  },
  {
    id: 'aws-rds',
    icon: '🗄',
    iconBg: 'from-emerald-500 to-teal-600',
    category: 'DevOps',
    categoryColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    titleVi: 'AWS RDS Free Tier Setup',
    titleEn: 'AWS RDS Free Tier Setup',
    descVi: 'Thiết lập PostgreSQL trên AWS RDS Free Tier cho development — từ tạo instance đến kết nối ứng dụng.',
    descEn: 'Set up PostgreSQL on AWS RDS Free Tier for development — from instance creation to application connection.',
    steps: 7,
    tags: ['AWS', 'RDS', 'PostgreSQL', 'Database', 'Free Tier'],
  },
  {
    id: 'docker',
    icon: '🐳',
    iconBg: 'from-sky-500 to-blue-600',
    category: 'DevOps',
    categoryColor: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    titleVi: 'Docker Basics',
    titleEn: 'Docker Basics',
    descVi: 'Dockerfile, images, containers, multi-stage build và Docker Compose cho môi trường local development.',
    descEn: 'Dockerfile, images, containers, multi-stage builds, and Docker Compose for local development environments.',
    steps: 10,
    tags: ['Docker', 'Dockerfile', 'Compose'],
  },
  {
    id: 'github-actions',
    icon: '⚙',
    iconBg: 'from-gray-500 to-gray-700',
    category: 'CI/CD',
    categoryColor: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
    titleVi: 'GitHub Actions CI/CD',
    titleEn: 'GitHub Actions CI/CD',
    descVi: 'Viết workflows, dùng secrets, chạy tests tự động và deploy lên AWS ECS và S3 qua GitHub Actions.',
    descEn: 'Write workflows, use secrets, run automated tests, and deploy to AWS ECS and S3 via GitHub Actions.',
    steps: 9,
    tags: ['GitHub Actions', 'CI/CD', 'AWS', 'Deploy'],
  },
  {
    id: 'linux-server-setup',
    icon: '🖥',
    iconBg: 'from-slate-500 to-slate-700',
    category: 'DevOps',
    categoryColor: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    titleVi: 'Linux Server Setup',
    titleEn: 'Linux Server Setup',
    descVi: 'Cài đặt Ubuntu server từ đầu: SSH hardening, UFW firewall, Nginx reverse proxy, SSL với Let\'s Encrypt và quản lý process với systemd.',
    descEn: 'Set up an Ubuntu server from scratch: SSH hardening, UFW firewall, Nginx reverse proxy, SSL with Let\'s Encrypt, and systemd process management.',
    steps: 9,
    tags: ['Linux', 'Ubuntu', 'Nginx', 'SSL', 'systemd'],
  },
  {
    id: 'server-troubleshooting',
    icon: '🔧',
    iconBg: 'from-rose-500 to-red-600',
    category: 'DevOps',
    categoryColor: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    titleVi: 'Server Troubleshooting',
    titleEn: 'Server Troubleshooting',
    descVi: 'Chẩn đoán server bị sập: đọc logs, fix ổ cứng đầy, RAM cao, CPU cao, port bị chiếm — và thiết lập giám sát tự động.',
    descEn: 'Diagnose a downed server: read logs, fix full disk, high RAM, high CPU, port conflicts — and set up automated monitoring.',
    steps: 9,
    tags: ['Linux', 'Logs', 'Monitoring', 'Troubleshooting'],
  },
  {
    id: 'server-backup',
    icon: '💾',
    iconBg: 'from-emerald-500 to-teal-600',
    category: 'DevOps',
    categoryColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    titleVi: 'Server Backup & Recovery',
    titleEn: 'Server Backup & Recovery',
    descVi: 'Chiến lược backup 3-2-1, tự động hóa với cron scripts, lưu trên S3, và phục hồi database + server sau thảm họa.',
    descEn: 'The 3-2-1 backup strategy, automated cron scripts, S3 storage, and full database + server disaster recovery procedures.',
    steps: 9,
    tags: ['Backup', 'S3', 'PostgreSQL', 'cron', 'Recovery'],
  },
  {
    id: 'k8s',
    icon: '☸',
    iconBg: 'from-blue-500 to-indigo-600',
    category: 'DevOps',
    categoryColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    titleVi: 'Kubernetes Setup',
    titleEn: 'Kubernetes Setup',
    descVi: 'Cài đặt kubectl & Minikube, hiểu Pods, Deployments, Services — deploy app đầu tiên lên K8s cluster.',
    descEn: 'Install kubectl & Minikube, understand Pods, Deployments, Services — deploy your first app to a K8s cluster.',
    steps: 12,
    tags: ['Kubernetes', 'kubectl', 'Minikube', 'Pods', 'Deployments'],
  },
];
