import React from 'react';
import { Card, CardContent, Typography, Box, Switch, Button, TextField, Divider } from '@mui/material';
import { Save, Bell, Slack, Webhook, Mail } from 'lucide-react';

const NotificationSettings = ({ settings, onChange, onSave }) => {
    return (
        <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-8">
                <div>
                    <Typography variant="h6" className="font-bold flex items-center gap-2">
                        <Bell size={20} className="text-indigo-600" /> System Notifications
                    </Typography>
                    <Typography className="text-sm text-slate-500 mt-1">Configure how and when your workspace receives important alerts.</Typography>
                </div>

                <div className="space-y-4">
                    <Typography className="text-sm font-bold text-slate-900 uppercase tracking-widest">Channels</Typography>
                    
                    <Box className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <div className="flex flex-col">
                            <Typography className="font-bold text-sm flex items-center gap-2">
                                <Mail size={16} /> Email Alerts
                            </Typography>
                            <Typography className="text-xs text-slate-500">Send critical alerts to workspace admins.</Typography>
                        </div>
                        <Switch 
                            checked={settings.emailNotifications}
                            onChange={(e) => onChange({...settings, emailNotifications: e.target.checked})}
                            color="primary"
                        />
                    </Box>

                    <Box className="flex flex-col gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <Typography className="font-bold text-sm flex items-center gap-2">
                                    <Slack size={16} /> Slack Integration
                                </Typography>
                                <Typography className="text-xs text-slate-500">Send notifications to a designated Slack channel.</Typography>
                            </div>
                            <Switch 
                                checked={settings.slackIntegration}
                                onChange={(e) => onChange({...settings, slackIntegration: e.target.checked})}
                                color="primary"
                            />
                        </div>
                        {settings.slackIntegration && (
                            <TextField
                                size="small"
                                placeholder="#alerts or channel webhook"
                                value={settings.slackChannel}
                                onChange={(e) => onChange({...settings, slackChannel: e.target.value})}
                                fullWidth
                                className="!bg-slate-50"
                            />
                        )}
                    </Box>

                    <Box className="flex flex-col gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <Typography className="font-bold text-sm flex items-center gap-2">
                                    <Webhook size={16} /> Custom Webhooks
                                </Typography>
                                <Typography className="text-xs text-slate-500">POST events to external systems.</Typography>
                            </div>
                            <Switch 
                                checked={settings.webhookNotifications}
                                onChange={(e) => onChange({...settings, webhookNotifications: e.target.checked})}
                                color="primary"
                            />
                        </div>
                        {settings.webhookNotifications && (
                            <TextField
                                size="small"
                                placeholder="https://api.example.com/webhook"
                                value={settings.webhookUrl}
                                onChange={(e) => onChange({...settings, webhookUrl: e.target.value})}
                                fullWidth
                                className="!bg-slate-50"
                            />
                        )}
                    </Box>
                </div>

                <Divider className="dark:border-slate-800" />

                <div className="space-y-4">
                    <Typography className="text-sm font-bold text-slate-900 uppercase tracking-widest">Events</Typography>
                    
                    <Box className="flex items-center justify-between py-2">
                        <Typography className="text-sm font-medium">Deployment Failures</Typography>
                        <Switch size="small" checked={settings.deploymentFailureAlerts} onChange={(e) => onChange({...settings, deploymentFailureAlerts: e.target.checked})} />
                    </Box>
                    <Box className="flex items-center justify-between py-2">
                        <Typography className="text-sm font-medium">Domain & SSL Issues</Typography>
                        <Switch size="small" checked={settings.domainIssuesAlerts} onChange={(e) => onChange({...settings, domainIssuesAlerts: e.target.checked})} />
                    </Box>
                    <Box className="flex items-center justify-between py-2">
                        <Typography className="text-sm font-medium">Traffic & Analytics Spikes</Typography>
                        <Switch size="small" checked={settings.analyticsSpikesAlerts} onChange={(e) => onChange({...settings, analyticsSpikesAlerts: e.target.checked})} />
                    </Box>
                </div>

                <Button 
                    variant="contained" 
                    startIcon={<Save size={18} />}
                    onClick={onSave}
                    className="!bg-slate-900 !rounded-xl !px-8 !py-3 !font-bold !normal-case mt-4"
                >
                    Save Preferences
                </Button>
            </CardContent>
        </Card>
    );
};

export default NotificationSettings;
