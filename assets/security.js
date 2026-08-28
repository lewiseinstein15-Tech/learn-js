/**
 * CS Hub — Security utilities
 * Input sanitization, rate limiting, and XSS prevention.
 * Loaded on every page before other scripts.
 */
(function() {
  'use strict';

  // --- XSS Prevention ---
  // Escape HTML entities to prevent injection via innerHTML
  var entityMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '/': '&#x2F;' };

  window.csHub = window.csHub || {};

  csHub.escapeHtml = function(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"'/]/g, function(s) { return entityMap[s]; });
  };

  // --- Input Sanitization ---
  // Strip anything that isn't alphanumeric, spaces, or basic punctuation
  csHub.sanitizeInput = function(str, maxLength) {
    if (typeof str !== 'string') return '';
    maxLength = maxLength || 200;
    return str
      .replace(/[<>"'`;\\]/g, '')  // strip dangerous chars
      .trim()
      .slice(0, maxLength);        // enforce max length
  };

  // Only allow digits and math operators (for calculator)
  csHub.sanitizeMath = function(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[^0-9+\-*/.() ]/g, '').slice(0, 50);
  };

  // Only allow letters (for permutation tool)
  csHub.sanitizeLetters = function(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[^a-zA-Z]/g, '').slice(0, 20);
  };

  // --- Rate Limiting ---
  // Prevent rapid-fire clicks / submissions
  var rateLimits = {};

  csHub.rateLimit = function(key, delayMs) {
    delayMs = delayMs || 500;
    var now = Date.now();
    if (rateLimits[key] && (now - rateLimits[key]) < delayMs) {
      return false; // blocked
    }
    rateLimits[key] = now;
    return true; // allowed
  };

  // --- Secure Link Handler ---
  // Add rel="noopener noreferrer" to external links
  document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('a[target="_blank"]');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var rel = link.getAttribute('rel') || '';
      if (rel.indexOf('noopener') === -1) {
        link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
      }
    }
  });

  // --- Console warning ---
  console.log('%c⚠️ CS Hub Security', 'color: #c44d2b; font-weight: bold; font-size: 14px;');
  console.log('%cThis is a student project. Do not enter sensitive data.', 'color: #7a7268;');

})();
