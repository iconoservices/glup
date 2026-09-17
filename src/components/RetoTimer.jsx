import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function extractSeconds(text) {
  if (!text) return null;
  if (/2\s*minutos?/i.test(text)) return 120;
  if (/1\s*minuto/i.test(text)) return 60;
  const match = text.match(/(\d+)\s*segundos?/i);
  if (match) return parseInt(match[1], 10);
  return null;
}

export default function RetoTimer({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(seconds);
    setRunning(false);
  }, [seconds]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      try { if (navigator.vibrate) navigator.vibrate([150, 80, 150]); } catch {}
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [running, timeLeft]);

  if (!seconds || seconds <= 0) return null;

  const pct = Math.max(0, Math.min(100, (timeLeft / seconds) * 100));

  return (
    <div className="reto-timer-box">
      <div className="reto-timer-bar">
        <div className="reto-timer-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="reto-timer-controls">
        <span className={`reto-timer-display${timeLeft <= 0 ? ' is-done' : ''}`}>
          ⏱️ {timeLeft > 0 ? `${timeLeft}s` : '¡TIEMPO! 🔥'}
        </span>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            className="btn btn--sm btn--solid"
            style={{ padding: '0.35rem 0.8rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            onClick={() => {
              if (timeLeft <= 0) setTimeLeft(seconds);
              setRunning((r) => !r);
            }}
          >
            {running ? (
              <><Pause size={13} /> Pausar</>
            ) : timeLeft <= 0 ? (
              <><RotateCcw size={13} /> Repetir</>
            ) : (
              <><Play size={13} /> Iniciar {seconds}s</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
