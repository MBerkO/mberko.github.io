const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeColorMeta = document.getElementById('theme-color-meta');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const updateThemeLabel = (theme) => {
    const label = theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç';
    themeBtn.setAttribute('aria-label', label);
    themeBtn.setAttribute('title', label);
};

const applyTheme = (theme, persist = false) => {
    html.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem('theme-preference', theme);
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    updateThemeLabel(theme);
};

updateThemeLabel(html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

themeBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
});

mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
