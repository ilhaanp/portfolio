// Theme Toggle (Light / Dark Mode)
(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const themeToggle = document.getElementById('theme-toggle');

  // Determine initial theme: saved preference or system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Toggle button event handler
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
    });
  }
})();

