import React from 'react';
import { Card, CardContent, Typography, Box, Switch, Button, Select, MenuItem, Divider } from '@mui/material';
import { Save, Layout, Sliders, Play, Palette } from 'lucide-react';

const WorkspacePreferences = ({ preferences, onChange, onSave }) => {
    return (
        <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-8">
                <div>
                    <Typography variant="h6" className="font-bold flex items-center gap-2">
                        <Sliders size={20} className="text-indigo-600" /> Designer Preferences
                    </Typography>
                    <Typography className="text-sm text-slate-500 mt-1">Global defaults and editor settings for all members.</Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Palette size={16} /> Default Theme Mode
                        </Typography>
                        <Select
                            size="small"
                            fullWidth
                            value={preferences.defaultTheme}
                            onChange={(e) => onChange({...preferences, defaultTheme: e.target.value})}
                            className="!bg-slate-50 rounded-xl"
                        >
                            <MenuItem value="Light">Light Mode</MenuItem>
                            <MenuItem value="Dark">Dark Mode</MenuItem>
                            <MenuItem value="System">System Default</MenuItem>
                        </Select>
                    </Box>

                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Layout size={16} /> Default Landing Page
                        </Typography>
                        <Select
                            size="small"
                            fullWidth
                            value={preferences.defaultLandingPage}
                            onChange={(e) => onChange({...preferences, defaultLandingPage: e.target.value})}
                            className="!bg-slate-50 rounded-xl"
                        >
                            <MenuItem value="Dashboard">Dashboard</MenuItem>
                            <MenuItem value="Builder">Builder Engine</MenuItem>
                            <MenuItem value="Tenants">Tenant Manager</MenuItem>
                            <MenuItem value="Analytics">Analytics Panel</MenuItem>
                        </Select>
                    </Box>
                </div>

                <Divider className="dark:border-slate-800" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700">Autosave Frequency</Typography>
                        <Select
                            size="small"
                            fullWidth
                            value={preferences.autosaveFrequencyMinutes}
                            onChange={(e) => onChange({...preferences, autosaveFrequencyMinutes: e.target.value})}
                            className="!bg-slate-50 rounded-xl"
                        >
                            <MenuItem value={1}>Every Minute</MenuItem>
                            <MenuItem value={5}>Every 5 Minutes</MenuItem>
                            <MenuItem value={15}>Every 15 Minutes</MenuItem>
                            <MenuItem value={0}>Disabled</MenuItem>
                        </Select>
                    </Box>

                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Play size={16} /> UI Animation Speed
                        </Typography>
                        <Select
                            size="small"
                            fullWidth
                            value={preferences.animationSpeed}
                            onChange={(e) => onChange({...preferences, animationSpeed: e.target.value})}
                            className="!bg-slate-50 rounded-xl"
                        >
                            <MenuItem value="Fast">Fast</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="Slow">Slow</MenuItem>
                            <MenuItem value="Reduced">Reduced Motion</MenuItem>
                        </Select>
                    </Box>
                </div>

                <Button 
                    variant="contained" 
                    startIcon={<Save size={18} />}
                    onClick={onSave}
                    className="!bg-slate-900 !rounded-xl !px-8 !py-3 !font-bold !normal-case mt-4"
                >
                    Apply Preferences
                </Button>
            </CardContent>
        </Card>
    );
};

export default WorkspacePreferences;
