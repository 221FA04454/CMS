import React from 'react';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { MonitorSmartphone, Globe, CheckCircle2, XCircle } from 'lucide-react';

const LoginActivityTable = ({ activities }) => {
    return (
        <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden">
            <TableContainer>
                <Table>
                    <TableHead className="bg-slate-50 dark:bg-slate-900">
                        <TableRow>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Time</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Location</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">IP Address</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Device</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px] text-right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow key={activity.id} hover>
                                <TableCell className="text-xs text-slate-900 dark:text-white font-bold">{new Date(activity.timestamp).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Globe size={14} className="text-slate-400" />
                                        <span className="text-sm font-medium">{activity.location}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs font-mono text-slate-500">{activity.ip}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MonitorSmartphone size={14} className="text-slate-400" />
                                        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{activity.device}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Chip 
                                        icon={activity.status === 'Success' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                        label={activity.status} 
                                        size="small" 
                                        className={`!text-[10px] !font-bold !uppercase ${
                                            activity.status === 'Success' 
                                            ? '!bg-emerald-50 !text-emerald-700 dark:!bg-emerald-900/30' 
                                            : '!bg-red-50 !text-red-700 dark:!bg-red-900/30'
                                        }`} 
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {activities.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-slate-500 font-medium">No login activity found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default LoginActivityTable;
