import { DJStyle, DJVoice } from '../../types';

export const ExtensionTheme = {
    SYSTEM: 'System',
    LIGHT: 'Light',
    DARK: 'Dark',
    MIDNIGHT: 'Midnight',
    SUNRISE: 'Sunrise',
    OCEAN: 'Ocean'
} as const;

export type ExtensionTheme = typeof ExtensionTheme[keyof typeof ExtensionTheme];

export interface ExtensionSettings {
    enabled: boolean;
    voice: DJVoice;
    style: DJStyle;
    customPrompt?: string;
    theme: ExtensionTheme;
}

export const THEME_COLORS: Record<ExtensionTheme, { bg: string, text: string, accent: string, border: string, secondary: string }> = {
    [ExtensionTheme.SYSTEM]: { bg: 'bg-white dark:bg-zinc-900', text: 'text-zinc-900 dark:text-zinc-100', accent: 'bg-blue-600', border: 'border-zinc-200 dark:border-zinc-800', secondary: 'text-zinc-500' },
    [ExtensionTheme.LIGHT]: { bg: 'bg-zinc-50', text: 'text-zinc-900', accent: 'bg-indigo-600', border: 'border-zinc-200', secondary: 'text-zinc-500' },
    [ExtensionTheme.DARK]: { bg: 'bg-zinc-900', text: 'text-zinc-100', accent: 'bg-indigo-500', border: 'border-zinc-800', secondary: 'text-zinc-400' },
    [ExtensionTheme.MIDNIGHT]: { bg: 'bg-slate-950', text: 'text-slate-50', accent: 'bg-violet-600', border: 'border-slate-800', secondary: 'text-slate-400' },
    [ExtensionTheme.SUNRISE]: { bg: 'bg-orange-50', text: 'text-stone-800', accent: 'bg-orange-500', border: 'border-orange-200', secondary: 'text-stone-500' },
    [ExtensionTheme.OCEAN]: { bg: 'bg-cyan-950', text: 'text-cyan-50', accent: 'bg-cyan-500', border: 'border-cyan-800', secondary: 'text-cyan-300' }
};
