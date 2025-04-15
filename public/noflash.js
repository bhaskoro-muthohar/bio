// Optimized version for Bhaskoro Muthohar's website
// Prevents flash on theme toggle and preloads critical resources
(function () {
  // Change these if you use something different in your hook.
  var storageKey = 'darkMode';
  var classNameDark = 'dark-mode';
  var classNameLight = 'light-mode';

  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
  }

  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) { }
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }

  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
  
  // Preload critical resources
  if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
      var resources = [
        "/bhaskoro-muthohar-profile.jpeg",
        "/favicon.ico",
        "/bg.png"
      ];
      
      resources.forEach(function(url) {
        var link = document.createElement('link');
        link.rel = 'preload';
        link.as = url.endsWith('.jpeg') || url.endsWith('.png') ? 'image' : 'fetch';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }
})();