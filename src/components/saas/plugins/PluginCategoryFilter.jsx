import React from 'react';
import { Box, Chip } from '@mui/material';

const CATEGORIES = ['All', 'Layout', 'Forms', 'Charts', 'Media', 'E-commerce', 'Integrations', 'Animations', 'Utilities'];

const PluginCategoryFilter = ({ activeCategory, onSelect }) => {
    return (
        <Box className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide py-2">
            {CATEGORIES.map(category => (
                <Chip
                    key={category}
                    label={category}
                    onClick={() => onSelect(category)}
                    className={`!font-bold !rounded-xl !px-3 !transition-all duration-300 ${
                        activeCategory === category 
                        ? '!bg-slate-900 !text-white dark:!bg-white dark:!text-slate-900 !shadow-md' 
                        : '!bg-slate-100 !text-slate-600 hover:!bg-indigo-50 dark:!bg-slate-800 dark:!text-slate-300'
                    }`}
                />
            ))}
        </Box>
    );
};

export default PluginCategoryFilter;
