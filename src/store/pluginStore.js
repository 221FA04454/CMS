import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { registerDynamicComponent } from '../components/registry';

/**
 * Enterprise Plugin Store
 * Manages the lifecycle of custom components and extensions
 */
export const usePluginStore = create(
    persist(
        immer((set, get) => ({
            installedPlugins: [],
            availablePlugins: [],
            loading: false,
            lastInstalledAt: null,

            // --- MARKETPLACE ACTIONS ---
            fetchMarketplace: async () => {
                set((state) => { state.loading = true; });
                
                // Simulate API call to fetch available plugins
                setTimeout(() => {
                    set((state) => {
                        state.availablePlugins = [
                            {
                                pluginId: 'flexi-carousel',
                                name: 'Carousel Slider',
                                version: '1.0.0',
                                description: 'A highly customizable image carousel.',
                                category: 'Media',
                                author: 'Flexi Team',
                                bundle: '/plugins/carousel.bundle.js',
                                thumbnail: 'https://images.unsplash.com/photo-1542382257-80da9fb9f5f5?auto=format&fit=crop&q=80&w=400',
                                downloads: 12400
                            },
                            {
                                pluginId: 'stripe-checkout',
                                name: 'Stripe Pay Button',
                                version: '2.1.0',
                                description: 'Instant checkout button for Stripe.',
                                category: 'E-commerce',
                                author: 'Fintech Corp',
                                bundle: '/plugins/stripe.bundle.js',
                                thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400',
                                downloads: 45000
                            },
                            {
                                pluginId: 'advanced-forms',
                                name: 'Dynamic Forms Pro',
                                version: '3.0.1',
                                description: 'Multi-step forms with logic branching.',
                                category: 'Forms',
                                author: 'FormBuilders',
                                bundle: '/plugins/forms.bundle.js',
                                thumbnail: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400',
                                downloads: 8900
                            },
                            {
                                pluginId: 'chartjs-dash',
                                name: 'Chart.js Blocks',
                                version: '1.5.0',
                                description: 'Embed beautiful interactive charts.',
                                category: 'Charts',
                                author: 'DataViz',
                                bundle: '/plugins/charts.bundle.js',
                                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
                                downloads: 3200
                            }
                        ];
                        state.loading = false;
                    });
                }, 1000);
            },

            // --- ACTIONS ---

            installPlugin: async (pluginId) => {
                // Find plugin in marketplace
                const plugin = get().availablePlugins.find(p => p.pluginId === pluginId);
                if (!plugin) return;

                // 1. Prevent Duplicates
                if (get().installedPlugins.some(p => p.pluginId === pluginId)) return;

                // Simulate metadata fetch for manifest
                await new Promise(resolve => setTimeout(resolve, 800));

                const manifest = {
                    ...plugin,
                    installId: `${plugin.pluginId}-${Date.now()}`,
                    components: [
                        {
                            id: `${plugin.pluginId}-comp-1`,
                            type: `${plugin.name.replace(/\s+/g, '')}`, // e.g. "CarouselSlider"
                            displayName: plugin.name,
                            category: plugin.category,
                            bundle: plugin.bundle,
                            props: {}
                        }
                    ]
                };

                // 2. Register with Store
                set((state) => {
                    state.installedPlugins.push({
                        ...manifest,
                        installedAt: Date.now()
                    });
                    state.lastInstalledAt = Date.now();
                });

                // 3. Register Components Dynamically
                if (manifest.components) {
                    manifest.components.forEach(comp => {
                        // Dynamically mock the component registry item for now (sandbox implementation)
                        const compDef = {
                            component: () => null, // Placeholder function (not JSX to avoid parser issues in a .js file)
                            label: comp.displayName,
                            category: 'plugins',
                            defaultProps: comp.props,
                            propSchema: {}
                        };
                        registerDynamicComponent(comp.type, compDef);
                    });
                }

                console.log(`Plugin ${manifest.name} installed successfully.`);
                
                // Load bundle
                get().loadPluginBundle(manifest);
            },

            removePlugin: (pluginId) => set((state) => {
                state.installedPlugins = state.installedPlugins.filter(p => p.pluginId !== pluginId);
                // Note: Unregistering components from the registry logic
                // would go here (requires registry to support removal)
            }),

            uninstallPlugin: (pluginId) => {
                // Alias for removePlugin
                get().removePlugin(pluginId);
            },

            isPluginInstalled: (id) => !!get().installedPlugins.find(p => p.pluginId === id),

            loadPluginBundle: (manifest) => {
                // Sandbox Loader Simulator
                console.log(`[Plugin Loader] Fetching bundle for ${manifest.pluginId} from ${manifest.bundle}`);
                
                setTimeout(() => {
                    console.log(`[Plugin Sandbox] Evaluating module ${manifest.pluginId}`);
                    // Note: In real life this would fetch JS and eval.
                    // Registration already handled mock-wise during install.
                }, 500);
            },

            refreshPlugins: () => {
                get().fetchMarketplace();
            }
        })),
        { name: 'flexisite-plugin-store-v1' }
    )
);
