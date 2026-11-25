import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { StartupSplash } from './components/StartupSplash';
import { Icon, Logo } from './components/Icon';
import { Modal } from './components/Modal';
import { FocusTimer } from './components/FocusTimer';
import { LearnPage } from './pages/LearnPage';
import { LessonPage } from './pages/LessonPage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { LogoOutlineLoader } from './components/LogoOutlineLoader';
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({default: module.SettingsPage})));
import { useWorkspace } from './hooks/useWorkspace';
import { topics } from './data/topics';
import { activityStreak, recordActivity } from './lib/workspace';
import './App.css';

const navigation=[['learn','Learning','book'],['practice','Practice','code'],['progress','My progress','chart'],['saved','Saved topics','bookmark']];
const questions=[
  ['Where is my progress saved?', 'Your topics, problems, notes, bookmarks, and preferences stay in this browser’s local storage. Export a backup from Settings before clearing browser data or moving to another device. There are no accounts or background uploads.'],
  ['How do I track a practice problem?', 'Select Add problem in Practice. Browse the built-in catalog or paste any LeetCode problem URL. Update its status and leave notes as you work. Starter problems begin as “To do”; no completed progress is assumed.'],
  ['Does this connect to my LeetCode account?', 'No. Problem links open on LeetCode, where you can solve and submit them. Update the status here when you finish. The tracker works without a server or account connection.'],
  ['What is demo mode?', 'Try demo in Practice opens a separate sample collection. Explore statuses and notes without touching your own practice list. Demo changes last only for this visit.'],
  ['Can I change the appearance?', 'Open Appearance in the left sidebar. Choose a theme, accent color, content density, and motion preference. Changes save automatically.'],
  ['How do I find a topic again?', 'Bookmark a topic from its card or lesson. It will appear under Saved topics. Press Command/Ctrl K or use the search button to jump to a concept.'],
];
function getRoute(){return window.location.hash.slice(1)||(/\/practice\/?$/.test(window.location.pathname)?'/practice':'/learn');}

export default function App(){
  const [splashVisible,setSplashVisible]=useState(true);
  const dismissSplash=useCallback(()=>setSplashVisible(false),[]);
  const [route,setRoute]=useState(getRoute),[toast,setToast]=useState(null),[searchOpen,setSearchOpen]=useState(false),[query,setQuery]=useState(''),[helpOpen,setHelpOpen]=useState(false),[instant,setInstant]=useState(false);
  const notify=useCallback((message,action)=>setToast({message,action,id:Date.now()}),[]);
  const hub=useWorkspace(notify);
  const {workspace,completedCount,setWorkspace}=hub;
  const [path,queryString='']=route.split('?');
  const section=path.split('/')[1]||'learn',lessonId=path.split('/')[2];
  const title=({learn:lessonId?'Learning / Lesson':'Learning',practice:'Practice',progress:'My progress',saved:'Saved topics',settings:'Appearance'})[section]||'Workspace';
  useEffect(()=>{const changed=()=>{setRoute(getRoute());window.scrollTo({top:0,behavior:'instant'});};window.addEventListener('hashchange',changed);return()=>window.removeEventListener('hashchange',changed);},[]);
  useEffect(()=>{document.title=`${title} · Learning Hub`;},[title]);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-color-scheme: dark)'),motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply=()=>{const pref=workspace.preferences;document.documentElement.dataset.theme=pref.theme==='system'?(media.matches?'dark':'light'):pref.theme;document.documentElement.dataset.accent=pref.accent;document.documentElement.dataset.density=pref.density;document.documentElement.dataset.motion=pref.motion==='reduced'||motion.matches?'reduced':'full';};
    apply();media.addEventListener('change',apply);motion.addEventListener('change',apply);return()=>{media.removeEventListener('change',apply);motion.removeEventListener('change',apply);};
  },[workspace.preferences]);
  useEffect(()=>{
    const keyboard=event=>{if(splashVisible)return;const editable=event.target instanceof HTMLElement&&(event.target.matches('input,textarea,select')||event.target.isContentEditable);
      if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();setInstant(true);setSearchOpen(previous=>!previous);setQuery('');}
      else if(!editable&&event.key==='/'){event.preventDefault();setInstant(true);setSearchOpen(true);setQuery('');}
      else if(!editable&&event.key==='?')setHelpOpen(true);
    };window.addEventListener('keydown',keyboard);return()=>window.removeEventListener('keydown',keyboard);
  },[splashVisible]);
  useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(null),6500);return()=>clearTimeout(timer);},[toast]);
  const onFocusComplete=useCallback(minutes=>{setWorkspace(previous=>({...previous,focusMinutes:previous.focusMinutes+minutes,activities:recordActivity(previous,'focus',`${Date.now()}`)}));notify(`${minutes} minutes of focus. A little more progress.`);},[setWorkspace,notify]);
  const matchingTopics=topics.filter(topic=>`${topic.title} ${topic.description} ${topic.category}`.toLowerCase().includes(query.toLowerCase())).slice(0,7);
  const matchingPages=navigation.filter(([,label])=>!query||label.toLowerCase().includes(query.toLowerCase()));
  const profileName=workspace.preferences.name.trim();
  const initials=profileName?Array.from(profileName)[0].toUpperCase():'Y';
  const streak=activityStreak(workspace.activities);
  return <>{splashVisible&&<StartupSplash onComplete={dismissSplash} motionPreference={workspace.preferences.motion}/>}<div className="app-shell" inert={splashVisible}>
    <a href="#main-content" className="skip-link" onClick={e=>{e.preventDefault();document.getElementById('main-content').focus();}}>Skip to content</a>
    <aside className="sidebar">
      <a href="#/learn" className="brand" aria-label="Learning Hub home"><Logo/><span>Learning<span className="brand-hub">Hub</span><span className="brand-period">.</span></span></a>
      <div className="sidebar-content"><div className="sidebar-label">Your workspace</div>
        <nav aria-label="Main navigation">{navigation.map(([id,label,icon])=><a key={id} href={`#/${id}`} className={`nav-item ${section===id?'selected':''}`} aria-current={section===id?'page':undefined} aria-label={label} title={label}><Icon name={icon} size={19}/><span>{label}</span>{id==='saved'&&workspace.bookmarks.length>0&&<small>{workspace.bookmarks.filter(id=>topics.some(x=>x.id===id)).length}</small>}{section===id&&<span className="nav-active-dot"/>}</a>)}</nav>
        <div className="sidebar-progress"><div><span>Your foundation</span><strong>{completedCount}<span>/{topics.length}</span></strong></div><div className="progress-track"><span style={{transform:`scaleX(${completedCount/topics.length})`}}/></div><p>{completedCount===0?'Great things start small.':completedCount===topics.length?'A foundation worth building on.':'A little stronger with every concept.'}</p></div>
        <div className="sidebar-bottom"><FocusTimer onComplete={onFocusComplete}/><nav className="utility-nav" aria-label="Workspace tools"><a className={`nav-item ${section==='settings'?'selected':''}`} href="#/settings" aria-label="Appearance" title="Appearance"><Icon name="settings" size={19}/><span>Appearance</span></a><a className="nav-item" href="https://open.spotify.com/genre/focus-page" target="_blank" rel="noreferrer" aria-label="Open focus music on Spotify" title="Focus music"><Icon name="music" size={19}/><span>Focus music</span><Icon name="external" size={12}/></a><button className="nav-item" onClick={()=>setHelpOpen(true)} aria-label="Help and shortcuts" title="Help and shortcuts"><Icon name="help" size={19}/><span>Help & shortcuts</span></button></nav></div>
      </div><a className="profile" href="#/settings" aria-label="Workspace preferences"><span className="avatar">{initials}</span><div><strong>{profileName||'Your space to grow'}</strong><span><i className={hub.storageError?'error-dot':'saved-dot'}/>{hub.storageError?'Saved in this tab':'Local workspace'}</span></div><Icon name="down" size={15}/></a>
    </aside>
    <div className="workspace"><header className="topbar"><div className="breadcrumb"><span>My workspace</span><Icon name="chevron" size={14}/><strong>{title}</strong></div><div className="topbar-actions"><button className="global-search-button" onClick={()=>{setInstant(false);setSearchOpen(true);setQuery('');}} aria-label="Search Learning Hub"><Icon name="search" size={17}/><span>Search anything…</span><kbd>⌘ K</kbd></button><a href="#/progress" className="streak-button" aria-label={`${streak} day learning streak`}><Icon name="flame" size={17}/><span>{streak}</span></a><a className="github-link icon-button" href="https://github.com/LS2355/Learning-Hub" target="_blank" rel="noreferrer" aria-label="Learning Hub on GitHub"><Icon name="github" size={20}/></a></div></header>
      <main id="main-content" tabIndex="-1">{hub.storageError&&<div className="storage-banner" role="alert"><Icon name="help" size={17}/>{hub.storageError}<a href="#/settings">Open Settings</a></div>}
        {section==='learn'?(lessonId?<LessonPage key={lessonId} id={lessonId} hub={hub} notify={notify}/>:<LearnPage hub={hub}/>):section==='practice'?<PracticePage hub={hub} notify={notify} routeSearch={new URLSearchParams(queryString).get('q')||new URLSearchParams(queryString).get('topic')||''}/>:section==='progress'?<ProgressPage hub={hub}/>:section==='saved'?<LearnPage key="saved" hub={hub} savedOnly/>:section==='settings'?<Suspense fallback={<div className="route-loading" role="status"><LogoOutlineLoader size={64}/><span>Opening your workspace…</span></div>}><SettingsPage hub={hub} notify={notify}/></Suspense>:<div className="page empty-state"><Icon name="search" size={32}/><h1>Let’s get you back on track.</h1><p>This page isn’t part of the workspace.</p><a href="#/learn" className="button primary">Back to learning<Icon name="arrow" size={17}/></a></div>}
      </main><footer className="app-footer"><span>Built for the curious.</span><span>Learning Hub<span className="footer-dot">.</span></span><a href="https://github.com/LS2355/Learning-Hub/issues" target="_blank" rel="noreferrer">Have an idea?<Icon name="external" size={12}/></a></footer>
    </div>
    <Modal open={searchOpen} onClose={()=>setSearchOpen(false)} title="A little curiosity goes a long way." className="search-modal" instant={instant}>
      <label className="search-field command-search"><Icon name="search"/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search topics or jump to a page…" aria-label="Search all topics and pages"/></label><div className="command-results">{matchingPages.length>0&&<div className="command-section"><span>Jump to</span>{matchingPages.map(([id,label,icon])=><a key={id} href={`#/${id}`} onClick={()=>setSearchOpen(false)}><Icon name={icon} size={18}/><strong>{label}</strong><Icon name="arrow" size={15}/></a>)}</div>}{matchingTopics.length>0&&<div className="command-section"><span>Concepts</span>{matchingTopics.map(topic=><a key={topic.id} href={`#/learn/${topic.id}`} onClick={()=>setSearchOpen(false)}><Icon name="book" size={18}/><strong>{topic.title}</strong><small>{topic.category}</small><Icon name="arrow" size={15}/></a>)}</div>}{!matchingPages.length&&!matchingTopics.length&&<div className="compact-empty">No matching concepts. Try “array”, “search”, or “sorting”.</div>}</div><div className="command-footer"><span><kbd>Tab</kbd> to navigate · <kbd>Enter</kbd> to open</span><span><kbd>Esc</kbd> to close</span></div>
    </Modal>
    <Modal open={helpOpen} onClose={()=>setHelpOpen(false)} title="A little help along the way." description="Everything you need to feel at home here." className="help-modal"><div className="shortcut-grid"><span><kbd>⌘ / Ctrl K</kbd>Search the workspace</span><span><kbd>/</kbd>Quick search</span><span><kbd>?</kbd>Open help</span><span><kbd>Esc</kbd>Close a dialog</span></div><div className="faq-list">{questions.map(([question,answer])=><details key={question}><summary>{question}<Icon name="down" size={16}/></summary><p>{answer}</p></details>)}</div><a className="help-issue" href="https://github.com/LS2355/Learning-Hub/issues" target="_blank" rel="noreferrer">Something on your mind? Share an idea on GitHub.<Icon name="external" size={15}/></a></Modal>
    {toast&&<div className="toast" role="status"><span className="toast-icon"><Icon name="check" size={16}/></span><span>{toast.message}</span>{toast.action&&<button onClick={()=>{toast.action.onClick();setToast(null);}}>{toast.action.label}</button>}<button className="icon-button" aria-label="Dismiss notification" onClick={()=>setToast(null)}><Icon name="close" size={15}/></button></div>}
  </div></>;
}
