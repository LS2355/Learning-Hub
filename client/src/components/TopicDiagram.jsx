import React from 'react';

export function TopicDiagram({ kind = 'array', active = -1, values, large = false }) {
  const items = values || [8, 16, 23, 42];
  const box = (x, y, w, h, key, text, selected = false) => <g key={key} className={selected ? 'diagram-node selected' : 'diagram-node'}><rect x={x} y={y} width={w} height={h} rx="7"/><text x={x + w / 2} y={y + h / 2 + 5}>{text}</text></g>;
  const node = (x, y, text, i) => <g key={i} className={`diagram-node ${active === i ? 'selected' : ''}`}><circle cx={x} cy={y} r="16"/><text x={x} y={y + 5}>{text}</text></g>;
  let drawing;
  if (['tree', 'graph'].includes(kind)) {
    const graph = kind === 'graph';
    const positions = graph ? [[70, 48], [150, 27], [235, 54], [110, 108], [210, 108]] : [[150, 27], [88, 72], [212, 72], [57, 117], [119, 117], [181, 117], [243, 117]];
    const edges = graph ? [[0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4]] : [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
    drawing = <>{edges.map(([a,b],i)=><line key={i} x1={positions[a][0]} y1={positions[a][1]} x2={positions[b][0]} y2={positions[b][1]} className="diagram-line"/>)}{positions.map(([x,y],i)=>node(x,y,graph ? ['A','B','C','D','E'][i] : [16,8,23,4,12,20,42][i],i))}</>;
  } else if (kind === 'stack') {
    drawing = <><path d="M106 32v99h88V32" className="diagram-line"/>{items.slice(-4).map((v,i)=>box(114, 105-i*26,72,22,i,v,active===i))}<path d="M221 35v41m-6-6 6 6 6-6" className="diagram-line accent-line"/><text className="diagram-caption" x="232" y="62">push</text></>;
  } else if (kind === 'hash') {
    drawing = <>{['key','name','score'].map((v,i)=><g key={v}>{box(40,20+i*39,68,28,'k'+i,v,active===i)}<path d={`M115 ${34+i*39}h53m-5-5 5 5-5 5`} className="diagram-line"/>{box(180,20+i*39,82,28,'v'+i,[23,'Ada',42][i],active===i)}</g>)}</>;
  } else if (kind === 'set') {
    drawing = <><rect x="66" y="22" width="168" height="107" rx="53" className="diagram-set"/>{[[106,60,8],[168,51,16],[155,100,23]].map(([x,y,v],i)=>node(x,y,v,i))}</>;
  } else if (kind === 'recursion') {
    drawing = <>{[0,1,2].map((i)=>box(58+i*28,21+i*29,142-i*25,41,i,`f(${4-i})`,active===i))}<path d="m213 88 20 0 0-54-13 0" className="diagram-line"/><text x="240" y="66" className="diagram-caption">return</text></>;
  } else if (kind === 'complexity') {
    drawing = <><path d="M49 21v107h207" className="diagram-line"/><path d="M51 117h193" className="complexity-constant"/><path d="M51 118 239 31" className="complexity-linear"/><path d="M51 118Q190 118 217 22" className="complexity-quadratic"/><text x="265" y="123" className="diagram-caption">n</text><text x="74" y="20" className="diagram-caption">work</text></>;
  } else if (kind === 'steps') {
    drawing = <>{[1,2,3,5,8].map((v,i)=><g key={i}>{box(23+i*53,99-i*17,43,32,i,v,active===i)}{i<4&&<path d={`m${67+i*53} ${109-i*17} 10-15`} className="diagram-line"/>}</g>)}</>;
  } else if (kind === 'sort') {
    const bars = values || [32, 72, 49, 100, 60];
    drawing = <>{bars.map((v,i)=><g key={i} className={`diagram-node ${active === i ? 'selected' : ''}`}><rect x={50+i*43} y={121-Math.max(12,Number(v))*.8} width="29" height={Math.max(12,Number(v))*.8} rx="4"/><text x={64+i*43} y="140" className="diagram-caption">{v}</text></g>)}</>;
  } else {
    const count = Math.max(1,items.length), width = Math.min(48,240/count), gap = 8;
    const start = (300-(width*count+gap*(count-1)))/2;
    drawing = <>{kind==='window'&&<rect x={start+Math.max(0,active)* (width+gap)-5} y="42" width={(width+gap)*Math.min(3,count)+2} height="64" rx="10" className="diagram-window"/>}{items.map((v,i)=><g key={i}>{box(start+i*(width+gap),51,width,45,i,v,active===i)}{['array','search','window','pointers'].includes(kind)&&<text x={start+i*(width+gap)+width/2} y="117" className="diagram-caption">{i}</text>}{kind==='linked'&&i<count-1&&<path d={`m${start+(i+1)*width+i*gap+1} 73h6m-3-3 3 3-3 3`} className="diagram-line"/>}</g>)}{kind==='queue'&&<><text x="54" y="32" className="diagram-caption">dequeue</text><text x="241" y="32" className="diagram-caption">enqueue</text><path d="M38 73H16m6-6-6 6 6 6M284 73h-20m6-6-6 6 6 6" className="diagram-line accent-line"/></>}{kind==='pointers'&&<><path d={`m${start+width/2} 142v-13m-4 4 4-4 4 4`} className="diagram-line accent-line"/><path d={`m${start+(count-1)*(width+gap)+width/2} 142v-13m-4 4 4-4 4 4`} className="diagram-line accent-line"/></>}</>;
  }
  return <svg className={`topic-diagram ${large?'large':''}`} viewBox="0 0 300 155" role="img" aria-label={`${kind.replace('-', ' ')} diagram${active>=0 ? `, step ${active+1} highlighted` : ''}`}>{drawing}</svg>;
}
