import { useState, useRef, useEffect, useCallback } from 'react';

export function TweaksPanel({ children, title = 'Tweaks' }) {
  const [open, setOpen] = useState(false);
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
  }, []);

  useEffect(() => {
    if (open) {
      clampToViewport();
      const observer = new ResizeObserver(clampToViewport);
      observer.observe(dragRef.current);
      return () => observer.disconnect();
    }
  }, [open, clampToViewport]);

  const onDragStart = (e) => {
    const startX = e.clientX - offsetRef.current.x;
    const startY = e.clientY - offsetRef.current.y;

    const onDragMove = (ev) => {
      offsetRef.current.x = ev.clientX - startX;
      offsetRef.current.y = ev.clientY - startY;
      clampToViewport();
      if (dragRef.current) {
        dragRef.current.style.left = offsetRef.current.x + 'px';
        dragRef.current.style.top = offsetRef.current.y + 'px';
      }
    };

    const onDragEnd = () => {
      document.removeEventListener('pointermove', onDragMove);
      document.removeEventListener('pointerup', onDragEnd);
    };

    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', onDragEnd);
  };

  return (
    <div
      ref={dragRef}
      style={{
        position: 'fixed',
        left: offsetRef.current.x + 'px',
        top: offsetRef.current.y + 'px',
        width: 280,
        maxHeight: 'calc(100vh - 32px)',
        display: open ? 'flex' : 'none',
        flexDirection: 'column',
        background: 'rgba(250,249,247,0.78)',
        color: '#29261b',
        backdropFilter: 'blur(24px) saturate(160%)',
        border: '0.5px solid rgba(255,255,255,0.6)',
        borderRadius: 14,
        boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 12px 40px rgba(0,0,0,0.18)',
        fontSize: '11.5px',
        lineHeight: 1.4,
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        zIndex: 2147483646,
        transition: 'opacity 0.2s'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 14px',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
          cursor: 'grab',
          userSelect: 'none'
        }}
        onPointerDown={onDragStart}
      >
        <span style={{ fontWeight: 600, fontSize: '12px' }}>{title}</span>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            padding: 0,
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {open ? '−' : '+'}
        </button>
      </div>

      {open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '12px 14px',
            overflowY: 'auto',
            flex: 1
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function TweakSection({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function TweakSelect({ id, value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '6px 8px',
        borderRadius: '6px',
        border: '0.5px solid rgba(0,0,0,0.1)',
        background: '#fff',
        fontSize: '11px',
        fontFamily: 'inherit',
        cursor: 'pointer'
      }}
    >
      {options.map((o) => {
        const v = typeof o === 'object' ? o.value : o;
        const l = typeof o === 'object' ? o.label : o;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </select>
  );
}
