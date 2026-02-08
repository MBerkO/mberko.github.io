document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const storageKey = 'theme-preference';

    // 1. Check for saved user preference
    const savedTheme = localStorage.getItem(storageKey);
    // 2. Check for system preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // Set initial theme
    const currentTheme = savedTheme || systemPreference;
    htmlElement.setAttribute('data-theme', currentTheme);

    // Toggle logic
    toggleButton.addEventListener('click', () => {
        const existingTheme = htmlElement.getAttribute('data-theme');
        const newTheme = existingTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(storageKey, newTheme);
    });

    // Optional: Listen for system changes if no override is set
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(storageKey)) {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newSystemTheme);
        }
    });
});
