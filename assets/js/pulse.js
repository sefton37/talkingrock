// Pulse — cookieless analytics beacon for talkingrock.ai
// Collects only what's needed to keep the site healthy.
// No cookies. No fingerprints. No cross-session identification.
// Source: https://github.com/talkingrock/talkingrock.ai
(function() {
  var endpoint = '/api/pulse';
  var vw = window.innerWidth;
  var bucket = vw < 768 ? 'mobile' : vw < 1024 ? 'tablet' : 'desktop';
  var perf = performance.getEntriesByType('navigation')[0];

  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: location.pathname,
      referrer: document.referrer ? new URL(document.referrer).hostname : null,
      viewport: bucket,
      loadTime: perf ? Math.round(perf.loadEventEnd - perf.startTime) : null,
      timestamp: new Date().toISOString()
    }),
    keepalive: true
  }).catch(function() {});
})();
