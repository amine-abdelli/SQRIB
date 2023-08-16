import { Spacer, SpacerSize } from "../../../../../../components";
import { Checkbox } from "../../../../../../components/Checkbox/Checkbox.component";
import { Text } from "../../../../../../components/Text/Text.component";
import { CheckboxWithLabelProps } from "./CheckboxWithLabel.props";
import './CheckboxWithLabel.style.scss';

export function CheckboxWithLabel({
  icon, label, subLabel, checked, onChange
}: CheckboxWithLabelProps) {
  return (
    <div className="button-group--wrapper checkbox-with-label--wrapper">
      <span className="checkbox-with-label--icon" >
        {icon}
      </span>
      <Spacer x size='small' />
      <div className='button-group--wrapper'>
        <div>
          <Text className='button-group--label'>{label}</Text>
          <Text p thin size={12} color="GrayText">{subLabel}</Text>
        </div>
        <Spacer x size={SpacerSize.SMALL} />
        <Checkbox checked={checked} onClick={onChange} />
      </div>
    </div>
  );
}