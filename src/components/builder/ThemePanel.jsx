import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import CloseIcon from '@mui/icons-material/Close';
import PaletteIcon from '@mui/icons-material/Palette';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import GridViewIcon from '@mui/icons-material/GridView';
import DownloadIcon from '@mui/icons-material/Download';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ThemePanel = ({ onClose }) => {
    const activeTheme = useThemeStore((state) => state.themes[state.activeThemeId]);
    const updateToken = useThemeStore((state) => state.updateToken);
    const exportTheme = useThemeStore((state) => state.exportTheme);

    const [activeTab, setActiveTab] = useState('colors');

    const sections = [
        { id: 'colors', label: 'Colors', icon: <PaletteIcon sx={{ fontSize: 18 }} /> },
        { id: 'typography', label: 'Type', icon: <TextFormatIcon sx={{ fontSize: 18 }} /> },
        { id: 'scale', label: 'Layout', icon: <GridViewIcon sx={{ fontSize: 18 }} /> }
    ];

    return (
        <div className="fixed right-[340px] top-20 w-80 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-300 z-40">
            {/* Header */}
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                        <PaletteIcon fontSize="small" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tighter">Site Design</h3>
                        <p className="text-[10px] text-slate-500 font-bold opacity-60 uppercase tracking-widest">{activeTheme.name}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <CloseIcon fontSize="small" />
                </button>
            </div>

            {/* Sub-Tabs */}
            <div className="flex p-2 gap-1 bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800">
                {sections.map(s => (
                    <button 
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === s.id ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                    >
                        {s.icon}
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {activeTab === 'colors' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(activeTheme.tokens.colors).map(([key, value]) => (
                                <div key={key} className="space-y-2 group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{key}</label>
                                    <div className="relative h-12 w-full rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-indigo-400 transition-all">
                                        <input 
                                            type="color"
                                            value={value}
                                            onChange={(e) => updateToken('colors', key, e.target.value)}
                                            className="absolute inset-0 w-full h-full cursor-pointer scale-150"
                                        />
                                        <div className="absolute right-2 bottom-1 text-[8px] font-bold text-white mix-blend-difference pointer-events-none uppercase">
                                            {value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'typography' && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                             <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Font Family</label>
                                <select 
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm font-bold"
                                    value={activeTheme.tokens.typography.fontFamily}
                                    onChange={(e) => updateToken('typography', 'fontFamily', e.target.value)}
                                >
                                    <option value="'Inter', sans-serif">Inter (Modern)</option>
                                    <option value="'Outfit', sans-serif">Outfit (Premium)</option>
                                    <option value="'Roboto', sans-serif">Roboto (Clean)</option>
                                </select>
                             </div>
                             
                             {['h1', 'h2', 'body'].map(type => (
                                 <div key={type} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                                     <div className="flex justify-between items-center mb-3">
                                         <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{type} Style</span>
                                         <span className="text-[10px] font-bold text-slate-400">{activeTheme.tokens.typography[type].size}</span>
                                     </div>
                                     <input 
                                        type="range" min="10" max="120" step="1"
                                        value={parseInt(activeTheme.tokens.typography[type].size)}
                                        onChange={(e) => {
                                            const newType = { ...activeTheme.tokens.typography[type], size: `${e.target.value}px` };
                                            updateToken('typography', type, newType);
                                        }}
                                        className="w-full"
                                     />
                                 </div>
                             ))}
                        </div>
                    </div>
                )}

                {activeTab === 'scale' && (
                    <div className="space-y-6">
                         {Object.entries(activeTheme.tokens.scale).map(([key, value]) => (
                             <div key={key} className="flex flex-col gap-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</label>
                                <input 
                                    type="text"
                                    value={value}
                                    onChange={(e) => updateToken('scale', key, e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-sm font-bold"
                                    placeholder="e.g. 16px"
                                />
                             </div>
                         ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex gap-2">
                <button 
                    onClick={exportTheme}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-all active:scale-95"
                >
                    <DownloadIcon fontSize="inherit" />
                    JSON
                </button>
                <button 
                    className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                    title="Apply New Theme"
                >
                    <RestartAltIcon fontSize="small" />
                </button>
            </div>
        </div>
    );
};

export default ThemePanel;
