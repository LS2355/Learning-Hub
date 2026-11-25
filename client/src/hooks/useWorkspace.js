import { useCallback, useEffect, useMemo, useState } from 'react';
import { starterProblems } from '../data/problems';
import { topics, topicById } from '../data/topics';
import { createWorkspace, loadWorkspace, normalizeWorkspace, recordActivity, STORAGE_KEY } from '../lib/workspace';

export function useWorkspace(notify) {
  const [initial] = useState(() => {
    try { return { workspace: loadWorkspace(localStorage, starterProblems), error: '' }; }
    catch { return { workspace: createWorkspace(starterProblems), error: 'Your saved workspace could not be read. The original data is untouched. You can export this session from Settings.' }; }
  });
  const [workspace, setWorkspace] = useState(initial.workspace);
  const [storageError, setStorageError] = useState(initial.error);
  const [allowSave, setAllowSave] = useState(!initial.error);
  useEffect(() => {
    if (!allowSave) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace)); setStorageError(''); }
    catch { setStorageError('Your browser could not save progress. Keep this tab open and export a backup from Settings.'); }
  }, [workspace, allowSave]);
  useEffect(() => {
    const sync = event => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try { setWorkspace(normalizeWorkspace(JSON.parse(event.newValue))); } catch { /* Keep this tab's valid data. */ }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const toggleCompleted = useCallback(id => {
    setWorkspace(previous => {
      const done = previous.completed.includes(id);
      return { ...previous, completed: done ? previous.completed.filter(x => x !== id) : [...previous.completed, id], activities: done ? previous.activities : recordActivity(previous, 'learned', id) };
    });
  }, []);
  const toggleBookmark = useCallback(id => {
    setWorkspace(previous => ({ ...previous, bookmarks: previous.bookmarks.includes(id) ? previous.bookmarks.filter(x=>x!==id) : [...previous.bookmarks,id] }));
  }, []);
  const visitTopic = useCallback(id => {
    if (!topicById[id]) return;
    setWorkspace(previous => previous.lastTopic===id ? previous : ({ ...previous, lastTopic: id }));
  }, []);
  const updateProblem = useCallback((id, updates) => {
    setWorkspace(previous => ({ ...previous,
      practice: previous.practice.map(item => item.id===id ? {...item,...updates}:item),
      activities: updates.status==='done' ? recordActivity(previous,'solved',id):previous.activities,
    }));
  }, []);
  const addProblem = useCallback(problem => {
    setWorkspace(previous => previous.practice.some(x=>x.id===problem.id) ? previous : ({...previous,practice:[...previous.practice,problem]}));
    notify(`${problem.title} added to practice.`);
  }, [notify]);
  const deleteProblem = useCallback(id => {
    const item=workspace.practice.find(x=>x.id===id);
    if(!item)return;
    setWorkspace(previous=>({...previous,practice:previous.practice.filter(x=>x.id!==id)}));
    notify('Problem removed.', { label:'Undo', onClick:()=>setWorkspace(previous=>previous.practice.some(x=>x.id===id)?previous:({...previous,practice:[...previous.practice,item]})) });
  }, [workspace.practice,notify]);
  const updatePreferences = useCallback(updates => setWorkspace(previous=>({...previous,preferences:{...previous.preferences,...updates}})),[]);
  const importWorkspace = useCallback(data => {
    const validated=normalizeWorkspace(data);
    setWorkspace(validated);setAllowSave(true);setStorageError('');notify('Your workspace has been restored.');
  },[notify]);
  const resetWorkspace = useCallback(()=>{
    setWorkspace(createWorkspace());setAllowSave(true);setStorageError('');notify('Workspace reset. A fresh start.');
  },[notify]);
  const completedCount=useMemo(()=>topics.filter(x=>workspace.completed.includes(x.id)).length,[workspace.completed]);
  return { workspace, setWorkspace, storageError, completedCount, toggleCompleted, toggleBookmark, visitTopic, updateProblem, addProblem, deleteProblem, updatePreferences, importWorkspace, resetWorkspace };
}
