import React, { useState } from 'react';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip } from '@mui/material';
import { Eye } from 'lucide-react';
import AuditDetailsDrawer from './AuditDetailsDrawer';

const AuditTrailTable = ({ logs }) => {
    const [selectedLog, setSelectedLog] = useState(null);

    return (
        <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden">
            <TableContainer>
                <Table>
                    <TableHead className="bg-slate-50 dark:bg-slate-900">
                        <TableRow>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Timestamp</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">User</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Action</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Category</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">IP</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px] text-right">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.logId} hover>
                                <TableCell className="text-xs text-slate-500 font-medium">{new Date(log.timestamp).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white">{log.userName}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium text-sm text-slate-900 dark:text-white">{log.action}</div>
                                </TableCell>
                                <TableCell>
                                    <Chip label={log.category} size="small" className="!text-[10px] !font-bold !uppercase bg-indigo-50 text-indigo-700" />
                                </TableCell>
                                <TableCell className="text-xs text-slate-500">{log.ip}</TableCell>
                                <TableCell className="text-right">
                                    <IconButton size="small" onClick={() => setSelectedLog(log)}>
                                        <Eye size={16} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {logs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-slate-500 font-medium">No audit logs found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <AuditDetailsDrawer open={!!selectedLog} onClose={() => setSelectedLog(null)} log={selectedLog} />
        </Card>
    );
};

export default AuditTrailTable;
