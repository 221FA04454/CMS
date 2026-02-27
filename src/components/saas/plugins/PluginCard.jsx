import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip } from '@mui/material';
import { DownloadCloud, CheckCircle } from 'lucide-react';

const PluginCard = ({ plugin, isInstalled, onInstall, onClick }) => {
    const [installing, setInstalling] = useState(false);

    const handleInstall = async (e) => {
        e.stopPropagation();
        setInstalling(true);
        await onInstall(plugin.pluginId);
        setInstalling(false);
    };

    return (
        <Card 
            className="!rounded-3xl !shadow-sm !border !border-slate-100 dark:!border-slate-800 overflow-hidden cursor-pointer hover:!shadow-md hover:!-translate-y-1 transition-all duration-300 flex flex-col h-full bg-white dark:bg-slate-900"
            onClick={() => onClick(plugin)}
        >
            <Box className="relative h-40 overflow-hidden group">
                <CardMedia
                    component="img"
                    height="160"
                    image={plugin.thumbnail}
                    alt={plugin.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <Box className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <Chip 
                        label={plugin.category} 
                        size="small" 
                        className="!bg-white/20 !backdrop-blur-md !text-white !font-bold !text-[10px] !uppercase tracking-wider" 
                    />
                </Box>
            </Box>
            <CardContent className="flex-1 flex flex-col p-6">
                <Typography variant="h6" className="font-bold text-slate-900 dark:text-white line-clamp-1">
                    {plugin.name}
                </Typography>
                <Typography className="text-xs text-slate-500 mb-3 font-medium">By {plugin.author} • v{plugin.version}</Typography>
                <Typography className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-1 mb-6">
                    {plugin.description}
                </Typography>
                
                <Box className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <DownloadCloud size={14} className="text-indigo-400" /> 
                        {plugin.downloads.toLocaleString()}
                    </div>
                    {isInstalled ? (
                        <Chip 
                            icon={<CheckCircle size={14} />} 
                            label="Installed" 
                            size="small"
                            className="!bg-emerald-50 !text-emerald-700 dark:!bg-emerald-900/30 !font-bold !px-2" 
                        />
                    ) : (
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={handleInstall}
                            disabled={installing}
                            className={`!rounded-xl !font-bold !normal-case !px-4 ${installing ? '!bg-slate-200 !text-slate-500' : '!bg-indigo-600'}`}
                        >
                            {installing ? 'Installing...' : 'Install'}
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PluginCard;
