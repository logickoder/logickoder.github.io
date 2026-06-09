import type { CaseStudy } from './types';

const knock: CaseStudy = {
  slug: 'knock',
  title: 'Knock',
  tagline: 'Local-first calendar alarm app on Compose Multiplatform',
  year: 2026,
  role: 'Solo project',
  status: 'in-progress',
  tech: [
    'Kotlin Multiplatform',
    'Compose Multiplatform',
    'Room (KMP)',
    'Ktor',
    'WorkManager',
    'AlarmManager',
    'AppAuth'
  ],
  summary:
    "A local-first Android app that wakes you for calendar meetings the way an alarm clock wakes you in the morning: full-screen, lock-screen-bypassing, ringing until you dismiss it. Built on Compose Multiplatform with iOS targets compiled from day one. Architectural mandate: never weaken alarm reliability.",
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "Calendar notifications fail too often: silent on Do Not Disturb, swallowed by Doze, killed by aggressive OEM battery managers, or buried in a notification shade you didn't check. For a remote engineer whose income depends on being on time to a 14:00 meeting learned about at 13:42, 'I didn't see the notification' is not an acceptable outcome."
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        "Multi-source event ingest into a single local database. Schedule exact alarms with the OS-level alarm primitives: the same ones that make your morning alarm reliable. No backend. Crashlytics for stack traces only, with PII scrubbing on calendar content."
    },
    { type: 'heading', level: 2, text: 'Sources' },
    {
      type: 'list',
      items: [
        "Android's `CalendarContract` provider: zero config if calendars are already synced on the phone",
        'Google Calendar OAuth via AppAuth: for work calendars not exposed to the device',
        'ICS subscription URLs: fallback when OAuth is blocked by org policy',
        'Manual entry: guaranteed-to-work path for any meeting'
      ]
    },
    {
      type: 'prose',
      content:
        'Deduped into a single local DB keyed by `(iCalUID, calendarId)`. ContentObserver-debounced refresh on Android calendar changes; cadenced refresh for OAuth + ICS.'
    },
    { type: 'heading', level: 2, text: 'Architectural mandates' },
    { type: 'heading', level: 3, text: 'Never weaken alarm reliability' },
    {
      type: 'prose',
      content:
        '`setExactAndAllowWhileIdle`, boot-completed receivers, battery-optimization onboarding, full-screen-intent permission flow, foreground-service-only-when-needed. Any code change that risks alarm reliability (even theoretically) gets blocked.'
    },
    { type: 'heading', level: 3, text: 'Never store calendar data outside the device' },
    {
      type: 'prose',
      content:
        "No backend. No analytics on event content. Crashlytics carries stack traces and device metadata only, with PII scrubbing on. The user's calendar is the user's, full stop."
    },
    { type: 'heading', level: 3, text: 'iOS shared code from day one' },
    {
      type: 'prose',
      content:
        '`:composeApp:commonMain` already targets iOS. Platform actuals (AlarmManager, CalendarContract, AppAuth) are stubbed via `NotImplementedError("iOS implementation pending: <feature>")`. The iOS build never breaks; it just runs the stubs.'
    },
    { type: 'heading', level: 2, text: 'Stack' },
    {
      type: 'list',
      items: [
        'Kotlin 2.x, Compose Multiplatform + Material 3',
        'Koin DI (KMP-native), Coroutines + Flow',
        'Room 3 KMP via KSP, DataStore Preferences (KMP)',
        'Ktor + Kotlinx Serialization, AppAuth-Android for OAuth',
        'WorkManager (Android), BGTaskScheduler stub (iOS)',
        'Kermit logging with PII scrubbing, Firebase Crashlytics (Android only)'
      ]
    },
    { type: 'heading', level: 2, text: 'Status' },
    {
      type: 'prose',
      content:
        'Android v1 in active development. PRD frozen at v1.2. iOS code already compiles for both targets; platform actuals follow Android ship.'
    }
  ]
};

export default knock;
