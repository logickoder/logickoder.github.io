// Visitor analytics: PostHog (product analytics, funnels, session replay), enabled
// when NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is set. Loads lazily after hydration.

type Props = Record<string, string | number | boolean | undefined>;

interface PostHogLike {
  capture: (event: string, props?: Props) => void;
}

let posthog: PostHogLike | null = null;
const queue: [string, Props | undefined][] = [];

let started = false;

export async function startAnalytics() {
  if (started || typeof window === 'undefined') return;
  started = true;

  const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (key) {
    const { default: ph } = await import('posthog-js');
    ph.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      capture_pageview: false, // sent on route change below
      capture_pageleave: true,
      autocapture: true,
      persistence: 'localStorage',
      session_recording: { maskAllInputs: true }
    });
    posthog = ph;
  }

  for (const [name, props] of queue.splice(0)) send(name, props);
}

function send(name: string, props?: Props) {
  posthog?.capture(name, props);
}

/** Named event. Queued until analytics has loaded; dropped when there is no token. */
export function track(name: string, props?: Props) {
  if (typeof window === 'undefined') return;
  if (posthog) send(name, props);
  else if (!started || process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) queue.push([name, props]);
}

export function trackPageview(path: string) {
  if (typeof window === 'undefined') return;
  track('$pageview', { path, title: document.title, $current_url: window.location.href });
}
