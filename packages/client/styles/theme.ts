export interface ITheme {
  theme: string,
  primary: string,
  secondary: string,
  tertiary: string,
  quaternary: string,
  outline: string
}
export interface IThemes {
  DARK: ITheme,
  LIGHT: ITheme
}

// export const themes: IThemes = {
//   DARK: {
//     theme: 'dark',
//     primary: '#D69C5D',
//     secondary: '#0D4D4B',
//     tertiary: '#FFFFFF',
//     quaternary: '#A7D1CE4D',
//     outline: '#181818',
//   },
//   LIGHT: {
//     theme: 'light',
//     primary: '#D69C5D',
//     secondary: '#0D4D4B',
//     tertiary: '#FFFFFF',
//     quaternary: '#A7D1CE4D',
//     outline: '#181818',
//   },
// };

export const theme = {
  primary: '#D69C5D',
  secondary: '#0D4D4B',
  tertiary: '#FFFFFF',
  quaternary: '#A7D1CE4D',
  outline: '#181818',
  error: '#F31260',
  success: '#13A452',
};
