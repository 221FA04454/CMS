import { create } from 'zustand';

export const useAuditStore = create((set, get) => ({
    auditLogs: {
        'tenant_1': [
            { logId: 'a1', tenantId: 'tenant_1', userId: 'u1', userName: 'Alice Admin', action: 'Login Settings Updated', category: 'security', metadata: '{ "2FA": true }', ip: '192.168.1.1', device: 'Chrome on macOS', timestamp: new Date(Date.now() - 5000000).toISOString() },
            { logId: 'a2', tenantId: 'tenant_1', userId: 'u1', userName: 'Alice Admin', action: 'Member Invited', category: 'member', metadata: '{ "email": "bob@acme.com" }', ip: '192.168.1.1', device: 'Chrome on macOS', timestamp: new Date(Date.now() - 86400000).toISOString() }
        ]
    },
    getAuditLogs: (tenantId) => get().auditLogs[tenantId] || [],
    addAuditLog: (tenantId, log) => set((state) => {
        const logs = state.auditLogs[tenantId] || [];
        return {
            auditLogs: {
                ...state.auditLogs,
                [tenantId]: [{
                    logId: `log_${Date.now()}`,
                    tenantId,
                    timestamp: new Date().toISOString(),
                    ...log
                }, ...logs]
            }
        };
    })
}));
