import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Icon } from './Icon';

export function FocusTimer({ onComplete }) {
  const [open,setOpen]=useState(false),[duration,setDuration]=useState(25),[remaining,setRemaining]=useState(1500),[endAt,setEndAt]=useState(null);
  useEffect(()=>{
    if(!endAt)return;
    const tick=()=>{const next=Math.max(0,Math.ceil((endAt-Date.now())/1000));setRemaining(next);if(next===0){setEndAt(null);onComplete(duration);}};
    const interval=setInterval(tick,500);tick();return()=>clearInterval(interval);
  },[endAt,duration,onComplete]);
  const time=`${Math.floor(remaining/60).toString().padStart(2,'0')}:${(remaining%60).toString().padStart(2,'0')}`;
  return <><button className={`focus-card ${endAt?'running':''}`} onClick={()=>setOpen(true)} aria-label={endAt?`Focus session running, ${time} remaining`:'Start a focus session'}><span className="focus-card-icon"><Icon name={endAt?'pause':'clock'} size={19}/></span><strong>{endAt?time:'A little space to focus.'}</strong><span>{endAt?'Your focus session is running':'One concept. 25 quiet minutes.'}</span><span className="focus-card-action">{endAt?'View session':'Start a session'}<Icon name="arrow" size={15}/></span></button>
    <Modal open={open} onClose={()=>setOpen(false)} title="Make a little space to focus." description="Pick one concept or problem. Everything else can wait."><div className="focus-timer"><span className="timer-digits" role="timer" aria-label={`${Math.floor(remaining/60)} minutes ${remaining%60} seconds remaining`}>{time}</span><p>{remaining===0?'A little more time well spent. Nice work.':endAt?'You’ve got this. One thing at a time.':'Your next small step starts here.'}</p><div className="progress-track"><span style={{transform:`scaleX(${1-remaining/(duration*60)})`}}/></div><label htmlFor="session-duration">Session length <strong>{duration} minutes</strong></label><input id="session-duration" type="range" min="5" max="60" step="5" disabled={Boolean(endAt)} value={duration} onChange={e=>{setDuration(Number(e.target.value));setRemaining(Number(e.target.value)*60);}}/><div className="timer-actions"><button className="button secondary" onClick={()=>{setEndAt(null);setRemaining(duration*60);}}><Icon name="reset" size={16}/>Reset</button><button className="button primary" onClick={()=>{if(endAt){setRemaining(Math.max(0,Math.ceil((endAt-Date.now())/1000)));setEndAt(null);}else{const seconds=remaining||duration*60;setRemaining(seconds);setEndAt(Date.now()+seconds*1000);}}}><Icon name={endAt?'pause':'play'} size={17}/>{endAt?'Pause':remaining<duration*60&&remaining>0?'Resume':'Start focus'}</button></div><small>The timer continues while you explore this workspace. Keep this tab open.</small></div></Modal>
  </>;
}
