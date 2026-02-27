import React from 'react';
import { Select, MenuItem } from '@mui/material';

const ROLES = { OWNER: 'owner', ADMIN: 'admin', EDITOR: 'editor', VIEWER: 'viewer' };

const RoleSelector = ({ value, onChange, disabled }) => {
    return (
        <Select
            value={value}
            size="small"
            variant="standard"
            disableUnderline
            onChange={(e) => onChange(e.target.value)}
            className="!text-sm !font-bold"
            disabled={disabled}
        >
            <MenuItem value={ROLES.OWNER} disabled>Owner</MenuItem>
            <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
            <MenuItem value={ROLES.EDITOR}>Editor</MenuItem>
            <MenuItem value={ROLES.VIEWER}>Viewer</MenuItem>
        </Select>
    );
};

export default RoleSelector;
