import { create } from 'zustand';

export const useSecurityStore = create((set, get) => ({
    securitySettings: {
        'tenant_1': {
            enforce2FA: false,
            sessionTimeoutMinutes: 60,
            passwordResetEnforcementDays: 90,
            ipAllowlist: ''
        }
    },
    loginActivities: {
        'tenant_1': [
            { id: 'l1', timestamp: new Date(Date.now() - 3600000).toISOString(), location: 'San Francisco, US', ip: '192.168.1.1', device: 'Chrome on macOS', status: 'Success' },
            { id: 'l2', timestamp: new Date(Date.now() - 86400000).toISOString(), location: 'London, UK', ip: '10.0.0.5', device: 'Safari on iOS', status: 'Failed' }
        ]
    },
    getSecuritySettings: (tenantId) => get().securitySettings[tenantId] || { enforce2FA: false, sessionTimeoutMinutes: 60, passwordResetEnforcementDays: 90, ipAllowlist: '' },
    updateSecuritySettings: (tenantId, data) => set((state) => ({
        securitySettings: {
            ...state.securitySettings,
            [tenantId]: { ...state.securitySettings[tenantId], ...data }
        }
    })),
    getLoginActivities: (tenantId) => get().loginActivities[tenantId] || [],
    forceLogoutAll: (tenantId) => {
        console.log(`Forced logout all devices for tenant ${tenantId}`);
    }
}));
