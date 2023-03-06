export interface RadioProps {
  value: any,
  onChange: (value: any) => void,
  label: string | number | JSX.Element,
  checked?: boolean
}
