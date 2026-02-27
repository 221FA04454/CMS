import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Puzzle, ArrowRight, PackageOpen } from 'lucide-react';
import { usePluginStore } from '../../store/pluginStore';
import PluginCard from '../../components/saas/plugins/PluginCard';
import PluginCategoryFilter from '../../components/saas/plugins/PluginCategoryFilter';
import PluginDetailsModal from '../../components/saas/plugins/PluginDetailsModal';

const PluginsPage = () => {
    const { availablePlugins, installedPlugins, loading, fetchMarketplace, installPlugin } = usePluginStore();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    useEffect(() => {
        fetchMarketplace();
    }, []);

    const isInstalled = (pluginId) => {
        return installedPlugins.some(p => p.pluginId === pluginId);
    };

    const filteredPlugins = selectedCategory === 'All' 
        ? availablePlugins 
        : availablePlugins.filter(p => p.category === selectedCategory);

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto min-h-screen">
             {/* Header */}
             <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <Puzzle size={36} className="text-indigo-600" /> Plugin Marketplace
                    </h1>
                    <p className="text-slate-500 font-medium mt-2 text-lg">Extend your FlexiSite Builder with dynamic third-party components.</p>
                </div>
            </div>

            <Box className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl pt-4 pb-2 -mx-4 px-4 border-b border-slate-100 dark:border-slate-800">
                 <PluginCategoryFilter activeCategory={selectedCategory} onSelect={setSelectedCategory} />
            </Box>

            {loading ? (
                <Box className="flex flex-col flex-1 items-center justify-center p-20 min-h-[400px]">
                    <CircularProgress size={48} thickness={4} className="text-indigo-600 mb-6" />
                    <Typography className="font-bold text-slate-500">Connecting to Marketplace Servers...</Typography>
                </Box>
            ) : filteredPlugins.length === 0 ? (
                <Box className="flex flex-col flex-1 items-center justify-center p-20 min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                    <PackageOpen size={64} className="text-slate-300 mb-6" />
                    <Typography className="text-xl font-bold text-slate-700 dark:text-slate-300">No Plugins Found</Typography>
                    <Typography className="text-slate-500 mt-2 text-center max-w-md">We couldn't find any components matching the "{selectedCategory}" category in the marketplace right now.</Typography>
                </Box>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {filteredPlugins.map(plugin => (
                        <div key={plugin.pluginId} className="h-full">
                            <PluginCard 
                                plugin={plugin} 
                                isInstalled={isInstalled(plugin.pluginId)}
                                onInstall={installPlugin}
                                onClick={setSelectedPlugin}
                            />
                        </div>
                    ))}
                </div>
            )}

            <PluginDetailsModal 
                open={!!selectedPlugin} 
                plugin={selectedPlugin} 
                onClose={() => setSelectedPlugin(null)} 
                isInstalled={selectedPlugin ? isInstalled(selectedPlugin.pluginId) : false}
                onInstall={installPlugin}
            />
            
            <Box className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl">
                 <div>
                    <Typography variant="h6" className="font-black text-indigo-900 dark:text-indigo-300">Looking to build your own?</Typography>
                    <Typography className="text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                        Create custom React components and publish them directly to your tenant's private plugin registry using the FlexiSite CLI.
                    </Typography>
                 </div>
                 <Typography className="font-bold text-indigo-600 flex items-center gap-2 cursor-pointer hover:underline">
                     View Documentation <ArrowRight size={16} />
                 </Typography>
            </Box>
        </div>
    );
};

export default PluginsPage;
