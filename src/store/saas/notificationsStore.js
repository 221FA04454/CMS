import { create } from 'zustand';

export const useNotificationsStore = create((set, get) => ({
    notificationSettings: {
        'tenant_1': {
            emailNotifications: true,
            webhookNotifications: false,
            slackIntegration: true,
            deploymentFailureAlerts: true,
            domainIssuesAlerts: true,
            analyticsSpikesAlerts: false,
            webhookUrl: '',
            slackChannel: '#alerts'
        }
    },
    getSettings: (tenantId) => get().notificationSettings[tenantId] || {
        emailNotifications: true, webhookNotifications: false, slackIntegration: false,
        deploymentFailureAlerts: true, domainIssuesAlerts: true, analyticsSpikesAlerts: false,
        webhookUrl: '', slackChannel: ''
    },
    updateSettings: (tenantId, data) => set((state) => ({
        notificationSettings: {
            ...state.notificationSettings,
            [tenantId]: { ...state.notificationSettings[tenantId], ...data }
        }
    }))
}));
