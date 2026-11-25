import { accentColors } from '../data/themes.js';

export const STORAGE_KEY = 'learning-hub.workspace.v1';
export const STATUSES = {
  next: 'To do', workingOn: 'In progress', retry: 'Revisit', done: 'Solved',
};
export const DEFAULT_PREFERENCES = {
  theme: 'dark', accent: 'mint', density: 'comfortable', motion: 'system', name: '',
};

export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function problemSlug(input) {
  const value = input.trim();
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol) || !['leetcode.com', 'www.leetcode.com'].includes(url.hostname)) return null;
    return url.pathname.match(/^\/problems\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\/|$)/)?.[1] || null;
  } catch { return null; }
}

export function normalizeProblem(item) {
  if (!item || typeof item !== 'object') return null;
  const title = String(item.title || item.problem || '').trim().slice(0, 160);
  const slug = problemSlug(String(item.slug || item.link || ''));
  if (!title || !slug) return null;
  return {
    id: slug, slug, title, topic: typeof item.topic === 'string' ? item.topic.slice(0, 100) : '',
    number: String(item.number || item.leetCodeNumber || '').replace(/[^0-9]/g, '').slice(0, 8),
    difficulty: ['easy', 'medium', 'hard'].includes(String(item.difficulty).toLowerCase()) ? String(item.difficulty).toLowerCase() : 'medium',
    status: Object.hasOwn(STATUSES, item.status || item.progress) ? (item.status || item.progress) : 'next',
    note: String(item.note || '').slice(0, 4000),
  };
}

export function createWorkspace(practice = []) {
  return {
    version: 1, completed: [], bookmarks: [], practice,
    preferences: { ...DEFAULT_PREFERENCES }, activities: [], lastTopic: 'array', focusMinutes: 0,
  };
}

export function normalizeWorkspace(input) {
  if (!input || typeof input !== 'object' || input.version !== 1 || !Array.isArray(input.practice) || !Array.isArray(input.completed) || !Array.isArray(input.bookmarks)) {
    throw new Error('Choose a Learning Hub backup exported from Settings. Your current progress has not changed.');
  }
  const result = createWorkspace();
  const ids = new Set();
  result.practice = input.practice.slice(0, 5000).map(normalizeProblem).filter(item => {
    if (!item || ids.has(item.id)) return false;
    ids.add(item.id); return true;
  });
  for (const field of ['completed', 'bookmarks']) result[field] = [...new Set(input[field].filter(x => typeof x === 'string' && /^[a-z0-9-]{1,100}$/.test(x)))];
  const preferences = input.preferences || {};
  for (const [key, values] of Object.entries({ theme: ['dark', 'light', 'system'], accent: accentColors, density: ['comfortable', 'compact'], motion: ['system', 'reduced'] })) {
    if (values.includes(preferences[key])) result.preferences[key] = preferences[key];
  }
  result.preferences.name = typeof preferences.name === 'string' ? preferences.name.slice(0, 80) : '';
  result.lastTopic = typeof input.lastTopic === 'string' && /^[a-z0-9-]{1,100}$/.test(input.lastTopic) ? input.lastTopic : 'array';
  result.focusMinutes = Number.isFinite(input.focusMinutes) ? Math.max(0, Math.min(1000000, input.focusMinutes)) : 0;
  result.activities = Array.isArray(input.activities) ? input.activities.filter(x => x && /^\d{4}-\d{2}-\d{2}$/.test(x.date) && typeof x.type === 'string' && typeof x.target === 'string').slice(-2000).map(x => ({ date: x.date, type: x.type.slice(0, 40), target: x.target.slice(0, 160) })) : [];
  return result;
}

export function loadWorkspace(storage, starterProblems) {
  const backup = storage.getItem(STORAGE_KEY);
  if (backup) return normalizeWorkspace(JSON.parse(backup));
  const legacy = storage.getItem('data');
  if (legacy) {
    const old = JSON.parse(legacy);
    if (Array.isArray(old)) return normalizeWorkspace({ ...createWorkspace(), practice: old });
  }
  return createWorkspace(starterProblems.map(normalizeProblem).filter(Boolean));
}

export function recordActivity(workspace, type, target) {
  const date = localDate();
  if (workspace.activities.some(x => x.date === date && x.type === type && x.target === target)) return workspace.activities;
  return [...workspace.activities, { date, type, target }].slice(-2000);
}

export function activityStreak(activities, now = new Date()) {
  const dates = new Set(activities.map(x => x.date));
  const cursor = new Date(now);
  if (!dates.has(localDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dates.has(localDate(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

export function sortProblems(items, key = 'status', direction = 'asc') {
  const rank = { workingOn: 0, next: 1, retry: 2, done: 3, easy: 0, medium: 1, hard: 2 };
  return [...items].sort((a, b) => {
    let result;
    if (key === 'status' || key === 'difficulty') result = rank[a[key]] - rank[b[key]];
    else if (key === 'number') result = Number(a.number || Infinity) - Number(b.number || Infinity);
    else result = String(a[key] || '').localeCompare(String(b[key] || ''));
    return (result || a.title.localeCompare(b.title)) * (direction === 'desc' ? -1 : 1);
  });
}
