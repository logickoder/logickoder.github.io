'use client';

import { useState, useSyncExternalStore } from 'react';
import { track } from '@/lib/analytics';
import { setSoundEnabled, soundEnabled, toggle } from '@/lib/feedback';

const noopSubscribe = () => () => {};

export default function SoundToggle() {
  const stored = useSyncExternalStore(noopSubscribe, soundEnabled, () => true);
  const [override, setOverride] = useState<boolean | null>(null);
  const on = override ?? stored;

  function flip() {
    const next = !on;
    setSoundEnabled(next);
    setOverride(next);
    toggle(next); // haptic both ways; the chime only plays when turning sound on
    track('sound_toggle', { to: next ? 'on' : 'off' });
  }

  return (
    <button
      type="button"
      onClick={flip}
      data-feedback="own"
      aria-pressed={on}
      aria-label={on ? 'Sound on. Mute interface sounds' : 'Sound off. Turn interface sounds on'}
      className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-fg"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
        {on ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
      </svg>
    </button>
  );
}
