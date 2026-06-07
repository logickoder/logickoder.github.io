import { logEvent } from 'firebase/analytics';
import { useCallback } from 'react';
import { analytics } from '../config/firebase';

export default function useAnalytics() {
  const trackEvent = useCallback(
    (eventName: string, parameters?: Record<string, unknown>) => {
      if (analytics) {
        logEvent(analytics, eventName, parameters);
      }
    },
    []
  );

  const trackPageView = useCallback(
    (pageName: string) => {
      trackEvent('page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    },
    [trackEvent]
  );

  const trackNavigation = useCallback(
    (section: string) => {
      trackEvent('navigate_to_section', {
        section_name: section,
        timestamp: new Date().toISOString()
      });
    },
    [trackEvent]
  );

  const trackProjectView = useCallback(
    (projectName: string) => {
      trackEvent('project_viewed', {
        project_name: projectName,
        view_type: 'details'
      });
    },
    [trackEvent]
  );

  const trackExternalLink = useCallback(
    (linkType: string, destination: string) => {
      trackEvent('external_link_click', {
        link_type: linkType,
        destination,
        source_page: 'portfolio'
      });
    },
    [trackEvent]
  );

  const trackFormSubmission = useCallback(
    (formType: string) => {
      trackEvent('form_submission', {
        form_type: formType,
        timestamp: new Date().toISOString()
      });
    },
    [trackEvent]
  );

  const trackBlogPostClick = useCallback(
    (postTitle: string) => {
      trackEvent('blog_post_click', {
        post_title: postTitle,
        source: 'portfolio_blog_section'
      });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackPageView,
    trackNavigation,
    trackProjectView,
    trackExternalLink,
    trackFormSubmission,
    trackBlogPostClick
  };
}
