import { Dimensions } from "react-native";

export const BOTTOM_TAB_HEIGHT = 90
export const screenHeight = Dimensions.get('screen').height
export const screenWidth = Dimensions.get('screen').width
export const isBannerHeight = screenHeight * 0.4

// export const Colors = {
//     primary: '#ED3237',
//     primary_light: '#EF4F5F',
//     text: '#222',
//     active_light:'#ECFAF1',
//     secondary: '#2D2D2D',
//     tertiary: '#F4F4F2',
//     white: '#fff',
//     background_light:'#F4F6FC',
//     border: '#E5E9EF',
//     lightText: '#9197A6',
//     active: '#019A51',
//     dark: '#18171C'
// }
// export const Colors = {
//     // Primary (inspired by traditional Indian academia/royalty)
//     primary: '#1A4D8F',       // Deep navy blue (trust, stability)
//     primary_light: '#2D6BC5',  // Brighter academic blue
//     primary_gloss: 'rgba(42, 98, 188, 0.15)', // For glossy overlay effects
//     text: '#222',
//     // Secondary (inspired by Krishnadevaraya's Vijayanagara heritage)
//     secondary: '#C28F3D',     // Gold (prestige, excellence)
//     secondary_light: '#E8B75B', // Light gold for accents
//     secondary_gloss: 'rgba(194, 143, 61, 0.1)',

//     // Neutrals (professional clean look)
//     background: '#F5F7FA',     // Soft blue-gray background
//     card: '#FFFFFF',           // Pure white for cards/UI surfaces
//     border: '#E1E5EB',        // Very light gray borders
//     divider: '#EEF1F5',       // For subtle separations

//     // Text (optimized contrast)
//     text_primary: '#222222',   // Near-black for primary text
//     text_secondary: '#5A6473', // Gray-blue for secondary
//     text_tertiary: '#8C98A9', // Lighter for hints

//     // Status colors
//     success: '#2E7D32',       // Deep green (matches academic feel)
//     warning: '#FF8F00',       // Amber
//     error: '#D32F2F',         // Deep red
//     info: '#1A4D8F',          // Matching primary blue

//     // Dark mode alternatives
//     dark_background: '#121A26',
//     dark_card: '#1E2735',
//     dark_text: '#E0E5EE',

//     disabled:"#5A6473",
//     active_light:'#ECFAF1',
//     tertiary: '#F4F4F2',
//     white: '#fff',
//     background_light:'#F4F6FC',
//     lightText: '#9197A6',
//     active: '#019A51',
//     dark: '#18171C'
// }
export const Colors = {
  // 🎓 Primary Theme (Academic Blue)
  primary: '#1A4D8F',       // Main brand color - headers, buttons, icons
  primaryLight: '#2D6BC5',  // Hover or pressed state, highlights
  primaryGloss: 'rgba(42, 98, 188, 0.15)', // Overlay or subtle backgrounds

  // 🟡 Secondary Theme (Vijayanagara Gold)
  secondary: '#C28F3D',      // Highlights, accents, or section headings
  secondaryLight: '#E8B75B', // Lighter touch for icons/badges

  // ⚪ Neutral UI Colors (Professional & Clean)
  background: '#F5F7FA',     // App background
  backgroundLight: '#F4F6FC',// Alternate background for sections
  card: '#FFFFFF',           // Cards, modals, input containers
  border: '#E1E5EB',         // Light dividers, input borders
  divider: '#EEF1F5',        // Section separators

  // ✍️ Text Colors
  textPrimary: '#222222',    // Main body text
  textSecondary: '#5A6473',  // Subtext, placeholders
  textTertiary: '#8C98A9',   // Disabled text or hints

  // ✅ Status Colors
  success: '#2E7D32',        // For success messages, badges
  warning: '#FF8F00',        // For warnings, caution labels
  error: '#D32F2F',          // Errors, alerts, failed states
  info: '#1A4D8F',           // Info text/icons (same as primary)

  // 🌙 Dark Mode
  darkBackground: '#121A26', // Full-screen background in dark mode
  darkCard: '#1E2735',        // Card background in dark mode
  darkText: '#E0E5EE',        // Text in dark mode

  // 🔘 Misc Utility Colors
  white: '#FFFFFF',          // Text on dark, modals, etc.
  black: '#000000',
  lightText: '#9197A6',      // Placeholder or subtle UI elements
  active: '#019A51',         // Toggle ON or active status
  activeLight: '#ECFAF1',    // Background for active selection
  disabled: '#C4C4C4',       // Buttons or icons when disabled
};

export enum Fonts {
    Regular = 'Okra-Regular',
    Medium = 'Okra-Medium',
    Light = 'Okra-MediumLight',
    SemiBold = 'Okra-Bold',
    Bold = 'Okra-ExtraBold',
}

export const lightColors = [
    'rgba(255,255,255,1)',
    'rgba(255,255,255,0.9)',
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.003)',
];

export const darkWeatherColors = [
    'rgba(54, 67, 92, 1)',
    'rgba(54, 67, 92, 0.9)',
    'rgba(54, 67, 92, 0.8)',
    'rgba(54, 67, 92, 0.2)',
    'rgba(54, 67, 92, 0.0)',
];