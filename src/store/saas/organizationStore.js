import { create } from 'zustand';

export const useOrganizationStore = create((set, get) => ({
    organizations: {
        'tenant_1': {
            tenantId: 'tenant_1',
            name: 'Acme Corp',
            description: 'Global SaaS Provider',
            industry: 'Technology',
            contactEmail: 'admin@acmecorp.com',
            locale: 'en-US',
            timezone: 'America/Los_Angeles',
            dateFormat: 'MM/DD/YYYY',
            branding: {
                logoUrl: 'https://ui-avatars.com/api/?name=AC&background=0D8ABC&color=fff',
                faviconUrl: '',
                primaryColor: '#4f46e5',
                secondaryColor: '#10b981',
                themeMode: 'system' // Light / Dark / System
            }
        }
    },
    getOrganization: (tenantId) => get().organizations[tenantId],
    updateOrganization: (tenantId, data) => set((state) => ({
        organizations: {
            ...state.organizations,
            [tenantId]: {
                ...state.organizations[tenantId],
                ...data
            }
        }
    })),
    updateBranding: (tenantId, brandingData) => set((state) => ({
        organizations: {
            ...state.organizations,
            [tenantId]: {
                ...state.organizations[tenantId],
                branding: {
                    ...state.organizations[tenantId]?.branding,
                    ...brandingData
                }
            }
        }
    }))
}));
