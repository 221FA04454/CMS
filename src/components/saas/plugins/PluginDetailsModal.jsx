import React, { useState } from 'react';
import { Dialog, DialogContent, Typography, Box, IconButton, Button, Divider, Chip } from '@mui/material';
import { X, CheckCircle, DownloadCloud, Code, FileJson, Package, ShieldCheck } from 'lucide-react';
import PluginPreview from './PluginPreview';

const PluginDetailsModal = ({ plugin, open, onClose, onInstall, isInstalled }) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!plugin) return null;

    const manifestSample = {
        pluginId: plugin.pluginId,
        version: plugin.version,
        components: plugin.components || []
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ className: "!rounded-3xl !shadow-2xl !bg-white dark:!bg-slate-900" }}
        >
            <Box className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
                <Box className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                        <Package size={24} />
                    </div>
                    <div>
                        <Typography variant="h6" className="font-bold flex items-center gap-2">
                            {plugin.name} 
                            {isInstalled && <Chip icon={<CheckCircle size={14} />} label="Installed" size="small" className="!bg-emerald-50 !text-emerald-700 !font-bold !px-1 !h-6" />}
                        </Typography>
                        <Typography className="text-xs text-slate-500">By {plugin.author} • Version {plugin.version} • {plugin.category}</Typography>
                    </div>
                </Box>
                <IconButton onClick={onClose} size="small" className="!bg-slate-100 hover:!bg-slate-200 dark:!bg-slate-800">
                    <X size={20} className="text-slate-500" />
                </IconButton>
            </Box>

            <DialogContent className="!p-0 flex flex-col md:flex-row min-h-[500px]">
                {/* Left Sidebar Info */}
                <Box className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col border-r border-slate-100 dark:border-slate-800">
                    <img 
                        src={plugin.thumbnail} 
                        alt="Plugin Preview" 
                        className="w-full h-32 object-cover rounded-xl shadow-sm mb-6"
                    />

                    <Typography className="text-sm text-slate-700 dark:text-slate-300 mb-6 font-medium leading-relaxed">
                        {plugin.description}
                    </Typography>

                    <Divider className="!my-4 dark:border-slate-800" />

                    <div className="space-y-4 mb-8">
                        <Box className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Downloads</span>
                            <span className="font-bold flex items-center gap-1.5"><DownloadCloud size={14} className="text-indigo-400" /> {plugin.downloads}</span>
                        </Box>
                        <Box className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Bundle Size</span>
                            <span className="font-bold">~42 KB</span>
                        </Box>
                        <Box className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Security Check</span>
                            <span className="font-bold text-emerald-600 flex items-center gap-1"><ShieldCheck size={14} /> Passed</span>
                        </Box>
                    </div>

                    <div className="mt-auto">
                        <Button 
                            variant="contained" 
                            fullWidth
                            size="large"
                            disabled={isInstalled}
                            onClick={() => { onInstall(plugin.pluginId); onClose(); }}
                            className={`!rounded-xl !font-bold !py-3 !normal-case shadow-md ${isInstalled ? '!bg-slate-200 !text-slate-500' : '!bg-indigo-600'}`}
                        >
                            {isInstalled ? 'Already Installed' : 'Install Component'}
                        </Button>
                        <Typography className="text-[10px] text-center text-slate-400 mt-2 uppercase tracking-wider font-bold">Requires active internet connection</Typography>
                    </div>
                </Box>

                {/* Right Main Content */}
                <Box className="w-full md:w-2/3 p-6 flex flex-col bg-white dark:bg-slate-900">
                    
                    <Box className="flex items-center gap-4 mb-6">
                         <Chip 
                            icon={<Code size={16} />} 
                            label="Preview" 
                            onClick={() => setActiveTab('overview')}
                            color={activeTab === 'overview' ? 'primary' : 'default'}
                            className={`!font-bold !rounded-lg !cursor-pointer ${activeTab === 'overview' ? '!bg-indigo-100 !text-indigo-700' : '!bg-transparent border !border-slate-200'}`}
                        />
                         <Chip 
                            icon={<FileJson size={16} />} 
                            label="Manifest JSON" 
                            onClick={() => setActiveTab('manifest')}
                            color={activeTab === 'manifest' ? 'primary' : 'default'}
                            className={`!font-bold !rounded-lg !cursor-pointer ${activeTab === 'manifest' ? '!bg-indigo-100 !text-indigo-700' : '!bg-transparent border !border-slate-200'}`}
                        />
                    </Box>

                    <Box className="flex-1 overflow-auto rounded-3xl">
                        {activeTab === 'overview' ? (
                            <PluginPreview plugin={plugin} />
                        ) : (
                            <Box className="bg-slate-900 p-6 rounded-3xl h-full font-mono text-sm text-emerald-400 overflow-auto">
                                <pre>{JSON.stringify(manifestSample, null, 2)}</pre>
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PluginDetailsModal;
