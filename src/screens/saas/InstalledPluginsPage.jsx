import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Settings, ShieldCheck, Trash2, Code, Package } from 'lucide-react';
import { usePluginStore } from '../../store/pluginStore';

const InstalledPluginsPage = () => {
    const { installedPlugins, removePlugin } = usePluginStore();

    if (installedPlugins.length === 0) {
        return (
            <div className="p-8 space-y-8 max-w-5xl mx-auto min-h-screen">
                <div>
                     <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                         <Package size={32} className="text-emerald-600" /> Active Installations
                     </h1>
                     <p className="text-slate-500 font-medium mt-1">Manage plugins currently injected into your workspace components.</p>
                 </div>
                
                 <Box className="flex flex-col items-center justify-center p-20 min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/50">
                    <Typography className="text-xl font-bold text-slate-700 dark:text-slate-300">No plugins installed yet</Typography>
                    <Typography className="text-slate-500 mt-2 text-center max-w-md">Browse the marketplace to discover dynamic components and add them to your drag-and-drop builder.</Typography>
                    <Button variant="contained" className="!mt-6 !bg-indigo-600 !rounded-xl !font-bold !normal-case !px-8 !py-3">
                        Visit Marketplace
                    </Button>
                </Box>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto min-h-screen">
             <div className="flex justify-between items-end mb-8">
                <div>
                     <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                         <Package size={32} className="text-emerald-600" /> Active Installations
                     </h1>
                     <p className="text-slate-500 font-medium mt-1">Manage plugins currently injected into your workspace components.</p>
                 </div>
                 <Chip label={`${installedPlugins.length} Active`} className="!bg-emerald-100 !text-emerald-800 !font-bold !px-2" />
             </div>

             <div className="space-y-4">
                 {installedPlugins.map(plugin => (
                     <Box 
                        key={plugin.pluginId} 
                        className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md hover:border-indigo-200"
                    >
                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                            <img 
                                src={plugin.thumbnail} 
                                alt={plugin.name} 
                                className="w-16 h-16 rounded-xl object-cover shadow-sm bg-slate-100"
                            />
                            <div>
                                <Typography variant="h6" className="font-bold flex items-center gap-2">
                                    {plugin.name} 
                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">v{plugin.version}</span>
                                </Typography>
                                <Typography className="text-sm text-slate-500 mt-1">{plugin.description}</Typography>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 pl-0 md:pl-8 md:border-l border-slate-100 dark:border-slate-800">
                             <div className="hidden lg:flex flex-col gap-2 min-w-[150px]">
                                <Typography className="text-xs font-bold text-slate-400 uppercase tracking-widest">Integrity</Typography>
                                <Typography className="text-sm font-medium text-emerald-600 flex items-center gap-1.5"><ShieldCheck size={16} /> Verified</Typography>
                             </div>
                             <div className="hidden xl:flex flex-col gap-2 min-w-[150px]">
                                <Typography className="text-xs font-bold text-slate-400 uppercase tracking-widest">Components</Typography>
                                <Typography className="text-sm font-medium text-indigo-600 flex items-center gap-1.5"><Code size={16} /> {plugin.components?.length || 1} Registered</Typography>
                             </div>
                             
                             <div className="flex items-center gap-3 ml-auto">
                                <Button 
                                    variant="outlined" 
                                    size="small"
                                    startIcon={<Settings size={16} />}
                                    className="!rounded-xl !font-bold !normal-case border-slate-200 text-slate-600 hover:bg-slate-50"
                                >
                                    Config
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    size="small"
                                    startIcon={<Trash2 size={16} />}
                                    onClick={() => removePlugin(plugin.pluginId)}
                                    className="!rounded-xl !font-bold !normal-case"
                                >
                                    Remove
                                </Button>
                             </div>
                        </div>
                     </Box>
                 ))}
             </div>
        </div>
    );
};

export default InstalledPluginsPage;
