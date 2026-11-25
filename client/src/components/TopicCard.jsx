import React from 'react';
import { Icon } from './Icon';
import { TopicDiagram } from './TopicDiagram';

export function TopicCard({ topic, completed, saved, onComplete, onSave, list = false }) {
  return <article className={`topic-card ${completed?'completed':''} ${list?'list-card':''}`}>
    <a className="card-link" href={`#/learn/${topic.id}`} aria-label={`Learn ${topic.title}`}>
      <div className={`card-visual visual-${topic.visual}`}><TopicDiagram kind={topic.visual}/>{completed&&<span className="visual-completed"><Icon name="check" size={13}/>Completed</span>}</div>
      <div className="card-content"><div className="card-category">{topic.category}<span className={`level level-${topic.level.toLowerCase()}`}>{topic.level}</span></div><h3>{topic.title}<Icon name="arrow" size={18}/></h3><p>{topic.description}</p></div>
    </a>
    <div className="card-footer"><span><Icon name="clock" size={14}/>{topic.minutes} min read</span><div><button className={`icon-button bookmark-button ${saved?'is-saved':''}`} onClick={()=>onSave(topic.id)} aria-label={`${saved?'Unsave':'Save'} ${topic.title}`} aria-pressed={saved}><Icon name="bookmark" size={16}/></button><button className={`completion-button ${completed?'is-complete':''}`} onClick={()=>onComplete(topic.id)} aria-label={`${completed?'Mark incomplete':'Mark complete'}: ${topic.title}`} aria-pressed={completed}>{completed?<Icon name="check" size={13}/>:<span/>}</button></div></div>
  </article>;
}
