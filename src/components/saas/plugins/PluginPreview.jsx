import React from 'react';
import { Box, Typography } from '@mui/material';
import { Play } from 'lucide-react';

const PluginPreview = ({ plugin }) => {
    return (
        <Box className="w-full h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-8 relative overflow-hidden group">
            
            <div className="absolute inset-0 bg-indigo-50/50 dark:bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 transform scale-95 group-hover:scale-100 transition-all duration-300">
                    <Play size={32} className="text-indigo-600 mb-4" />
                    <Typography className="font-bold text-slate-900 dark:text-white">Live Sandbox Preview</Typography>
                    <Typography className="text-xs text-slate-500 mt-2 text-center">Loading <code>{plugin.bundle}</code><br/>in isolated environment...</Typography>
                </div>
            </div>

            {/* Simulated iframe placeholder for Sandbox */}
            <div className="w-full max-w-lg space-y-4 opacity-50 blur-[2px] pointer-events-none">
                <div className="h-64 bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                     {plugin.category === 'Media' && <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>}
                     {plugin.category === 'E-commerce' && <div className="p-8 space-y-4 flex flex-col items-center justify-center h-full"><div className="h-4 w-1/2 bg-slate-200 rounded"></div><div className="h-10 w-32 bg-indigo-500 rounded-full"></div></div>}
                     {plugin.category === 'Forms' && <div className="p-8 space-y-4"><div className="h-10 w-full bg-slate-200 rounded"></div><div className="h-10 w-full bg-slate-200 rounded"></div></div>}
                </div>
                
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                    {`// Sandbox execution context
window.FlexiSandbox.render(
  {
    component: "${plugin.components?.[0]?.type || plugin.pluginId}",
    props: ${JSON.stringify(plugin.components?.[0]?.props || {}, null, 2)}
  },
  document.getElementById('root')
);`}
                </div>
            </div>
        </Box>
    );
};

export default PluginPreview;
