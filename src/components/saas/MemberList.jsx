import React, { useState } from 'react';
import { Card, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip } from '@mui/material';
import { Mail, Trash2 } from 'lucide-react';
import InviteUserModal from './InviteUserModal';
import RoleSelector from './RoleSelector';
import { useMemberStore } from '../../store/saas/memberStore';
import { useAuditStore } from '../../store/saas/auditStore';
import { usePermission } from '../../hooks/usePermission';

const ROLES = { OWNER: 'owner', ADMIN: 'admin', EDITOR: 'editor', VIEWER: 'viewer' };

const MemberList = ({ tenantId }) => {
    const { getMembers, updateRole, removeMember } = useMemberStore();
    const { addAuditLog } = useAuditStore();
    const members = getMembers(tenantId) || [];
    
    const [showInvite, setShowInvite] = useState(false);
    const canManageMembers = usePermission('manage_members'); // Stub check

    const handleRoleChange = (userId, newRole, memberName, email) => {
        updateRole(tenantId, userId, newRole);
        addAuditLog(tenantId, {
            userId: 'current_user',
            userName: 'Current Admin',
            action: 'Member Role Updated',
            category: 'member',
            metadata: { targetUserId: userId, targetEmail: email, newRole },
            ip: window.location.hostname,
            device: navigator.userAgent
        });
    };

    const handleRemove = (userId, memberName, email) => {
        removeMember(tenantId, userId);
        addAuditLog(tenantId, {
            userId: 'current_user',
            userName: 'Current Admin',
            action: 'Member Removed',
            category: 'member',
            metadata: { targetUserId: userId, targetEmail: email },
            ip: window.location.hostname,
            device: navigator.userAgent
        });
    };

    return (
        <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden">
            <Box className="p-8 border-b border-slate-50 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">Workspace Members</h3>
                    <p className="text-sm text-slate-500">Manage who has access to this workspace and what they can do.</p>
                </div>
                <Button 
                    variant="contained" 
                    startIcon={<Mail size={18} />}
                    onClick={() => setShowInvite(true)}
                    className="!bg-indigo-600 !rounded-xl !px-6 !py-2.5 !font-bold !normal-case"
                >
                    Invite Member
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead className="bg-slate-50 dark:bg-slate-900">
                        <TableRow>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">User</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Role</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Status</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px]">Joined</TableCell>
                            <TableCell className="!font-bold !text-slate-400 !uppercase !text-[10px] text-right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.userId} hover>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold uppercase">
                                            {member.name ? member.name[0] : member.email[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white space-x-2">
                                                <span>{member.name || 'Invited User'}</span>
                                                {member.userId === 'current_user' && <Chip label="You" size="small" className="!text-[9px] !h-4" />}
                                            </p>
                                            <p className="text-xs text-slate-500">{member.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <RoleSelector
                                        value={member.role}
                                        onChange={(newRole) => handleRoleChange(member.userId, newRole, member.name, member.email)}
                                        disabled={member.role === ROLES.OWNER || !canManageMembers}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={member.status} 
                                        size="small" 
                                        className={`!text-[10px] !font-bold !uppercase ${member.status === 'active' ? '!bg-emerald-50 !text-emerald-700' : '!bg-amber-50 !text-amber-700'}`} 
                                    />
                                </TableCell>
                                <TableCell className="text-xs text-slate-500 font-medium">
                                    {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'Pending'}
                                </TableCell>
                                <TableCell className="text-right">
                                    {member.role !== ROLES.OWNER && canManageMembers && (
                                        <Tooltip title="Remove Member">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleRemove(member.userId, member.name, member.email)} 
                                                color="error" 
                                                className="!bg-red-50/0 hover:!bg-red-50"
                                            >
                                                <Trash2 size={16} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <InviteUserModal 
                open={showInvite} 
                onClose={() => setShowInvite(false)} 
                tenantId={tenantId}
            />
        </Card>
    );
};

export default MemberList;
