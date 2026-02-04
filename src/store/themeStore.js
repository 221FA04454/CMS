import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const DEFAULT_THEME = {
    id: 'default_dark_pro',
    name: 'Flexi Dark Pro',
    tokens: {
        colors: {
            primary: '#6366f1', // Indigo 500
            secondary: '#ec4899', // Pink 500
            accent: '#f59e0b', // Amber 500
            background: '#0f172a', // Slate 900
            surface: '#1e293b', // Slate 800
            border: '#334155', // Slate 700
            text: '#f8fafc', // Slate 50
            textMuted: '#94a3b8' // Slate 400
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
            h1: { size: '48px', weight: '800' },
            h2: { size: '36px', weight: '700' },
            body: { size: '16px', weight: '400' }
        },
        scale: {
            radiusSm: '6px',
            radiusMd: '12px',
            radiusLg: '24px',
            spacingSm: '8px',
            spacingMd: '16px',
            spacingLg: '32px'
        }
    }
};

/**
 * Enterprise Theme Store
 * Manages global tokens and theme switching
 */
export const useThemeStore = create(
    persist(
        immer((set, get) => ({
            activeThemeId: 'default_dark_pro',
            themes: {
                [DEFAULT_THEME.id]: DEFAULT_THEME
            },

            // --- ACTIONS ---

            createTheme: (name) => set((state) => {
                const id = `theme_${Date.now()}`;
                state.themes[id] = {
                    ...state.themes[state.activeThemeId],
                    id,
                    name
                };
                state.activeThemeId = id;
            }),

            applyTheme: (themeId) => set((state) => {
                if (state.themes[themeId]) {
                    state.activeThemeId = themeId;
                    // Trigger CSS variable sync
                    const tokens = state.themes[themeId].tokens;
                    syncCSSVariables(tokens);
                }
            }),

            updateToken: (category, key, value) => set((state) => {
                const activeTheme = state.themes[state.activeThemeId];
                if (activeTheme && activeTheme.tokens[category]) {
                    activeTheme.tokens[category][key] = value;
                    syncCSSVariables(activeTheme.tokens);
                }
            }),

            exportTheme: () => {
                const theme = get().themes[get().activeThemeId];
                const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `flexisite_theme_${theme.name.toLowerCase().replace(/ /g, '_')}.json`;
                a.click();
            }
        })),
        { name: 'flexisite-theme-engine-v1' }
    )
);

/**
 * Utility: Injects theme tokens into :root as CSS variables
 * This allows real-time UI updates without re-rendering every React node.
 */
export const syncCSSVariables = (tokens) => {
    const root = document.documentElement;
    
    // Colors
    Object.entries(tokens.colors).forEach(([key, val]) => {
        root.style.setProperty(`--fs-color-${key}`, val);
    });

    // Typography
    root.style.setProperty('--fs-font-main', tokens.typography.fontFamily);
    root.style.setProperty('--fs-h1-size', tokens.typography.h1.size);
    root.style.setProperty('--fs-h2-size', tokens.typography.h2.size);

    // Scales
    Object.entries(tokens.scale).forEach(([key, val]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(`--fs-${cssKey}`, val);
    });
};
