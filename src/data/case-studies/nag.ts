import type { CaseStudy } from './types';

const nag: CaseStudy = {
  slug: 'nag',
  title: 'Nag',
  tagline: 'High-friction persistent reminders that refuse to be dismissed',
  year: 2026,
  role: 'Solo project',
  status: 'in-progress',
  tech: [
    'Kotlin Multiplatform',
    'Compose Multiplatform',
    'AlarmManager',
    'Quick Settings Tile'
  ],
  summary:
    "A persistent reminder utility designed against notification blindness and hyperfocus. Standard alarms are too heavy. Calendar notifications are too passive. Nag uses an escalation ladder that refuses to be dismissed until you explicitly confirm the task is done.",
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "Android notifications are designed to be polite. They ping once and sit in the tray. For users with ADHD or deep-focus habits, that's invisible. Standard alarm-clock apps are too heavy for short reminders. Calendar notifications are too passive."
    },
    {
      type: 'list',
      items: [
        'Passive is invisible: a notification that does not vibrate continuously does not exist',
        'Friction is death: if setting a reminder takes more than three taps, the user will not bother',
        'Easy dismissal: muscle memory swipes away notifications without processing the content'
      ]
    },
    { type: 'heading', level: 2, text: 'Product principles' },
    {
      type: 'list',
      items: [
        'Speed beats precision: a 5-minute nag set in 1 second beats a 4:32 PM nag set in 10 seconds',
        'Active Until Done: a Nag is not a notification, it is a *state*; the app remains in Active Nag until you resolve it',
        'Annoyance is a feature: the app must be willing to be rude to get attention'
      ]
    },
    { type: 'heading', level: 2, text: 'The Nag engine' },
    {
      type: 'prose',
      content:
        'The escalation ladder is what makes it work. The app does not just fire an alarm. It enters a cycle. Even if you swipe the notification away, `AlarmManager` reschedules the next nag immediately. The only way to stop it is the explicit "I Did It" button.'
    },
    { type: 'heading', level: 3, text: 'T+0 (trigger)' },
    {
      type: 'list',
      items: [
        'Full-screen intent (high priority)',
        'Short, distinct ping (not a continuous alarm ringtone)',
        'Double-pulse haptic'
      ]
    },
    { type: 'heading', level: 3, text: 'T+1 minute (if ignored)' },
    {
      type: 'list',
      items: [
        'Heads-up notification reappears',
        'Louder ping',
        'Long vibration (~1s)'
      ]
    },
    { type: 'heading', level: 3, text: 'T+3 minutes (still ignored)' },
    {
      type: 'list',
      items: [
        'Screen turns on; optional flashlight strobe',
        'Continuous alarm ringtone (80% volume)',
        'Continuous heavy-click haptic'
      ]
    },
    { type: 'heading', level: 2, text: 'Entry points: beating the Clock app' },
    {
      type: 'prose',
      content:
        'The default Android flow for a timer is `unlock → open clock → timer → scroll wheel → set`. Nag has to beat that or it loses.'
    },
    {
      type: 'list',
      items: [
        'App UI: grid of preset buttons (2m, 5m, 10m, 15m, 30m, 1h); long-press to pin to Quick Settings',
        'Quick Settings tile: tap fires the default Nag; double-tap fires the secondary; tile lights up when a Nag is active',
        'App shortcuts: launcher long-press goes straight to "New 5 min Nag" / "New 10 min Nag"'
      ]
    },
    { type: 'heading', level: 2, text: 'Design system: Tactile Digital' },
    {
      type: 'prose',
      content:
        'Inspiration: Braun calculators, Teenage Engineering devices, physical egg timers, Nothing OS. The UI should feel like a physical machine, not a database form. Safety-Industrial palette: surface near-black `#0F0F0F`, primary International Orange `#FF4D00`, secondary dark grey `#2A2A2A`, text pure white. Bold weights only.'
    },
    { type: 'heading', level: 2, text: 'Status' },
    {
      type: 'prose',
      content:
        'PRD v1.0 finalized. Pre-build, Android-first via Kotlin Multiplatform so iOS shared code stays compilable from day one.'
    }
  ]
};

export default nag;
