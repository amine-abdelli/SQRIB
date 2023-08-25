export type OptionItem = {
  // Can be a string, a number, jsx or anything else
  value: any;
  label: any;
  subLabel?: string;
};

export interface OptionProps {
  icon?: any,
  options: Array<OptionItem>;
  selected: string | number,
  setSelected: any,
  label: string,
  subLabel?: string,
  select?: boolean
}