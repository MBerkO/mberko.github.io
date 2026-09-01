document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeColorMeta = document.getElementById('theme-color-meta');
    const storageKey = 'theme-preference';
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (theme, persist = true) => {
        htmlElement.setAttribute('data-theme', theme);

        if (persist) {
            localStorage.setItem(storageKey, theme);
        }

        // Update mobile browser chrome color
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
        }

        // Update button accessibility labels
        if (toggleButton) {
            const nextAction = theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç';
            toggleButton.setAttribute('aria-label', nextAction);
            toggleButton.setAttribute('title', nextAction);
        }
    };

    // Synchronize initial state with current theme
    const currentTheme = htmlElement.getAttribute('data-theme') || (mediaQuery.matches ? 'dark' : 'light');
    applyTheme(currentTheme, false);

    // Toggle button click handler
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const activeTheme = htmlElement.getAttribute('data-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme, true);
        });
    }

    // Listen for OS color scheme change if user hasn't chosen manually
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem(storageKey)) {
            applyTheme(e.matches ? 'dark' : 'light', false);
        }
    });
});
