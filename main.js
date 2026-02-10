document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const storageKey = 'theme-preference';

    // Helper to set theme
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem(storageKey, theme);
    };

    // 1. Check storage, 2. Check system preference
    const savedTheme = localStorage.getItem(storageKey);
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // Apply initial theme
    htmlElement.setAttribute('data-theme', savedTheme || systemPreference);

    // Toggle click handler
    toggleButton.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Listen for system changes (only if no user override)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(storageKey)) {
            htmlElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
});
