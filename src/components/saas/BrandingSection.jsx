import React from 'react';
import { Card, CardContent, TextField, Typography, Box, Divider } from '@mui/material';
import TenantLogoUploader from './TenantLogoUploader';

const BrandingSection = ({ branding, onChange }) => {
    return (
        <Card className="!border-none !shadow-sm !rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-8">
                <div>
                    <Typography variant="h6" className="font-bold mb-2">Workspace Branding</Typography>
                    <Typography className="text-sm text-slate-500">Customize the look and feel of your portal for all members.</Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700">Logo</Typography>
                        <TenantLogoUploader 
                            value={branding.logoUrl} 
                            onChange={(val) => onChange({ ...branding, logoUrl: val })} 
                        />
                    </Box>
                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700">Favicon</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="https://..."
                            value={branding.faviconUrl || ''}
                            onChange={(e) => onChange({ ...branding, faviconUrl: e.target.value })}
                            className="!bg-slate-50 rounded-xl"
                            helperText="Must be a valid URL to an .ico or .png file"
                        />
                    </Box>
                </div>

                <Divider />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700">Primary Brand Color</Typography>
                        <div className="flex items-center gap-4">
                            <input 
                                type="color" 
                                value={branding.primaryColor || '#4f46e5'} 
                                onChange={(e) => onChange({ ...branding, primaryColor: e.target.value })}
                                className="w-12 h-12 rounded cursor-pointer border-0"
                            />
                            <TextField
                                size="small"
                                value={branding.primaryColor || '#4f46e5'}
                                onChange={(e) => onChange({ ...branding, primaryColor: e.target.value })}
                                className="!bg-slate-50 rounded-xl flex-1"
                            />
                        </div>
                    </Box>
                    <Box className="space-y-4">
                        <Typography className="text-sm font-bold text-slate-700">Secondary Color</Typography>
                        <div className="flex items-center gap-4">
                            <input 
                                type="color" 
                                value={branding.secondaryColor || '#10b981'} 
                                onChange={(e) => onChange({ ...branding, secondaryColor: e.target.value })}
                                className="w-12 h-12 rounded cursor-pointer border-0"
                            />
                            <TextField
                                size="small"
                                value={branding.secondaryColor || '#10b981'}
                                onChange={(e) => onChange({ ...branding, secondaryColor: e.target.value })}
                                className="!bg-slate-50 rounded-xl flex-1"
                            />
                        </div>
                    </Box>
                </div>
            </CardContent>
        </Card>
    );
};

export default BrandingSection;
