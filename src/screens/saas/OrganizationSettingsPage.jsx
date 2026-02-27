import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, Button, Card, CardContent, Divider, TextField, Select, MenuItem, Typography, IconButton } from '@mui/material';
import { ArrowLeft, Building2, Palette, Users, Shield, Clock, MonitorSmartphone, Bell, Sliders, Save, Globe } from 'lucide-react';
import { useOrganizationStore } from '../../store/saas/organizationStore';
import { useSecurityStore } from '../../store/saas/securityStore';
import { useAuditStore } from '../../store/saas/auditStore';
import { usePreferencesStore } from '../../store/saas/preferencesStore';
import { useNotificationsStore } from '../../store/saas/notificationsStore';

// Components
import BrandingSection from '../../components/saas/BrandingSection';
import MemberList from '../../components/saas/MemberList';
import SecuritySettings from '../../components/saas/SecuritySettings';
import LoginActivityTable from '../../components/saas/LoginActivityTable';
import AuditTrailTable from '../../components/saas/AuditTrailTable';
import NotificationSettings from '../../components/saas/NotificationSettings';
import WorkspacePreferences from '../../components/saas/WorkspacePreferences';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</Box>}
        </div>
    );
};

const OrganizationSettingsPage = () => {
    const { tenantId = 'tenant_1' } = useParams(); // Defaulting to tenant_1 for preview purposes
    const navigate = useNavigate();

    // Stores
    const { getOrganization, updateOrganization, updateBranding } = useOrganizationStore();
    const { getSecuritySettings, updateSecuritySettings, getLoginActivities, forceLogoutAll } = useSecurityStore();
    const { getAuditLogs, addAuditLog } = useAuditStore();
    const { getPreferences, updatePreferences } = usePreferencesStore();
    const { getSettings: getNotifications, updateSettings: updateNotifications } = useNotificationsStore();

    const [activeTab, setActiveTab] = useState(0);

    // Initial Data loads
    const org = getOrganization(tenantId);
    const [orgData, setOrgData] = useState(org || {});
    const [brandingData, setBrandingData] = useState(org?.branding || {});
    
    const securitySettings = getSecuritySettings(tenantId);
    const loginActivities = getLoginActivities(tenantId);
    const auditLogs = getAuditLogs(tenantId);
    const preferences = getPreferences(tenantId);
    const notifications = getNotifications(tenantId);

    if (!org) {
        return <div className="p-20 text-center font-bold text-slate-500">Your organization is ready — <br/>add branding and invite members by setting up the Tenant.</div>;
    }

    const handleSaveOrganization = () => {
        updateOrganization(tenantId, orgData);
        addAuditLog(tenantId, {
            userId: 'current_user',
            userName: 'Current Admin',
            action: 'Organization Profile Updated',
            category: 'settings',
            metadata: { name: orgData.name },
            ip: window.location.hostname,
            device: navigator.userAgent
        });
        alert('Organization settings updated successfully');
    };

    const handleSaveBranding = () => {
        updateBranding(tenantId, brandingData);
        addAuditLog(tenantId, {
            userId: 'current_user',
            userName: 'Current Admin',
            action: 'Branding Settings Updated',
            category: 'settings',
            metadata: { primaryColor: brandingData.primaryColor },
            ip: window.location.hostname,
            device: navigator.userAgent
        });
        alert('Branding settings updated');
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <IconButton onClick={() => navigate('/saas/tenants')} className="!bg-white dark:!bg-slate-900 shadow-sm">
                    <ArrowLeft size={20} />
                </IconButton>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Enterprise Settings</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage organization details, team access, security policies, and integrations.</p>
                </div>
            </div>

            <Box className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 -mx-8 px-8">
                <Tabs 
                    value={activeTab} 
                    onChange={(e, v) => setActiveTab(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    className="!min-h-0"
                    TabIndicatorProps={{ className: '!bg-indigo-600 !h-1' }}
                >
                    <Tab icon={<Building2 size={16} className="mr-2" />} iconPosition="start" label="Organization" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 0 ? '!text-indigo-600' : '!text-slate-400'}`} />
                    <Tab icon={<Palette size={16} className="mr-2" />} iconPosition="start" label="Branding" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 1 ? '!text-indigo-600' : '!text-slate-400'}`} />
                    <Tab icon={<Users size={16} className="mr-2" />} iconPosition="start" label="Members" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 2 ? '!text-indigo-600' : '!text-slate-400'}`} />
                    <Tab icon={<Shield size={16} className="mr-2" />} iconPosition="start" label="Security" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 3 ? '!text-emerald-600' : '!text-slate-400'}`} />
                    <Tab icon={<Clock size={16} className="mr-2" />} iconPosition="start" label="Audit Trail" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 4 ? '!text-indigo-600' : '!text-slate-400'}`} />
                    <Tab icon={<MonitorSmartphone size={16} className="mr-2" />} iconPosition="start" label="Logins" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 5 ? '!text-indigo-600' : '!text-slate-400'}`} />
                    <Tab icon={<Bell size={16} className="mr-2" />} iconPosition="start" label="Notifications" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 6 ? '!text-indigo-600' : '!text-slate-400'}`} />
                    <Tab icon={<Sliders size={16} className="mr-2" />} iconPosition="start" label="Preferences" className={`!normal-case !font-bold !min-h-0 !py-4 ${activeTab === 7 ? '!text-indigo-600' : '!text-slate-400'}`} />
                </Tabs>
            </Box>

            {/* TAB 0: ORGANIZATION & LOCALIZATION */}
            <TabPanel value={activeTab} index={0}>
                <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden max-w-3xl">
                    <CardContent className="p-8 space-y-8">
                        <div>
                            <Typography variant="h6" className="font-bold">Organization Profile</Typography>
                            <Typography className="text-sm text-slate-500 mt-1">General details about your company.</Typography>
                        </div>
                        <div className="space-y-6">
                            <Box className="space-y-2">
                                <Typography className="text-sm font-bold text-slate-700">Organization Name</Typography>
                                <TextField fullWidth size="small" value={orgData.name || ''} onChange={(e) => setOrgData({...orgData, name: e.target.value})} className="!bg-slate-50 rounded-xl" />
                            </Box>
                            <Box className="space-y-2">
                                <Typography className="text-sm font-bold text-slate-700">Description</Typography>
                                <TextField fullWidth multiline rows={3} value={orgData.description || ''} onChange={(e) => setOrgData({...orgData, description: e.target.value})} className="!bg-slate-50 rounded-xl" />
                            </Box>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Box className="space-y-2">
                                    <Typography className="text-sm font-bold text-slate-700">Industry</Typography>
                                    <Select fullWidth size="small" value={orgData.industry || 'Technology'} onChange={(e) => setOrgData({...orgData, industry: e.target.value})} className="!bg-slate-50 rounded-xl">
                                        <MenuItem value="Technology">Technology</MenuItem>
                                        <MenuItem value="Healthcare">Healthcare</MenuItem>
                                        <MenuItem value="Finance">Finance</MenuItem>
                                        <MenuItem value="Retail">Retail</MenuItem>
                                        <MenuItem value="Education">Education</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </Box>
                                <Box className="space-y-2">
                                    <Typography className="text-sm font-bold text-slate-700">Contact Email</Typography>
                                    <TextField fullWidth size="small" value={orgData.contactEmail || ''} onChange={(e) => setOrgData({...orgData, contactEmail: e.target.value})} className="!bg-slate-50 rounded-xl" />
                                </Box>
                            </div>
                        </div>

                        <Divider className="my-8" />

                        <div>
                            <Typography variant="h6" className="font-bold flex items-center gap-2">
                                <Globe size={20} className="text-indigo-600" /> Localization
                            </Typography>
                            <Typography className="text-sm text-slate-500 mt-1">Regional settings for dates, times, and formatting.</Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Box className="space-y-2">
                                <Typography className="text-sm font-bold text-slate-700">Default Locale</Typography>
                                <Select fullWidth size="small" value={orgData.locale || 'en-US'} onChange={(e) => setOrgData({...orgData, locale: e.target.value})} className="!bg-slate-50 rounded-xl">
                                    <MenuItem value="en-US">English (United States)</MenuItem>
                                    <MenuItem value="en-GB">English (United Kingdom)</MenuItem>
                                    <MenuItem value="fr-FR">Français</MenuItem>
                                    <MenuItem value="de-DE">Deutsch</MenuItem>
                                    <MenuItem value="ja-JP">日本語</MenuItem>
                                </Select>
                            </Box>
                            <Box className="space-y-2">
                                <Typography className="text-sm font-bold text-slate-700">Time Zone</Typography>
                                <Select fullWidth size="small" value={orgData.timezone || 'UTC'} onChange={(e) => setOrgData({...orgData, timezone: e.target.value})} className="!bg-slate-50 rounded-xl">
                                    <MenuItem value="UTC">UTC (Universal Coordinated Time)</MenuItem>
                                    <MenuItem value="America/New_York">Eastern Time (US & Canada)</MenuItem>
                                    <MenuItem value="America/Los_Angeles">Pacific Time (US & Canada)</MenuItem>
                                    <MenuItem value="Europe/London">London</MenuItem>
                                    <MenuItem value="Asia/Tokyo">Tokyo</MenuItem>
                                </Select>
                            </Box>
                            <Box className="space-y-2 md:col-span-2">
                                <Typography className="text-sm font-bold text-slate-700">Date Format</Typography>
                                <Select fullWidth size="small" value={orgData.dateFormat || 'MM/DD/YYYY'} onChange={(e) => setOrgData({...orgData, dateFormat: e.target.value})} className="!bg-slate-50 rounded-xl">
                                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY (e.g., 12/31/2026)</MenuItem>
                                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY (e.g., 31/12/2026)</MenuItem>
                                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD (e.g., 2026-12-31)</MenuItem>
                                </Select>
                            </Box>
                        </div>

                        <Button 
                            variant="contained" 
                            startIcon={<Save size={18} />}
                            onClick={handleSaveOrganization}
                            className="!bg-slate-900 !rounded-xl !px-8 !py-3 !font-bold !normal-case mt-4"
                        >
                            Save Organization Profile
                        </Button>
                    </CardContent>
                </Card>
            </TabPanel>

            {/* TAB 1: BRANDING */}
            <TabPanel value={activeTab} index={1}>
                <div className="max-w-4xl">
                    <BrandingSection branding={brandingData} onChange={setBrandingData} />
                    <Button 
                        variant="contained" 
                        startIcon={<Save size={18} />}
                        onClick={handleSaveBranding}
                        className="!bg-indigo-600 !rounded-xl !px-8 !py-3 !font-bold !normal-case mt-6"
                    >
                        Save Branding Settings
                    </Button>
                </div>
            </TabPanel>

            {/* TAB 2: MEMBERS & ROLES */}
            <TabPanel value={activeTab} index={2}>
                <MemberList tenantId={tenantId} />
            </TabPanel>

            {/* TAB 3: SECURITY */}
            <TabPanel value={activeTab} index={3}>
                <div className="max-w-4xl">
                    <SecuritySettings 
                        settings={securitySettings} 
                        onChange={(newSettings) => updateSecuritySettings(tenantId, newSettings)}
                        onSave={() => {
                            addAuditLog(tenantId, { userId: 'current_user', userName: 'Admin', action: 'Security Policies Updated', category: 'security', metadata: {}, ip: window.location.hostname, device: navigator.userAgent });
                            alert('Security policies enforced.');
                        }}
                        onForceLogout={() => {
                            forceLogoutAll(tenantId);
                            addAuditLog(tenantId, { userId: 'current_user', userName: 'Admin', action: 'Forced Global Logout', category: 'security', metadata: {}, ip: window.location.hostname, device: navigator.userAgent });
                            alert('All user sessions have been terminated.');
                        }}
                    />
                </div>
            </TabPanel>

            {/* TAB 4: AUDIT TRAIL */}
            <TabPanel value={activeTab} index={4}>
                <AuditTrailTable logs={auditLogs} />
            </TabPanel>

            {/* TAB 5: LOGIN ACTIVITY */}
            <TabPanel value={activeTab} index={5}>
                <LoginActivityTable activities={loginActivities} />
            </TabPanel>

            {/* TAB 6: NOTIFICATIONS */}
            <TabPanel value={activeTab} index={6}>
                <div className="max-w-3xl">
                    <NotificationSettings 
                        settings={notifications} 
                        onChange={(newSettings) => updateNotifications(tenantId, newSettings)} 
                        onSave={() => {
                            addAuditLog(tenantId, { userId: 'current_user', userName: 'Admin', action: 'Notification Settings Updated', category: 'settings', metadata: {}, ip: window.location.hostname, device: navigator.userAgent });
                            alert('Notification configurations saved.');
                        }}
                    />
                </div>
            </TabPanel>

            {/* TAB 7: PREFERENCES */}
            <TabPanel value={activeTab} index={7}>
                <div className="max-w-3xl">
                    <WorkspacePreferences 
                        preferences={preferences} 
                        onChange={(newPrefs) => updatePreferences(tenantId, newPrefs)} 
                        onSave={() => {
                            addAuditLog(tenantId, { userId: 'current_user', userName: 'Admin', action: 'Workspace Preferences Updated', category: 'settings', metadata: {}, ip: window.location.hostname, device: navigator.userAgent });
                            alert('Global workspace preferences stored.');
                        }}
                    />
                </div>
            </TabPanel>
        </div>
    );
};

export default OrganizationSettingsPage;
