import React, { useEffect, useState } from 'react';
import { LogoOutlineLoader } from './LogoOutlineLoader';

const WORD = 'Learning Hub';

export function StartupSplash({ onComplete, motionPreference = 'system' }) {
  const [leaving, setLeaving] = useState(false);
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const reduced = motionPreference === 'reduced' || systemReduced;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const changed = () => setSystemReduced(media.matches);
    media.addEventListener('change', changed);
    return () => media.removeEventListener('change', changed);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const escape = event => { if (event.key === 'Escape') onComplete(); };
    window.addEventListener('keydown', escape);
    const reveal = setTimeout(() => setLeaving(true), reduced ? 350 : 2200);
    // A timer also removes the overlay when animation/transition events don't fire.
    const finish = setTimeout(onComplete, reduced ? 450 : 2500);
    return () => {
      clearTimeout(reveal); clearTimeout(finish);
      window.removeEventListener('keydown', escape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, reduced]);

  return <div className={`startup-splash ${leaving ? 'is-leaving' : ''} ${reduced ? 'is-reduced' : ''}`} role="region" aria-label="Learning Hub introduction">
    <div className="startup-splash-center">
      <LogoOutlineLoader size={144} duration={800/.82} loop={false} revealFill paused={reduced} label="Learning Hub logo"/>
      <span className="startup-word" aria-label={WORD}>
        <span className="startup-smoke" aria-hidden="true">{Array.from({length:7},(_,i)=><i key={i} style={{'--i':i,'--x':`${8+i*14}%`,'--y':`${50+((i%3)-1)*14}%`,'--drift':`${[8,-5,3,-8,6,-4,9][i]}px`}}/>)}</span>
        {[...WORD].map((letter,i)=><b key={i} aria-hidden="true" style={{'--i':i,'--drift':`${[4,-6,7,-3,2,-8,5,-2,4,-3,6,-4][i]}px`}}>{letter}</b>)}
      </span>
    </div>
    <button className="startup-skip" onClick={onComplete} autoFocus>Skip intro</button>
  </div>;
}
