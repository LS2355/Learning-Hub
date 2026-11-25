import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from './Modal';
import { Icon } from './Icon';
import { problemCatalog } from '../data/problems';
import { normalizeProblem, problemSlug } from '../lib/workspace';

export function AddProblem({ open, onClose, hub }) {
  const [query,setQuery]=useState(''),[selected,setSelected]=useState(null),[custom,setCustom]=useState(false),[url,setUrl]=useState(''),[title,setTitle]=useState(''),[difficulty,setDifficulty]=useState('medium'),[note,setNote]=useState(''),[error,setError]=useState('');
  useEffect(()=>{if(open){setQuery('');setSelected(null);setCustom(false);setUrl('');setTitle('');setNote('');setError('');}},[open]);
  const results=useMemo(()=>problemCatalog.filter(item=>`${item.title} ${item.number} ${item.topic}`.toLowerCase().includes(query.toLowerCase())).slice(0,8),[query]);
  const existing=new Set(hub.workspace.practice.map(x=>x.id));
  const submit=e=>{
    e.preventDefault();
    let problem=selected;
    if(custom){const slug=problemSlug(url);if(!slug){setError('Paste a valid leetcode.com/problems/… URL.');return;}problem=normalizeProblem({title:title.trim(),slug,difficulty,note});if(!problem){setError('Add a title for this problem.');return;}}
    if(!problem){setError('Choose a problem from the catalog, or add one by URL.');return;}
    if(existing.has(problem.id)){setError('This problem is already in your practice list.');return;}
    hub.addProblem({...problem,status:'next',note:note.trim()});onClose();
  };
  return <Modal open={open} onClose={onClose} title="Add a practice problem" description="Find a problem in the starter catalog, or bring your own."><form onSubmit={submit}><div className="segmented-control"><button type="button" className={!custom?'selected':''} onClick={()=>{setCustom(false);setError('');}}>Browse catalog</button><button type="button" className={custom?'selected':''} onClick={()=>{setCustom(true);setError('');}}>Add by URL</button></div>{custom?<div className="form-fields"><label>LeetCode problem URL<input type="url" value={url} onChange={e=>{setUrl(e.target.value);setError('');}} placeholder="https://leetcode.com/problems/two-sum/" required/></label><label>Problem title<input value={title} onChange={e=>setTitle(e.target.value)} maxLength={160} placeholder="e.g. Two Sum" required/></label><label>Difficulty<select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label></div>:<><label className="search-field modal-search"><Icon name="search" size={18}/><input autoComplete="off" value={query} onChange={e=>{setQuery(e.target.value);setError('');}} placeholder="Search by title, number, or topic" aria-label="Search problem catalog"/></label><div className="problem-results">{results.length?results.map(item=><button type="button" key={item.id} className={selected?.id===item.id?'selected':''} disabled={existing.has(item.id)} onClick={()=>{setSelected(item);setError('');}}><span className="problem-number">{item.number}</span><span><strong>{item.title}</strong><small>{existing.has(item.id)?'Already in your list':item.topic}</small></span><span className={`difficulty ${item.difficulty}`}>{item.difficulty}</span>{selected?.id===item.id&&<Icon name="check" size={16}/>}</button>):<div className="compact-empty">No catalog matches. Add any LeetCode problem by URL instead.<button type="button" className="button text-button" onClick={()=>setCustom(true)}>Add by URL<Icon name="arrow" size={16}/></button></div>}</div></>}
    <label className="form-label">A note to your future self <span>(optional)</span><textarea value={note} onChange={e=>setNote(e.target.value)} maxLength={4000} rows="2" placeholder="What do you want to remember?"/></label>{error&&<p className="form-error" role="alert">{error}</p>}<div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button type="submit" className="button primary" disabled={!custom&&!selected}><Icon name="plus" size={17}/>Add to practice</button></div></form></Modal>;
}
