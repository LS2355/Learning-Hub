import React, { useEffect, useRef } from 'react';
import { Icon } from './Icon';

export function Modal({ open, onClose, title, description, children, className = '', instant = false }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [open]);
  return <dialog ref={ref} className={`modal ${className} ${instant?'instant':''}`} aria-labelledby={`${title.replace(/\W/g,'')}-title`} onCancel={e=>{e.preventDefault();closeRef.current();}} onClick={e=>{
    if(e.target!==ref.current)return;
    const rect=ref.current.getBoundingClientRect();
    if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeRef.current();
  }}>
    <div className="modal-header"><div><h2 id={`${title.replace(/\W/g,'')}-title`}>{title}</h2>{description&&<p>{description}</p>}</div><button className="icon-button" onClick={onClose} aria-label={`Close ${title}`}><Icon name="close"/></button></div>
    {children}
  </dialog>;
}
