import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';

/**
 * FlexiSite SaaS & Deployment Store (Enterprise v2.1)
 * Manages Multi-tenancy, Domains, API Infrastructure, and Usage Tracking
 */
export const useSaaSStore = create(
    persist(
        immer((set) => ({
            // Current Context
            activeTenantId: 'tenant_default',
            currentUserRole: 'owner', // 'owner' | 'admin' | 'editor' | 'viewer'

            // --- DATA MODELS ---
            
            tenants: {
                'tenant_default': {
                    id: 'tenant_default',
                    name: 'Main Workspace',
                    ownerId: 'user_001',
                    plan: 'pro', // 'free' | 'pro' | 'enterprise'
                    createdAt: Date.now(),
                    
                    // Governance
                    users: [
                        { id: 'user_001', name: 'Admin User', role: 'owner', email: 'admin@flexisite.app' }
                    ],

                    // API Infrastructure
                    apiKeys: [
                        { 
                            id: 'key_1', 
                            value: 'fs_live_a7f92b882c91', 
                            permissions: ['read_project', 'publish_build', 'read_analytics'], 
                            status: 'active',
                            createdAt: Date.now() - 86400000 * 5,
                            lastUsed: Date.now() - 3600000
                        }
                    ],

                    // Domain Infrastructure
                    domains: [
                        { 
                            domain: 'flexisite.app', 
                            status: 'verified', 
                            sslStatus: 'active',
                            dnsRecords: { type: 'CNAME', target: 'cname.flexisite.cdn' },
                            verifiedAt: Date.now() - 86400000 * 10 
                        }
                    ],

                    // Deployment Lifecycle
                    deployments: [
                        { 
                            id: 'build_102', 
                            version: '1.2.4', 
                            date: Date.now() - 3600000, 
                            status: 'success', 
                            size: '1.4MB',
                            url: 'https://v1-2-4.flexisite.cdn' 
                        }
                    ],

                    // Usage & Quotas
                    usage: {
                        eventsThisMonth: 12450,
                        buildsThisMonth: 14,
                        bandwidthUsed: '2.4GB',
                        storageUsed: '145MB'
                    },
                    limits: {
                        pages: 100,
                        sites: 5,
                        analyticsQuota: 50000,
                        buildsPerMonth: 50
                    },

                    // Integration & Hooks
                    webhooks: [
                        { id: 'wh_1', url: 'https://api.edumon.com/hooks/flexisite', events: ['publish'], status: 'active' }
                    ],

                    // Audit Logs
                    logs: [
                        { id: 'log_1', type: 'system', message: 'Project Published: Build #102', timestamp: Date.now() - 3600000 },
                        { id: 'log_2', type: 'security', message: 'New API Key Generated', timestamp: Date.now() - 86400000 }
                    ]
                }
            },

            // --- ACTIONS ---

            createTenant: (name) => set((state) => {
                const id = `tenant_${nanoid(6)}`;
                state.tenants[id] = {
                    id,
                    name,
                    plan: 'free',
                    users: [],
                    apiKeys: [],
                    domains: [],
                    deployments: [],
                    usage: { eventsThisMonth: 0, buildsThisMonth: 0, bandwidthUsed: '0GB', storageUsed: '0MB' },
                    limits: { pages: 10, sites: 1, analyticsQuota: 5000, buildsPerMonth: 10 },
                    webhooks: [],
                    logs: [{ id: nanoid(4), type: 'system', message: 'Tenant Created', timestamp: Date.now() }]
                };
            }),

            switchTenant: (id) => set((state) => {
                state.activeTenantId = id;
            }),

            createApiKey: (permissions) => set((state) => {
                const tenant = state.tenants[state.activeTenantId];
                if (tenant) {
                    tenant.apiKeys.push({
                        id: nanoid(6),
                        value: `fs_live_${nanoid(16)}`,
                        permissions: permissions || ['read_project'],
                        status: 'active',
                        createdAt: Date.now()
                    });
                    tenant.logs.unshift({ id: nanoid(4), type: 'security', message: 'API Key Created', timestamp: Date.now() });
                }
            }),

            revokeApiKey: (keyId) => set((state) => {
                const tenant = state.tenants[state.activeTenantId];
                if (tenant) {
                    const key = tenant.apiKeys.find(k => k.id === keyId);
                    if (key) key.status = 'revoked';
                    tenant.logs.unshift({ id: nanoid(4), type: 'security', message: `API Key Revoked: ${keyId}`, timestamp: Date.now() });
                }
            }),

            addDomain: (domain) => set((state) => {
                const tenant = state.tenants[state.activeTenantId];
                if (tenant) {
                    tenant.domains.push({
                        domain,
                        status: 'pending',
                        sslStatus: 'pending',
                        dnsRecords: { type: 'CNAME', target: 'cname.flexisite.cdn' }
                    });
                    tenant.logs.unshift({ id: nanoid(4), type: 'system', message: `Domain Added: ${domain}`, timestamp: Date.now() });
                }
            }),

            verifyDomain: (domainName) => set((state) => {
                const tenant = state.tenants[state.activeTenantId];
                if (tenant) {
                    const domain = tenant.domains.find(d => d.domain === domainName);
                    if (domain) {
                        domain.status = 'verified';
                        domain.sslStatus = 'active';
                        domain.verifiedAt = Date.now();
                    }
                }
            }),

            recordBuild: (buildInfo) => set((state) => {
                const tenant = state.tenants[state.activeTenantId];
                if (tenant) {
                    tenant.deployments.unshift({
                        id: `build_${Date.now()}`,
                        ...buildInfo,
                        date: Date.now(),
                        status: 'success'
                    });
                    tenant.usage.buildsThisMonth += 1;
                    tenant.logs.unshift({ id: nanoid(4), type: 'system', message: `Build Success: ${buildInfo.version}`, timestamp: Date.now() });
                }
            }),

            rollbackToBuild: (buildId) => set((state) => {
                const tenant = state.tenants[state.activeTenantId];
                if (tenant) {
                    const build = tenant.deployments.find(b => b.id === buildId);
                    if (build) {
                        // In production, this would update the CDN pointers
                        tenant.logs.unshift({ id: nanoid(4), type: 'system', message: `Rollback triggered to ${buildId}`, timestamp: Date.now() });
                    }
                }
            })
        })),
        { name: 'flexisite-saas-store-v2' }
    )
);
