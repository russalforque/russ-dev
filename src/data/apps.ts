export interface AppPlan {
  name: string;
  price: string;
  note: string;
}

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  platform: string;
  version: string;
  size: string;
  requirements: string;
  /** Direct download for the installer (hosted on GitHub Releases) */
  downloadUrl: string;
  /** Official app website */
  websiteUrl?: string;
  installGuideUrl?: string;
  sourceUrl?: string;
  features: string[];
  /** Optional pricing; omit to hide the pricing block */
  plans?: AppPlan[];
  stack: string[];
}

export const apps: AppItem[] = [
  {
    id: 'studex',
    name: 'Studex',
    tagline: 'A calm, offline-first companion for students',
    description:
      'Classes, tasks, exams, allowance, expenses and savings in one app. Everything is stored on your phone, with no account and no internet needed.',
    icon: '/assets/apps/studex.png',
    platform: 'Android',
    version: '0.3.0',
    size: '18 MB',
    requirements: 'Android 7.0+',
    downloadUrl: 'https://github.com/russalforque/studex-releases/releases/download/v0.3.0/studex-0.3.0.apk',
    websiteUrl: 'https://studex.russalforque.workers.dev',
    installGuideUrl: 'https://studex.russalforque.workers.dev/install.html',
    sourceUrl: 'https://github.com/russalforque/studex',
    features: [
      'Class schedule, subjects, tasks and exams',
      'Allowance, expenses, budget and savings goals',
      'Study files: import, camera scanner and offline viewer',
      'Reminders, search and a weekly summary',
      'Backup, restore and CSV export',
      'Offline-first: your data stays on your device',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Capacitor', 'SQLite'],
  },
];
