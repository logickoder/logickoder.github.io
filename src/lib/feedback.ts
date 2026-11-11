// UI feedback: short synthesized sounds (Web Audio, no files) and haptics.
// Sound is on by default and can be muted (saved as `logickoder-sound`).
// Haptics: navigator.vibrate on Android; on iOS 18+ Safari, toggling a hidden
// <input type="checkbox" switch> through its label fires the system haptic.

import { SOUND_KEY, load, save } from './storage';

let ctx: AudioContext | null = null;
let iosSwitch: HTMLLabelElement | null = null;

export function soundEnabled(): boolean {
  return load(SOUND_KEY) !== 'off';
}

export function setSoundEnabled(on: boolean) {
  save(SOUND_KEY, on ? 'on' : 'off');
}

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function blip(freq: number, at: number, duration: number, gain: number, type: OscillatorType = 'sine') {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + at;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  amp.gain.setValueAtTime(0, t);
  amp.gain.linearRampToValueAtTime(gain, t + 0.004);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(amp).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

function haptic(ms: number) {
  if (typeof navigator === 'undefined') return;
  if (typeof navigator.vibrate === 'function') {
    navigator.vibrate(ms);
    return;
  }
  // iOS Safari has no vibrate(); a switch-style checkbox toggle triggers its haptic.
  if (!iosSwitch) {
    const label = document.createElement('label');
    label.setAttribute('aria-hidden', 'true');
    label.style.cssText = 'position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;left:-9999px';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('switch', '');
    input.tabIndex = -1;
    label.appendChild(input);
    document.body.appendChild(label);
    iosSwitch = label;
  }
  iosSwitch.click();
}

/** Light tap: links, buttons, filters. */
export function tap() {
  haptic(8);
  if (soundEnabled()) blip(1400, 0, 0.035, 0.035, 'triangle');
}

/** Switch: theme and sound toggles. Two quick tones, rising for on/light. */
export function toggle(up: boolean) {
  haptic(14);
  if (!soundEnabled()) return;
  const [a, b] = up ? [660, 990] : [990, 660];
  blip(a, 0, 0.06, 0.045, 'sine');
  blip(b, 0.055, 0.08, 0.045, 'sine');
}
