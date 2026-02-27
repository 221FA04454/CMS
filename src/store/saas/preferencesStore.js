import { create } from 'zustand';

export const usePreferencesStore = create((set, get) => ({
    preferences: {
        'tenant_1': {
            defaultTheme: 'System', // Light/Dark/System
            defaultLandingPage: 'Dashboard',
            editorConfiguration: 'Advanced',
            autosaveFrequencyMinutes: 5,
            animationSpeed: 'Normal'
        }
    },
    getPreferences: (tenantId) => get().preferences[tenantId] || { defaultTheme: 'System', defaultLandingPage: 'Dashboard', editorConfiguration: 'Advanced', autosaveFrequencyMinutes: 5, animationSpeed: 'Normal' },
    updatePreferences: (tenantId, data) => set((state) => ({
        preferences: {
            ...state.preferences,
            [tenantId]: { ...state.preferences[tenantId], ...data }
        }
    }))
}));
