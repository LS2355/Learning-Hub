import test from 'node:test';
import assert from 'node:assert/strict';
import { accentColors } from '../data/themes.js';
import { logoContours, traceAtProgress } from './logo-trace.js';
import { createWorkspace, normalizeWorkspace, normalizeProblem, problemSlug, loadWorkspace, sortProblems, activityStreak, recordActivity } from './workspace.js';

test('problem links accept LeetCode and reject other hosts or executable URLs',()=>{
  assert.equal(problemSlug('https://leetcode.com/problems/two-sum/description/'),'two-sum');
  for(const value of ['https://leetcode.com.evil.test/problems/two-sum/','javascript:alert(1)','https://example.com/problems/two-sum/'])assert.equal(problemSlug(value),null);
});
test('legacy practice data migrates without losing notes or solved status',()=>{
  const legacy=[{problem:'Two Sum',link:'two-sum',leetCodeNumber:'1',difficulty:'easy',progress:'done',note:'Use a map'}];
  const result=loadWorkspace({getItem:key=>key==='data'?JSON.stringify(legacy):null},[]);
  assert.equal(result.practice[0].status,'done');assert.equal(result.practice[0].note,'Use a map');
});
test('backup validation rejects wrong schemas and deduplicates problems',()=>{
  assert.throws(()=>normalizeWorkspace({version:2}));
  const problem=normalizeProblem({title:'Two Sum',slug:'two-sum'});
  const workspace=createWorkspace([problem,problem]);workspace.completed=['array','array'];
  const result=normalizeWorkspace(workspace);
  assert.equal(result.practice.length,1);assert.deepEqual(result.completed,['array']);
});
test('sorting does not mutate saved data and uses numeric problem numbers',()=>{
  const items=[{title:'A',number:'20',status:'done'},{title:'B',number:'3',status:'next'}];
  assert.equal(sortProblems(items,'number')[0].number,'3');assert.equal(items[0].number,'20');
  assert.equal(sortProblems(items)[0].status,'next');
});
test('repeated completion on the same day does not inflate activity',()=>{
  const state=createWorkspace();state.activities=recordActivity(state,'learned','array');
  assert.equal(recordActivity(state,'learned','array').length,1);
});
test('streaks remain active until the day after the most recent activity',()=>{
  const activities=[{date:'2026-11-22'},{date:'2026-11-23'}];
  assert.equal(activityStreak(activities,new Date(2026,10,24,12)),2);
  assert.equal(activityStreak(activities,new Date(2026,10,25,12)),0);
});
test('backup round trip preserves topic metadata and user preferences',()=>{
  const state=createWorkspace([normalizeProblem({title:'Two Sum',slug:'two-sum',topic:'Arrays'})]);
  state.preferences.theme='light';state.bookmarks=['array'];
  assert.deepEqual(normalizeWorkspace(JSON.parse(JSON.stringify(state))),state);
});

test('every supported accent survives a workspace backup round trip',()=>{
  for (const accent of accentColors) {
    const state=createWorkspace(); state.preferences.accent=accent;
    assert.equal(normalizeWorkspace(JSON.parse(JSON.stringify(state))).preferences.accent,accent);
  }
});

test('logo contours stay separate and trace closes without a visible reset',()=>{
  assert.equal(logoContours.length,2);
  assert.deepEqual(logoContours.map(x=>x.length),[66,28]);
  for(const {length} of logoContours) {
    assert.deepEqual(traceAtProgress(0,length),{head:0,tail:0});
    assert.deepEqual(traceAtProgress(1,length),{head:length,tail:length});
    let previous={head:0,tail:0};
    for(let i=0;i<=100;i++) {
      const current=traceAtProgress(i/100,length);
      assert.ok(current.head>=current.tail && current.head>=previous.head && current.tail>=previous.tail);
      previous=current;
    }
  }
  assert.throws(()=>traceAtProgress(.5,66,1),RangeError);
});
