import React, { useMemo, useState } from 'react';
import { topics, topicById, categories } from '../data/topics';
import { Icon } from '../components/Icon';
import { TopicDiagram } from '../components/TopicDiagram';
import { TopicCard } from '../components/TopicCard';

export function LearnPage({ hub, savedOnly = false }) {
  const {workspace,completedCount,toggleCompleted,toggleBookmark}=hub;
  const [category,setCategory]=useState('All topics');
  const [query,setQuery]=useState('');
  const [status,setStatus]=useState('all');
  const [layout,setLayout]=useState('grid');
  const available=useMemo(()=>topics.filter(x=>!savedOnly||workspace.bookmarks.includes(x.id)),[savedOnly,workspace.bookmarks]);
  const filtered=useMemo(()=>available.filter(topic=>(category==='All topics'||topic.category===category)&&`${topic.title} ${topic.description}`.toLowerCase().includes(query.toLowerCase())&&(status==='all'||(status==='completed'?workspace.completed.includes(topic.id):!workspace.completed.includes(topic.id)))),[available,category,query,status,workspace.completed]);
  const continueTopic=topicById[workspace.lastTopic]&&!workspace.completed.includes(workspace.lastTopic)?topicById[workspace.lastTopic]:topics.find(x=>!workspace.completed.includes(x.id))||topics[0];
  const progress=Math.round(completedCount/topics.length*100);
  return <div className="page learn-page">
    <div className="page-heading"><div><h1>{savedOnly?'Keep the good stuff close.':'Build your foundation.'}</h1><p>{savedOnly?'Your bookmarked concepts, ready when you are.':'Big ideas start with the basics. Find your next “aha” moment.'}</p></div>{!savedOnly&&<div className="learning-count"><span className="count-icon"><Icon name="book" size={21}/></span><div><strong>{completedCount}<span> / {topics.length}</span></strong><span>topics completed</span></div></div>}</div>
    {!savedOnly&&<section className="featured-lesson" aria-labelledby="featured-title">
      <div className="featured-copy"><div className="featured-meta"><span className="live-dot"/>{completedCount===topics.length?'Ready for another look?':workspace.lastTopic==='array'&&completedCount===0?'A great place to start':'Pick up where you left off'}<span className="meta-divider"/>{continueTopic.minutes} min</div><h2 id="featured-title">{continueTopic.title}<span>Small building blocks.<br/>Powerful possibilities.</span></h2><p>{continueTopic.description}</p><a className="button primary" href={`#/learn/${continueTopic.id}`}>{completedCount?'Continue learning':'Explore the concept'}<Icon name="arrow" size={17}/></a></div>
      <div className="featured-visual"><div className="visual-label"><span className="code-dot"/>let curiosity = true;</div><TopicDiagram kind={continueTopic.visual} large/><div className="visual-annotation"><span className="annotation-line"/><span>{continueTopic.visual==='array'?'A place for every value. An index for every place.':'See the idea. Understand the pattern.'}</span></div></div>
    </section>}
    <section aria-labelledby="library-title" className="library-section">
      <div className="section-heading"><div><h2 id="library-title">{savedOnly?'Saved topics':'Explore the library'}<span className="subtle-count">{available.length}</span></h2><p>{savedOnly?'A personal collection of things worth coming back to.':'Understand the how. Get comfortable with the why.'}</p></div><div className="view-switch" aria-label="Topic layout"><button className={layout==='grid'?'selected':''} aria-label="Grid view" aria-pressed={layout==='grid'} onClick={()=>setLayout('grid')}><Icon name="grid" size={17}/></button><button className={layout==='list'?'selected':''} aria-label="List view" aria-pressed={layout==='list'} onClick={()=>setLayout('list')}><Icon name="list" size={18}/></button></div></div>
      <div className="library-toolbar"><div className="category-tabs" aria-label="Topic categories">{categories.map(name=><button key={name} onClick={()=>setCategory(name)} className={category===name?'selected':''} aria-pressed={category===name}>{name}</button>)}</div></div>
      <div className="filter-row"><label className="search-field"><Icon name="search" size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a concept…" aria-label="Search topics"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear topic search"><Icon name="close" size={15}/></button>}</label><div className="filter-right"><span className="result-count" aria-live="polite">{filtered.length} {filtered.length===1?'topic':'topics'}</span><select aria-label="Filter topics by completion" value={status} onChange={e=>setStatus(e.target.value)}><option value="all">All progress</option><option value="incomplete">Not completed</option><option value="completed">Completed</option></select></div></div>
      {filtered.length?<div className={`topic-grid ${layout==='list'?'topic-list':''}`}>{filtered.map(topic=><TopicCard key={topic.id} topic={topic} completed={workspace.completed.includes(topic.id)} saved={workspace.bookmarks.includes(topic.id)} onComplete={toggleCompleted} onSave={toggleBookmark} list={layout==='list'}/>)}</div>:<div className="empty-state"><span><Icon name={savedOnly?'bookmark':'search'} size={30}/></span><h3>{savedOnly&&!available.length?'Your collection starts here.':'No concepts found.'}</h3><p>{savedOnly&&!available.length?'Save a topic with its bookmark button. It’ll be waiting right here.':'Try another search, or make a little room in your filters.'}</p>{savedOnly&&!available.length?<a className="button primary" href="#/learn">Explore the library<Icon name="arrow" size={17}/></a>:<button className="button secondary" onClick={()=>{setQuery('');setCategory('All topics');setStatus('all');}}>Clear filters</button>}</div>}
    </section>
    {!savedOnly&&<div className="library-bottom"><div><Icon name="sparkle" size={18}/><span>A little better, one concept at a time.</span></div><span>{progress}% of your foundation built</span></div>}
  </div>;
}
