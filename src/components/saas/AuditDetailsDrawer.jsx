import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider, Chip } from '@mui/material';
import { X, ShieldAlert, Monitor, Globe, Clock, User, FileJson } from 'lucide-react';

const AuditDetailsDrawer = ({ open, onClose, log }) => {
    if (!log) return null;

    const metadataStr = typeof log.metadata === 'string' ? log.metadata : JSON.stringify(log.metadata, null, 2);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box className="w-[400px] bg-slate-50 dark:bg-slate-900 h-full flex flex-col">
                <Box className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <Typography variant="h6" className="font-bold flex items-center gap-2">
                        <ShieldAlert size={20} className="text-indigo-600" />
                        Audit Event Details
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <X size={20} />
                    </IconButton>
                </Box>

                <Box className="flex-1 overflow-auto p-6 space-y-6">
                    <div>
                        <Typography className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Action Performed</Typography>
                        <Typography className="text-lg font-black text-slate-900 dark:text-white">{log.action}</Typography>
                        <Chip label={log.category} size="small" className="mt-2 text-[10px] font-bold uppercase bg-indigo-100 text-indigo-700" />
                    </div>

                    <Divider className="dark:border-slate-800" />

                    <div className="space-y-4">
                        <Typography className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Context</Typography>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <User size={16} className="text-slate-500" />
                            </div>
                            <div>
                                <Typography className="text-sm font-bold">{log.userName}</Typography>
                                <Typography className="text-xs text-slate-500">{log.userId}</Typography>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Clock size={16} className="text-slate-500" />
                            </div>
                            <div>
                                <Typography className="text-sm font-bold">{new Date(log.timestamp).toLocaleString()}</Typography>
                                <Typography className="text-xs text-slate-500">Timestamp</Typography>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Globe size={16} className="text-slate-500" />
                            </div>
                            <div>
                                <Typography className="text-sm font-bold">{log.ip}</Typography>
                                <Typography className="text-xs text-slate-500">IP Address</Typography>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Monitor size={16} className="text-slate-500" />
                            </div>
                            <div>
                                <Typography className="text-sm font-bold">{log.device}</Typography>
                                <Typography className="text-xs text-slate-500">Device / Browser</Typography>
                            </div>
                        </div>
                    </div>

                    <Divider className="dark:border-slate-800" />

                    <div>
                        <Typography className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                            <FileJson size={14} /> Metadata Payload
                        </Typography>
                        <Box className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                            <pre>{metadataStr}</pre>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Drawer>
    );
};

export default AuditDetailsDrawer;
