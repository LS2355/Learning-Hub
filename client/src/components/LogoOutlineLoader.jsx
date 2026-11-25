import React, { useEffect, useId, useRef } from 'react';
import { logoContours, logoPath, smootherstep, traceAtProgress } from '../lib/logo-trace';

/** duration is the full loop in ms; the default head lap is 800 ms.
 * trailLifetime defaults to 18% of duration. color inherits the active accent.
 * paused renders a readable static outline rather than an invisible end frame.
 */
export function LogoOutlineLoader({ size = 64, color = 'var(--accent)', duration = 800/.82, trailLifetime = duration*.18, paused = false, loop = true, revealFill = false, label = 'Loading Learning Hub', className = '' }) {
  if (!Number.isFinite(duration) || duration <= 0 || !Number.isFinite(trailLifetime) || trailLifetime <= 0 || trailLifetime >= duration) throw new RangeError('Use a positive duration and a trail lifetime shorter than the cycle.');
  const id = useId().replace(/:/g, '');
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const traces = [...svg.querySelectorAll('[data-trace]')];
    const fill = svg.querySelector('[data-logo-fill]');
    const stops = logoContours.map((contour,c) => contour.edges.map((edge,e) => [...svg.querySelectorAll(`[data-edge="${c}-${e}"] stop`)]));
    let frame = 0, start = 0;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };
    const draw = now => {
      if (!start) start = now;
      const elapsed = now-start;
      if (!loop && elapsed >= duration) {
        if (fill) fill.setAttribute('opacity', '1');
        svg.dataset.static = 'true'; return;
      }
      const p = (elapsed%duration)/duration;
      // Fill brightness follows the same normalized clock; the trace is independent.
      if (fill) fill.setAttribute('opacity', String(p));
      logoContours.forEach((contour,c) => {
        const { head, tail } = traceAtProgress(p, contour.length, trailLifetime/duration);
        const visible = head-tail;
        traces[c].setAttribute('opacity', visible > .001 ? '1' : '0');
        traces[c].setAttribute('stroke-dasharray', `${Math.max(0,visible)} ${contour.length}`);
        traces[c].setAttribute('stroke-dashoffset', String(-tail));
        contour.edges.forEach((edge,e) => stops[c][e].forEach((node,k) => {
          const distance = edge.offset + edge.size*k/16;
          const intensity = visible > .001 ? smootherstep((distance-tail)/visible) : 0;
          const gray = Math.round(intensity*255);
          node.setAttribute('stop-color', `rgb(${gray},${gray},${gray})`);
        }));
      });
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      stop(); start = 0;
      const reduced = paused || media.matches || document.documentElement.dataset.motion === 'reduced';
      svg.dataset.static = String(reduced);
      if (fill) fill.setAttribute('opacity', reduced ? '1' : '0');
      if (!reduced && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
    media.addEventListener('change',sync);
    document.addEventListener('visibilitychange',sync);
    sync();
    return () => { stop();observer.disconnect();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync); };
  },[duration,trailLifetime,paused,loop,revealFill]);
  return <svg ref={svgRef} width={size} height={size} viewBox="0 0 36 36" fill="none" className={`logo-outline-loader ${className}`} style={{color}} role="img" aria-label={label}>
    <defs>{logoContours.flatMap((contour,c)=>contour.edges.map((edge,e)=><linearGradient key={`${c}-${e}`} id={`${id}-g-${c}-${e}`} data-edge={`${c}-${e}`} gradientUnits="userSpaceOnUse" x1={edge.start[0]} y1={edge.start[1]} x2={edge.end[0]} y2={edge.end[1]}>{Array.from({length:17},(_,k)=><stop key={k} offset={k/16} stopColor="black"/>)}</linearGradient>))}
      {logoContours.map((contour,c)=><mask key={c} id={`${id}-m-${c}`} x="0" y="0" width="36" height="36" maskUnits="userSpaceOnUse" style={{maskType:'luminance'}}>{contour.edges.map((edge,e)=><path key={e} d={`M${edge.start.join(' ')}L${edge.end.join(' ')}`} stroke={`url(#${id}-g-${c}-${e})`} strokeWidth="2.4" strokeLinecap="square"/>)}</mask>)}
    </defs>
    {revealFill&&<g data-logo-fill opacity="0"><rect width="36" height="36" rx="10" fill="currentColor"/><path d={logoPath} fill="var(--accent-ink)"/></g>}
    {logoContours.map((contour,c)=><g key={c}>{!revealFill&&<path className="loader-outline" d={contour.path} stroke="currentColor" strokeWidth=".65" strokeLinejoin="miter"/>}<path data-trace d={contour.path} stroke="currentColor" strokeWidth=".65" strokeLinejoin="miter" strokeLinecap="butt" opacity="0" mask={`url(#${id}-m-${c})`}/></g>)}
  </svg>;
}
