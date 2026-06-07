import type { CaseStudy } from './types';

const appstorys: CaseStudy = {
  slug: 'appstorys-sdk',
  title: 'AppStorys SDK',
  tagline: 'UI analytics across XML View hierarchies and Compose SemanticsNode trees',
  year: 2025,
  role: 'Senior mobile engineer',
  status: 'shipped',
  tech: ['Android', 'Kotlin', 'Jetpack Compose', 'Flutter', 'React Native', 'Reflection'],
  links: [
    { label: 'GitHub (Android)', href: 'https://github.com/appversal/AppStorys-Android-SDK' },
    { label: 'Live product', href: 'https://appstorys.com/' }
  ],
  summary:
    'A unified analytics SDK shipped for Android, Flutter, and React Native that captures runtime view-tree metadata without instrumenting host apps. Combines XML View hierarchy traversal with Compose SemanticsNode traversal so the same SDK works across legacy and modern UI on the same screen.',
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        'Most analytics SDKs require explicit instrumentation — wrapping components, tagging IDs, adding lifecycle observers. That falls apart in mixed UI stacks where the host app is half legacy `View`s, half Compose, with Flutter or React Native widget layers on top. Each rendering tree exposes a different traversal API. There is no one runtime API that maps cleanly across all of them.'
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        "Bridge from each platform's introspection primitives to a single normalized event schema, with zero host-app instrumentation. The SDK attaches to lifecycle events and walks whatever tree exists at that moment — `ViewGroup` children, Compose `SemanticsNode`s, Flutter widget metadata exposed via platform channels, React Native UIManager nodes."
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'Reflection-based XML View capture' },
    {
      type: 'prose',
      content:
        'Standard `ViewGroup.getChildAt(i)` returns the children but loses content data attached to custom views. Reflection on private fields surfaces the actual rendered content — text, image URIs, accessibility labels — without breaking when host apps subclass.'
    },
    { type: 'heading', level: 3, text: 'Compose SemanticsNode traversal' },
    {
      type: 'prose',
      content:
        'Compose ships an accessibility-first semantics tree (`SemanticsNode`) that exposes content descriptions, test tags, and roles without holding references to internal recomposition state. The SDK walks it via the same shape as the XML tree so downstream event schema stays identical.'
    },
    { type: 'heading', level: 3, text: 'Cross-platform consistency' },
    {
      type: 'prose',
      content:
        'The Android implementation is the reference. Flutter and React Native ports emit the same event payload by mapping their native introspection APIs into the same normalized shape — so a Flutter screen and a Compose screen produce events the backend treats identically.'
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        'Shipped Android + Flutter + React Native SDKs with a single event schema',
        'No host-app instrumentation required — drop-in initialization',
        'Captures content metadata across both legacy `View` and Compose trees on the same screen, which previously required two separate analytics integrations'
      ]
    }
  ]
};

export default appstorys;
