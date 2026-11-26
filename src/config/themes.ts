import { DarkThemeId, LightThemeId, MetallicThemeId, ThemeChoice, ThemeMode } from '../types';

export interface ThemeMeta {
  id: ThemeMode;
  name: string;
  category: 'light' | 'dark' | 'metallic';
  isTasPick?: boolean;
  subtitle: string;
  previewBg: string;
  previewCard: string;
  previewAccent: string;
  previewText: string;
}

export const THEME_PALETTES: ThemeMeta[] = [
  // 2 Master Premium Metallic Themes (TAS Top Exclusive Picks)
  {
    id: 'full_shining_gold',
    name: 'Full Shining Golden Theme',
    category: 'metallic',
    isTasPick: true,
    subtitle: 'High-luxury glowing liquid gold, radiant metallic gold card outlines, charcoal typography',
    previewBg: '#FFF9E6',
    previewCard: '#FFFBF0',
    previewAccent: '#D4AF37',
    previewText: '#181303',
  },
  {
    id: 'full_shining_silver',
    name: 'Full Shining Silver Theme',
    category: 'metallic',
    isTasPick: true,
    subtitle: 'Reflective platinum-silver canvas, shimmering metallic chrome lines, silver card wrappers',
    previewBg: '#F1F5F9',
    previewCard: '#FFFFFF',
    previewAccent: '#94A3B8',
    previewText: '#0B1120',
  },

  // 10 Light Themes
  {
    id: 'royal_ivory',
    name: 'Royal Ivory',
    category: 'light',
    isTasPick: true,
    subtitle: 'Ivory white backgrounds, champagne gold accents, warm beige cards',
    previewBg: '#FAF8F5',
    previewCard: '#F3EFE6',
    previewAccent: '#B0891E',
    previewText: '#18201C',
  },
  {
    id: 'sage_serenity',
    name: 'Sage Serenity',
    category: 'light',
    subtitle: 'Soft sage green, pristine ivory canvas, muted olive borders',
    previewBg: '#F4F7F4',
    previewCard: '#EAF0EB',
    previewAccent: '#4A6B53',
    previewText: '#1A291E',
  },
  {
    id: 'pearl_majesty',
    name: 'Pearl Majesty',
    category: 'light',
    subtitle: 'Pearl white base matrix, polished silver dividers, subtle gray text frames',
    previewBg: '#F8F9FA',
    previewCard: '#FFFFFF',
    previewAccent: '#64748B',
    previewText: '#0F172A',
  },
  {
    id: 'celestial_blue',
    name: 'Celestial Blue',
    category: 'light',
    subtitle: 'Powder blue tint, cloud white cards, sleek silver accents',
    previewBg: '#F0F5FA',
    previewCard: '#FFFFFF',
    previewAccent: '#2563EB',
    previewText: '#0C1E3D',
  },
  {
    id: 'desert_sand',
    name: 'Desert Sand',
    category: 'light',
    subtitle: 'Sandstone ivory, warm cream text layers, brushed bronze indicators',
    previewBg: '#F9F6F0',
    previewCard: '#F2ECE1',
    previewAccent: '#A07855',
    previewText: '#2D1F12',
  },
  {
    id: 'lavender_grace',
    name: 'Lavender Grace',
    category: 'light',
    subtitle: 'Lavender hues, pearl backing, soft muted violet borders',
    previewBg: '#F7F5FA',
    previewCard: '#EFEBF5',
    previewAccent: '#7C3AED',
    previewText: '#231145',
  },
  {
    id: 'rose_quartz',
    name: 'Rose Quartz',
    category: 'light',
    subtitle: 'Blush pink matrix, ivory windows, delicate rose-gold lines',
    previewBg: '#FAF5F6',
    previewCard: '#F5EBEF',
    previewAccent: '#BE185D',
    previewText: '#3B0C20',
  },
  {
    id: 'andalusian_pearl',
    name: 'Andalusian Pearl',
    category: 'light',
    subtitle: 'Geometric white canvas, pale turquoise lines, antique gold trim',
    previewBg: '#F7FAF9',
    previewCard: '#EDF5F3',
    previewAccent: '#0D9488',
    previewText: '#102A24',
  },
  {
    id: 'mint_oasis',
    name: 'Mint Oasis',
    category: 'light',
    subtitle: 'Mint green, snow white card blocks, deep jade highlights',
    previewBg: '#F2FAF6',
    previewCard: '#E5F5ED',
    previewAccent: '#059669',
    previewText: '#0A2B1D',
  },
  {
    id: 'scholars_manuscript',
    name: "Scholar's Manuscript",
    category: 'light',
    isTasPick: true,
    subtitle: 'Antique paper texture, warm parchment cards, ink-brown text',
    previewBg: '#F5EFE6',
    previewCard: '#EADCC9',
    previewAccent: '#8B5A2B',
    previewText: '#3D2B1F',
  },

  // 10 Dark Themes
  {
    id: 'obsidian_black',
    name: 'Obsidian Dark & Royal Gold',
    category: 'dark',
    subtitle: 'Pure matte OLED black, brushed gold lines, ivory text (Default)',
    previewBg: '#09090B',
    previewCard: '#141417',
    previewAccent: '#D4AF37',
    previewText: '#FAF6EB',
  },
  {
    id: 'imperial_burgundy',
    name: 'Imperial Burgundy',
    category: 'dark',
    isTasPick: true,
    subtitle: 'Rich burgundy base, wine red layers, antique gold rules',
    previewBg: '#1C0202',
    previewCard: '#2B0606',
    previewAccent: '#D4AF37',
    previewText: '#FAF0E6',
  },
  {
    id: 'emerald_dynasty',
    name: 'Emerald Dynasty',
    category: 'dark',
    isTasPick: true,
    subtitle: 'Deep smoky forest jade-black, emerald cards, champagne gold rules',
    previewBg: '#020A06',
    previewCard: '#061A11',
    previewAccent: '#D4AF37',
    previewText: '#FAF6EB',
  },
  {
    id: 'graphite_titanium',
    name: 'Graphite Titanium',
    category: 'dark',
    subtitle: 'Graphite gray background, gunmetal panels, cool silver controls',
    previewBg: '#121316',
    previewCard: '#1B1D22',
    previewAccent: '#94A3B8',
    previewText: '#F1F5F9',
  },
  {
    id: 'cosmic_amethyst',
    name: 'Cosmic Amethyst',
    category: 'dark',
    subtitle: 'Deep velvet violet, cosmic purple clouds, soft lavender highlights',
    previewBg: '#0C061A',
    previewCard: '#170D30',
    previewAccent: '#A78BFA',
    previewText: '#FAF5FF',
  },
  {
    id: 'obsidian_leather',
    name: 'Obsidian Leather',
    category: 'dark',
    subtitle: 'Chocolate dark brown, deep espresso blocks, polished bronze trim',
    previewBg: '#120A06',
    previewCard: '#1D120B',
    previewAccent: '#CD7F32',
    previewText: '#FDF6E2',
  },
  {
    id: 'abyssal_teal',
    name: 'Abyssal Teal',
    category: 'dark',
    subtitle: 'Deep dark teal matrix, petrol blue layers, aquatic accents',
    previewBg: '#031214',
    previewCard: '#061D21',
    previewAccent: '#14B8A6',
    previewText: '#F0FDFA',
  },
  {
    id: 'black_copper',
    name: 'Black Copper',
    category: 'dark',
    subtitle: 'Near-black slate, industrial copper framing, burnt amber indicator lines',
    previewBg: '#0F1115',
    previewCard: '#1A1D24',
    previewAccent: '#D97706',
    previewText: '#FEF3C7',
  },
  {
    id: 'storm_sovereign',
    name: 'Storm Sovereign',
    category: 'dark',
    subtitle: 'Dark slate blue sky, dramatic storm gray cards, pale silver lines',
    previewBg: '#0A0F1D',
    previewCard: '#11192E',
    previewAccent: '#60A5FA',
    previewText: '#F0F9FF',
  },
  {
    id: 'arabian_dusk',
    name: 'Arabian Dusk',
    category: 'dark',
    isTasPick: true,
    subtitle: 'Deep desert brown shadow, midnight black cards, glowing desert gold trim',
    previewBg: '#140D07',
    previewCard: '#1F150D',
    previewAccent: '#E5A93C',
    previewText: '#FFFBEB',
  },
];

export const METALLIC_THEMES = THEME_PALETTES.filter((t) => t.category === 'metallic');
export const LIGHT_THEMES = THEME_PALETTES.filter((t) => t.category === 'light');
export const DARK_THEMES = THEME_PALETTES.filter((t) => t.category === 'dark');

export const METALLIC_THEME_IDS = new Set<string>(METALLIC_THEMES.map((t) => t.id));
export const LIGHT_THEME_IDS = new Set<string>(LIGHT_THEMES.map((t) => t.id));
export const DARK_THEME_IDS = new Set<string>(DARK_THEMES.map((t) => t.id));

export function isDarkThemeId(id: ThemeMode | ThemeChoice): boolean {
  if (id === 'system_default') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  }
  if (DARK_THEME_IDS.has(id)) return true;
  if (id === 'cosmic_nebula' || id === 'midnight_charcoal' || id === 'emerald_shadow') return true;
  if (id === 'warm_alabaster') return false;
  if (id === 'full_shining_gold' || id === 'full_shining_silver') return false;
  return false;
}

export function resolveEffectiveTheme(choice: ThemeChoice): ThemeMode {
  if (choice === 'system_default') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'obsidian_black'
        : 'royal_ivory';
    }
    return 'obsidian_black';
  }
  // Map legacy names
  if (choice === 'warm_alabaster') return 'royal_ivory';
  if (choice === 'cosmic_nebula') return 'cosmic_amethyst';
  if (choice === 'midnight_charcoal') return 'storm_sovereign';
  if (choice === 'emerald_shadow') return 'emerald_dynasty';
  return choice;
}

export function getThemeColor(theme: ThemeChoice): string {
  const effective = resolveEffectiveTheme(theme);
  const found = THEME_PALETTES.find((t) => t.id === effective);
  return found?.previewBg || '#09090B';
}
