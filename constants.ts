
import { Page } from './types';

export const NAV_ITEMS: { name: Page; path: string }[] = [
  { name: Page.Home, path: '/' },
  { name: Page.VoiceAssistant, path: '/voice' },
  { name: Page.Model, path: '/model' },
  { name: Page.Subscription, path: '/subscription' },
  { name: Page.About, path: '/about' },
];

export const SUPPORTED_LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'HTML',
  'CSS',
  'SQL',
  'Node.js',
  'React.js',
  'Kafka',
  'R',
  'Shell',
];
