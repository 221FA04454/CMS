import React from 'react';
import { Card, CardContent, Typography, Box, Switch, Button, TextField, Select, MenuItem, Divider } from '@mui/material';
import { Save, ShieldAlert, LogOut, Lock } from 'lucide-react';

const SecuritySettings = ({ settings, onChange, onSave, onForceLogout }) => {
    return (
        <div className="space-y-8">
            <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-8">
                    <div>
                        <Typography variant="h6" className="font-bold flex items-center gap-2">
                            <ShieldAlert size={20} className="text-indigo-600" /> Authentication Policies
                        </Typography>
                        <Typography className="text-sm text-slate-500 mt-1">Enforce strict security measures across all workspace members.</Typography>
                    </div>

                    <div className="space-y-6">
                        <Box className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <div className="flex flex-col">
                                <Typography className="font-bold text-sm">Require Two-Factor Authentication (2FA)</Typography>
                                <Typography className="text-xs text-slate-500">All members will be required to setup 2FA.</Typography>
                            </div>
                            <Switch 
                                checked={settings.enforce2FA}
                                onChange={(e) => onChange({...settings, enforce2FA: e.target.checked})}
                                color="primary"
                            />
                        </Box>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Box className="space-y-2">
                                <Typography className="text-sm font-bold text-slate-700">Idle Session Timeout</Typography>
                                <Select
                                    size="small"
                                    fullWidth
                                    value={settings.sessionTimeoutMinutes}
                                    onChange={(e) => onChange({...settings, sessionTimeoutMinutes: e.target.value})}
                                    className="!bg-slate-50 rounded-xl"
                                >
                                    <MenuItem value={15}>15 Minutes</MenuItem>
                                    <MenuItem value={60}>1 Hour</MenuItem>
                                    <MenuItem value={1440}>24 Hours</MenuItem>
                                    <MenuItem value={10080}>7 Days</MenuItem>
                                </Select>
                            </Box>

                            <Box className="space-y-2">
                                <Typography className="text-sm font-bold text-slate-700">Password Reset Enforcement</Typography>
                                <Select
                                    size="small"
                                    fullWidth
                                    value={settings.passwordResetEnforcementDays}
                                    onChange={(e) => onChange({...settings, passwordResetEnforcementDays: e.target.value})}
                                    className="!bg-slate-50 rounded-xl"
                                >
                                    <MenuItem value={30}>Every 30 Days</MenuItem>
                                    <MenuItem value={90}>Every 90 Days</MenuItem>
                                    <MenuItem value={180}>Every 180 Days</MenuItem>
                                    <MenuItem value={0}>Never</MenuItem>
                                </Select>
                            </Box>
                        </div>
                    </div>

                    <Divider className="dark:border-slate-800" />

                    <Box className="space-y-2">
                        <Typography className="text-sm font-bold text-slate-700">IP Allowlist</Typography>
                        <Typography className="text-xs text-slate-500 mb-2">Restrict workspace access to specific IP ranges (CIDR notation). Leave blank to allow all.</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="e.g. 192.168.1.1/24"
                            value={settings.ipAllowlist}
                            onChange={(e) => onChange({...settings, ipAllowlist: e.target.value})}
                            className="!bg-slate-50 rounded-xl"
                        />
                    </Box>

                    <Button 
                        variant="contained" 
                        startIcon={<Save size={18} />}
                        onClick={onSave}
                        className="!bg-slate-900 !rounded-xl !px-8 !py-3 !font-bold !normal-case"
                    >
                        Save Policies
                    </Button>
                </CardContent>
            </Card>

            <Card className="!border-2 !border-red-100 !bg-red-50/30 !shadow-none !rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Typography className="text-lg font-black text-red-600 flex items-center gap-2">
                                <LogOut size={20} /> Force Global Logout
                            </Typography>
                            <Typography className="text-sm text-red-500/80">Immediately terminate all active sessions for all members across devices.</Typography>
                        </div>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            onClick={onForceLogout}
                            className="!rounded-xl !font-bold !normal-case !px-6"
                        >
                            Log Out All Devices
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SecuritySettings;
