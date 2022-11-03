export interface ITheme {
  theme: string,
  primary: string,
  secondary: string,
  tertiary: string,
  quaternary: string,
  outline: string
}

export const theme: Record<string, string> = {
  primary: '#D69C5D',
  secondary: '#0D4D4B',
  tertiary: '#FFFFFF',
  quaternary: '#A7D1CE4D',
  outline: '#181818',
  error: '#E96062',
  success: '#13A452',
};
