import { Spacer, SpacerSize } from "../../../../../../components";
import { Button } from "../../../../../../components/Button/Button.component";
import { CardButton } from "../../../../../../components/CardButton/CardButton.component";
import { WordsCollectionLayout, WordsType } from "../../../../../../components/Options/Options.props";
import Select from "../../../../../../components/Select/Select.component";
import { Text } from "../../../../../../components/Text/Text.component";
import { COLORS } from "../../../../../../theme/colors";
import { OptionProps } from "./OptionGroup.props";
import './OptionGroup.style.scss';

export function OptionIcon({ icon }: any) {
  return (
    <span className="option-icon">
      {icon}
    </span>
  )
}

export function ModeOptionGroup({
  icon, options, selected, setSelected, subLabel
}: OptionProps) {
  return (
    <div className="button-group-container">
      <Spacer x size='small' />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '2rem', display: 'flex', justifyContent: 'center', background: COLORS.WHITE, height: '2rem', alignItems: 'center', borderRadius: '50px' }}>
          {icon}
        </span>
        <Spacer x size='small' />
        <Text size={24}>Mode Selection</Text>
      </div>
      <Spacer y size={SpacerSize.SMALL} />
      <div className="button-group mode-button-container">
        {options.map(({ label, value, subLabel }, i) => (
          <>
            <CardButton
              style={{ background: selected === value ? COLORS.WHITE : 'lightgrey', border: `${selected === value ? 3 : 1}px solid black`, marginRight: '1rem' }}
              classNames="mode-button"
              color={selected === value ? COLORS.GOLD : ''}
              onClick={() => setSelected(value)}
              subLabel={subLabel}
              label={label}
            />
            {i === 0 ? <Spacer x size={SpacerSize.SMALL} /> : null}
          </>
        ))}
      </div>
    </div>
  );
}

export function OptionGroup({
  icon, label, options, selected, setSelected, subLabel, select
}: OptionProps) {
  return (
    <div style={{ padding: '0 0.5rem', background: '#f5f5f5', height: '3rem', borderRadius: '5px', marginBottom: '0.5rem' }} className="button-group--wrapper">
      <span style={{ width: '2rem', display: 'flex', justifyContent: 'center', background: COLORS.WHITE, height: '2rem', alignItems: 'center', borderRadius: '50px' }}>
        {icon}
      </span>
      <Spacer x size='small' />
      <div className='button-group--wrapper' style={{ height: '75%' }}>
        <div>
          <p className='button-group--label'>{label}</p>
          <p style={{ fontSize: '12px', color: 'GrayText', fontWeight: 300 }}>{subLabel}</p>
        </div>
        <Spacer x size={SpacerSize.LARGE} />
        <div className="button-group" style={{ background: 'lightgrey', height: '100%', padding: '0.1rem', borderRadius: '5px' }}>
          {select ? <Select data={options} onChange={setSelected} value={selected} stretch />
            : options.map(({ label, value }) => (
              <Button
                style={{ background: selected === value ? COLORS.WHITE : '', border: selected === value ? '1px solid black' : '',padding: '0.8rem', borderRadius: '5px' }}
                color={selected === value ? COLORS.GOLD : ''}
                onClick={() => setSelected(value)}
                light
                label={label}
                disabled={value === WordsType.QUOTE || value === WordsType.CUSTOM || value === WordsCollectionLayout.HORIZONTAL}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
