import React from 'react';
import { logoPath } from '../lib/logo-trace';
import { LogoOutlineLoader } from './LogoOutlineLoader';

const paths = {
  book: 'M4 4.5C7 3.5 9.5 4 12 6c2.5-2 5-2.5 8-1.5v14c-3-1-5.5-.5-8 1.5-2.5-2-5-2.5-8-1.5z M12 6v14',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20',
  chart: 'M4 4v16h17M8 15l4-5 4 2 5-8',
  bookmark: 'M6 4h12v17l-6-4-6 4z',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8m-2-5h4l.7 3 2.3 1.3 2.9-.9 2 3.4-2.2 2.1v2.2l2.2 2.1-2 3.4-2.9-.9-2.3 1.3-.7 3h-4l-.7-3L7 18.7l-2.9.9-2-3.4 2.2-2.1v-2.2L2.1 9.8l2-3.4 2.9.9 2.3-1.3z',
  help: 'M9.1 8.5a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  search: 'M21 21l-5-5m2-6a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  back: 'M20 12H4m6-6-6 6 6 6',
  chevron: 'm9 5 7 7-7 7',
  down: 'm6 9 6 6 6-6',
  close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  clock: 'M12 7v5l3 2m7-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  play: 'm8 5 11 7-11 7z',
  pause: 'M8 5v14M16 5v14',
  reset: 'M3 10a9 9 0 1 1 2 8M3 4v6h6',
  external: 'M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5',
  grid: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z',
  list: 'M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01',
  sparkle: 'm12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7z',
  flame: 'M14 3c1 5-4 5-2 9 2-1 3-3 3-3 7 6 4 12-3 12S2 14 6 9c0 3 1 4 2 4-2-5 4-6 6-10z',
  target: 'M12 4a8 8 0 1 0 8 8m-8-4a4 4 0 1 0 4 4m-4 0 9-9m-5 0h5v5',
  sun: 'M12 3V1m0 22v-2M3 12H1m22 0h-2M5 5 3.5 3.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  moon: 'M21 13a9 9 0 0 1-10-10A9 9 0 1 0 21 13',
  monitor: 'M3 3h18v13H3zm5 18h8m-4-5v5',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  upload: 'M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  copy: 'M8 8h13v13H8zM16 8V3H3v13h5',
  folder: 'M3 5h7l2 3h9v12H3z',
  note: 'M4 3h16v13l-5 5H4zm11 18v-5h5M8 8h8M8 12h5',
  sort: 'M8 3v18m-4-4 4 4 4-4M16 3h5m-5 5h4m-4 5h3',
  github: 'M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .2-2-1-3 4-.4 7-2 7-6 0-1.4-.5-2.7-1.5-3.7.2-1 .1-2-.5-3.3-2-.2-3 1-4 1.5a13 13 0 0 0-6 0C8 3 7 1.8 5 2c-.6 1.3-.7 2.3-.5 3.3C3.5 6.3 3 7.6 3 9c0 4 3 5.6 7 6-1 1-1 2-1 3v4',
  music: 'M9 18V5l12-2v13M9 8l12-2M9 18a3 3 0 1 1-3-3c2 0 3 1 3 3m12-2a3 3 0 1 1-3-3c2 0 3 1 3 3',
};

export function Icon({ name, size = 20, className = '', ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}><path d={paths[name] || paths.book} /></svg>;
}

export function Logo({ loading = false, size = 34 }) {
  if (loading) return <LogoOutlineLoader size={size}/>;
  return <svg className="brand-mark" width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true"><rect width="36" height="36" rx="10" fill="currentColor" className="logo-ground"/><path d={logoPath} className="logo-fill"/></svg>;
}
