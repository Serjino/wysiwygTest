import '@emotion/react';
import { ThemeInstance as CustomTheme } from './theme.def';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}