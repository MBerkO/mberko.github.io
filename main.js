const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const langBtn = document.getElementById('lang-toggle');
const themeColorMeta = document.getElementById('theme-color-meta');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const labeledElements = document.querySelectorAll('[data-aria-tr]');

const themeLabels = {
    tr: { dark: 'Açık temaya geç', light: 'Koyu temaya geç' },
    en: { dark: 'Switch to light theme', light: 'Switch to dark theme' }
};

const updateThemeLabel = () => {
    const theme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const lang = html.getAttribute('lang') === 'en' ? 'en' : 'tr';
    const label = themeLabels[lang][theme];
    themeBtn.setAttribute('aria-label', label);
    themeBtn.setAttribute('title', label);
};

const applyTheme = (theme, persist = false) => {
    html.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem('theme-preference', theme);
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    updateThemeLabel();
};

const applyLanguage = (lang, persist = false) => {
    html.setAttribute('lang', lang);
    if (persist) localStorage.setItem('lang-preference', lang);
    labeledElements.forEach((el) => {
        const label = el.getAttribute(`data-aria-${lang}`);
        el.setAttribute('aria-label', label);
        if (el.hasAttribute('title')) el.setAttribute('title', label);
    });
    updateThemeLabel();
};

// Sync initial state set by inline head script
applyLanguage(html.getAttribute('lang') === 'en' ? 'en' : 'tr');

themeBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
});

langBtn.addEventListener('click', () => {
    applyLanguage(html.getAttribute('lang') === 'en' ? 'tr' : 'en', true);
});

mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
