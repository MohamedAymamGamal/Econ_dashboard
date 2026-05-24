import { definePreset } from '@primeuix/themes';
import material from '@primeuix/themes/material';

export const Preset = definePreset(material, {
  semantic: {
    colorScheme: {
        primary: {
          50: '#ffeffc',
          100: '#ffdcf8',
          200: '#ffcaf5',
          300: '#ffb3f1',
          400: '#f59df0',
          500: '#e382f9',
          600: '#c56af0',
          700: '#b388eb',
          800: '#9a52ff',
          900: '#8447ff',
          950: '#5d2de0',
        },

        surface: {
          0: '#ffffff',
          50: '#fff9fd',
          100: '#ffeffc',
          200: '#f8ddff',
          300: '#f0c8ff',
          400: '#e7b0ff',
          500: '#d79bff',
          600: '#c07cff',
          700: '#9a52ff',
          800: '#8447ff',
          900: '#5f35c7',
          950: '#2d1b4d',
        },
      },



  },
});
