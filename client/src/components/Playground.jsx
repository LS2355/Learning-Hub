import React, { useMemo, useState } from 'react';
import { TopicDiagram } from './TopicDiagram';
import { Icon } from './Icon';

function framesFor(topic) {
  if(topic.id==='binary-search')return [
    { values:[3,8,16,23,42],active:2,text:'Find 42. Start at the middle: 16. The target is larger, so discard the left half.' },
    { values:[3,8,16,23,42],active:3,text:'Search the remaining right half. Its middle value is 23. Move the left boundary right again.' },
    { values:[3,8,16,23,42],active:4,text:'Found it! 42 is at index 4. Each comparison cut the search space roughly in half.' },
  ];
  if(topic.id==='stack')return [
    {values:[8,16],active:1,text:'16 is on top. A stack always operates on its most recently added item.'},
    {values:[8,16,23],active:2,text:'push(23) places a new item on top of the stack.'},
    {values:[8,16],active:1,text:'pop() returns 23. Now 16 is back on top. Last in, first out.'},
  ];
  if(topic.id==='queue')return [
    {values:[8,16,23],active:0,text:'8 arrived first. It is at the front of this queue.'},
    {values:[8,16,23,42],active:3,text:'Enqueue 42 at the back. The existing order stays the same.'},
    {values:[16,23,42],active:0,text:'Dequeue returns 8. Now 16 is at the front. First in, first out.'},
  ];
  if(topic.id==='bubble-sort')return [
    {values:[42,16,8,23],active:0,text:'Start with 42, 16, 8, 23. Compare the first two neighbors.'},
    {values:[16,42,8,23],active:1,text:'42 > 16, so swap. The larger value moves one position right.'},
    {values:[16,8,42,23],active:2,text:'42 > 8, so swap again. Continue comparing adjacent pairs.'},
    {values:[16,8,23,42],active:3,text:'42 > 23. Swap. The largest value has reached the end of the first pass.'},
    {values:[8,16,23,42],active:0,text:'Repeat on the unsorted portion. After swapping 16 and 8, the array is sorted.'},
  ];
  if(topic.id==='quick-sort')return [
    {values:[23,8,42,16],active:0,text:'Choose 23 as the pivot. Separate smaller and larger values.'},
    {values:[8,16,23,42],active:2,text:'Partition around 23: [8, 16] are smaller and [42] is larger. The pivot is in its final position.'},
    {values:[8,16,23,42],active:0,text:'Recursively sort each side. Both partitions are now sorted, so the full array is sorted.'},
  ];
  if(topic.id==='merge-sort')return [
    {values:[42,8,23,16],active:0,text:'Split [42, 8, 23, 16] into two halves, then split until each list contains one element.'},
    {values:[8,42,16,23],active:1,text:'Merge neighboring singletons in order: [8, 42] and [16, 23].'},
    {values:[8,16,23,42],active:2,text:'Compare the front of each sorted half. Take the smaller value until the final merge is complete.'},
  ];
  if(topic.id==='sliding-window')return [
    {values:[8,16,23,42,5],active:0,text:'A window of size 3 starts with [8, 16, 23]. Its sum is 47.'},
    {values:[8,16,23,42,5],active:1,text:'Move right: remove 8 and add 42. The new sum is 47 − 8 + 42 = 81.'},
    {values:[8,16,23,42,5],active:2,text:'Move once more: remove 16 and add 5. The sum is 70. The largest window sum was 81.'},
  ];
  if(topic.id==='bfs')return [16,8,23,4,12,20,42].map((value,active)=>({active,text:`Visit ${value}. Breadth-first order: ${[16,8,23,4,12,20,42].slice(0,active+1).join(' → ')}. A queue keeps the next level in order.`}));
  if(topic.id==='dfs')return [{active:0,text:'Begin at A. Mark it visited before following an edge.'},{active:1,text:'Follow A → B. Depth-first search keeps moving down a branch.'},{active:2,text:'Follow B → C. Mark C visited.'},{active:4,text:'Continue C → E.'},{active:3,text:'Continue E → D. All five vertices have now been visited: A → B → C → E → D.'}];
  if(topic.id==='array')return [{values:[8,16,23,42],active:0,text:'Each value has a position, called an index. The first index is 0.'},{values:[8,16,23,42],active:2,text:'numbers[2] gives us 23 directly. Indexed access takes constant time: O(1).'}, {values:[8,16,23,42,56],active:4,text:'push(56) adds a value at the end. Dynamic arrays can grow as needed.'},{values:[8,16,23,42],active:3,text:'pop() removes and returns 56. The original four values remain.'}];
  if(topic.visual==='hash')return [{active:0,text:'A key identifies a value. A hash table uses a hash function to choose a bucket for that key.'},{active:1,text:'Look up “name” to retrieve “Ada”. The table checks that the stored key matches, even if keys collide.'},{active:2,text:'Look up “score” to retrieve 42. Good hashing avoids scanning every entry on average.'}];
  if(topic.id==='recursion')return [{active:0,text:'factorial(4) needs 4 × factorial(3), so the first call waits for a smaller problem.'},{active:1,text:'factorial(3) needs 3 × factorial(2). Each call adds a frame to the call stack.'},{active:2,text:'Continue to the base case factorial(1) = 1. Then return back up: 2, 6, and finally 24.'}];
  if(topic.id==='set')return [{active:0,text:'Insert 8. The set now contains one unique value.'},{active:1,text:'Insert 16, then try inserting 8 again. The duplicate does not create another entry.'},{active:2,text:'Insert 23. The set contains exactly three distinct values: 8, 16, 23.'}];
  return [{active:0,text:topic.description},{active:1,text:topic.complexity},{active:2,text:'Explore the explanation and code below. Trace a small example by hand before trying a larger input.'}];
}

export function Playground({ topic }) {
  const [step,setStep]=useState(0);
  const [inputSize,setInputSize]=useState(16);
  const frames=useMemo(()=>framesFor(topic),[topic]);
  const current=frames[step];
  return <section className="playground" aria-labelledby="playground-title"><div className="playground-header"><div><Icon name="code" size={18}/><h2 id="playground-title">See it in action</h2></div><span>{topic.id==='big-o'?'Explore the growth':`Step ${step+1} of ${frames.length}`}</span></div>
    <div className="playground-stage"><TopicDiagram kind={topic.visual} active={current.active} values={current.values} large/></div>
    {topic.id==='big-o'?<div className="complexity-controls"><label htmlFor="input-size">Input size <strong>n = {inputSize}</strong></label><input id="input-size" type="range" min="1" max="64" value={inputSize} onChange={e=>setInputSize(Number(e.target.value))}/><div className="complexity-values"><span><i className="constant-dot"/>O(1)<strong>1</strong></span><span><i className="linear-dot"/>O(n)<strong>{inputSize}</strong></span><span><i className="quadratic-dot"/>O(n²)<strong>{inputSize*inputSize}</strong></span></div><p>Illustrative operation counts for the three growth functions.</p></div>:<><p className="step-explanation" aria-live="polite">{current.text}</p><div className="playground-controls"><button className="button text-button" disabled={step===0} onClick={()=>setStep(0)}><Icon name="reset" size={15}/>Restart</button><div><button className="icon-button" aria-label="Previous step" disabled={step===0} onClick={()=>setStep(step-1)}><Icon name="back" size={18}/></button><button className="button secondary" onClick={()=>setStep(step===frames.length-1?0:step+1)}>{step===frames.length-1?'Try again':'Next step'}<Icon name={step===frames.length-1?'reset':'arrow'} size={16}/></button></div></div></>}
  </section>;
}
