export interface ITheme {
  theme: string,
  primary: string,
  secondary: string,
  tertiary: string,
}
export interface IThemes {
  DARK: ITheme,
  LIGHT: ITheme
}

export const themes: IThemes = {
  DARK: {
    theme: 'dark',
    primary: '#343434',
    secondary: '#dfdad2',
    tertiary: '#FF8C00',

  },
  LIGHT: {
    theme: 'light',
    primary: '#dfdad2',
    secondary: '#343434',
    tertiary: '#FF8C00',
  },
};
