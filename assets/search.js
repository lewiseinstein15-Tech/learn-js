/**
 * CS Hub — Global Search
 * Press Ctrl+K (or Cmd+K) to open. Searches pages, sections, and tools.
 */
(function() {
  'use strict';

  // Search index — all pages and their content
  var SEARCH_INDEX = [
    { title: 'Home',           url: './',              keywords: 'home landing hub main', section: 'Pages' },
    { title: 'Math',           url: './math/',          keywords: 'math mathematics factorial permutation calculator discrete structures algorithms', section: 'Pages' },
    { title: 'Calculator',     url: './math/calculator/', keywords: 'calculator arithmetic add subtract multiply divide keyboard', section: 'Math' },
    { title: 'Permutation Counter', url: './math/permutation/', keywords: 'permutation factorial counter letter word distinct n', section: 'Math' },
    { title: 'Physics',        url: './physics/',       keywords: 'physics projectile motion simulation canvas angle velocity gravity launch', section: 'Pages' },
    { title: 'Games',          url: './games/',         keywords: 'games play fun guess hangman tic tac toe', section: 'Pages' },
    { title: 'Guess It',       url: './games/guessgame/', keywords: 'guess game digits random numbers score win lose', section: 'Games' },
    { title: 'Projects',       url: './mini-projects/', keywords: 'projects mini todo calculator full stack backend', section: 'Pages' },
    { title: 'Calculator (Mini)', url: './mini-projects/calculator/', keywords: 'calculator keyboard phone math operations', section: 'Projects' },
    { title: 'Todo List',      url: './mini-projects/todo/', keywords: 'todo list tasks backend express node api full stack', section: 'Projects' },
    { title: 'GitHub',         url: 'https://github.com/lewiseinstein15-Tech/learn-js', keywords: 'github repo source code contribute pull request', section: 'Links' },
  ];

  // Determine relative path prefix based on current page depth
  function getPrefix() {
    var path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('index.html')) {
      path = path.replace(/index\.html$/, '');
    }
    // Count depth: / = 0, /math/ = 1, /math/calculator/ = 2
    var parts = path.split('/').filter(Boolean);
    var depth = parts.length;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    return prefix || './';
  }

  function normalizeUrl(url) {
    if (url.startsWith('http')) return url;
    return getPrefix() + url.replace(/^\.\//, '');
  }

  // Build search UI
  function createOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.innerHTML =
      '<div class="search-backdrop"></div>' +
      '<div class="search-modal">' +
        '<div class="search-input-wrap">' +
          '<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
          '<input type="text" id="search-input" placeholder="Search pages, tools, sections..." autocomplete="off" maxlength="100" autofocus>' +
          '<kbd class="search-kbd">esc</kbd>' +
        '</div>' +
        '<div class="search-results" id="search-results"></div>' +
        '<div class="search-footer">' +
          '<span><kbd>↑↓</kbd> Navigate</span>' +
          '<span><kbd>↵</kbd> Open</span>' +
          '<span><kbd>esc</kbd> Close</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    // Event listeners
    var input = document.getElementById('search-input');
    var results = document.getElementById('search-results');
    var selected = 0;

    input.addEventListener('input', function() {
      var query = input.value.trim().toLowerCase();
      selected = 0;
      if (!query) {
        results.innerHTML = '<div class="search-empty">Type to search across the site...</div>';
        return;
      }
      var matches = SEARCH_INDEX.filter(function(item) {
        return item.title.toLowerCase().indexOf(query) !== -1 ||
               item.keywords.toLowerCase().indexOf(query) !== -1;
      });
      if (matches.length === 0) {
        results.innerHTML = '<div class="search-empty">No results for "' + (window.csHub ? csHub.escapeHtml(query) : query) + '"</div>';
        return;
      }
      results.innerHTML = matches.map(function(item, i) {
        return '<a href="' + normalizeUrl(item.url) + '" class="search-result' + (i === 0 ? ' selected' : '') + '">' +
          '<span class="search-result-section">' + item.section + '</span>' +
          '<span class="search-result-title">' + item.title + '</span>' +
          '<span class="search-result-arrow">↵</span>' +
        '</a>';
      }).join('');
    });

    // Keyboard navigation
    input.addEventListener('keydown', function(e) {
      var items = results.querySelectorAll('.search-result');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selected = Math.min(selected + 1, items.length - 1);
        updateSelection(items, selected);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selected = Math.max(selected - 1, 0);
        updateSelection(items, selected);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[selected]) items[selected].click();
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    });

    // Close on backdrop click
    overlay.querySelector('.search-backdrop').addEventListener('click', closeSearch);

    // Trigger initial search
    input.dispatchEvent(new Event('input'));
  }

  function updateSelection(items, idx) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('selected', i === idx);
    }
    if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
  }

  function openSearch() {
    var overlay = document.getElementById('search-overlay');
    if (!overlay) createOverlay();
    overlay = document.getElementById('search-overlay');
    overlay.classList.add('open');
    var input = document.getElementById('search-input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    setTimeout(function() { input.focus(); }, 50);
  }

  function closeSearch() {
    var overlay = document.getElementById('search-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Expose for nav button
  csHub = window.csHub || {};
  csHub.openSearch = openSearch;
  csHub.closeSearch = closeSearch;

})();
