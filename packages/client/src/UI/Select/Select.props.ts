export interface SelectProps {
  onChange: (value: any) => void,
  value: string | number,
  data: SelectData[]
}
interface SelectData {
  label: string | number,
  value: string | number }
