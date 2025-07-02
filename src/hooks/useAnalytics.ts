import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

export default function useAnalytics() {
  function trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (analytics) {
      logEvent(analytics, eventName, parameters);
    }
  }

  function trackPageView(pageName: string) {
    trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  }

  function trackNavigation(section: string) {
    trackEvent('navigate_to_section', {
      section_name: section,
      timestamp: new Date().toISOString()
    });
  }

  function trackProjectView(projectName: string) {
    trackEvent('project_viewed', {
      project_name: projectName,
      view_type: 'details'
    });
  }

  function trackExternalLink(linkType: string, destination: string) {
    trackEvent('external_link_click', {
      link_type: linkType,
      destination: destination,
      source_page: 'portfolio'
    });
  }

  function trackFormSubmission(formType: string) {
    trackEvent('form_submission', {
      form_type: formType,
      timestamp: new Date().toISOString()
    });
  }

  function trackBlogPostClick(postTitle: string) {
    trackEvent('blog_post_click', {
      post_title: postTitle,
      source: 'portfolio_blog_section'
    });
  }

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
