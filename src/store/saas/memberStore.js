import { create } from 'zustand';

export const useMemberStore = create((set, get) => ({
    members: {
        'tenant_1': [
            { userId: 'u1', tenantId: 'tenant_1', name: 'Alice Admin', email: 'alice@acme.com', role: 'owner', status: 'active', invitedAt: '2023-01-01', joinedAt: '2023-01-02' },
            { userId: 'u2', tenantId: 'tenant_1', name: 'Bob Editor', email: 'bob@acme.com', role: 'editor', status: 'invited', invitedAt: '2023-06-01', joinedAt: null }
        ]
    },
    getMembers: (tenantId) => get().members[tenantId] || [],
    inviteMember: (tenantId, memberData) => set((state) => {
        const tenantMembers = state.members[tenantId] || [];
        return {
            members: {
                ...state.members,
                [tenantId]: [...tenantMembers, { ...memberData, status: 'invited', invitedAt: new Date().toISOString() }]
            }
        };
    }),
    updateRole: (tenantId, userId, newRole) => set((state) => {
        const tenantMembers = state.members[tenantId] || [];
        return {
            members: {
                ...state.members,
                [tenantId]: tenantMembers.map(m => m.userId === userId ? { ...m, role: newRole } : m)
            }
        };
    }),
    removeMember: (tenantId, userId) => set((state) => {
        const tenantMembers = state.members[tenantId] || [];
        return {
            members: {
                ...state.members,
                [tenantId]: tenantMembers.filter(m => m.userId !== userId)
            }
        };
    })
}));
