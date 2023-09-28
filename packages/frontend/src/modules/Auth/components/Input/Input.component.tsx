/* eslint-disable react/no-unstable-nested-components */
import React, { ChangeEvent, CSSProperties, useState } from 'react';
import { InfoCircle } from 'react-iconly';
import { Popover } from 'react-tiny-popover';
import { COLORS } from '../../../../theme/colors';

import './Input.style.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
  stretch?: boolean,
  state?: 'error' | 'success',
  helperColor?: string,
  helperText?: string | boolean,
  name: string,
  disabled?: boolean,
  fullWidth?: boolean,
  rightContent?: JSX.Element,
  style?: CSSProperties,
  label?: string,
}

function Input({
  onChange, placeholder, value, type, stretch, helperColor, helperText, name, disabled, fullWidth, label,
  rightContent, style
}: InputProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const rightContentStyle: CSSProperties = rightContent ? { display: 'flex', flexDirection: 'row' } : {};
  return (
    <div
      className={rightContent ? 'input' : ''}
      style={{
        position: 'relative', width: fullWidth ? '100%' : '', ...style, ...rightContentStyle,
      }}
    >
      {helperColor && helperText && (
        <Popover
          containerStyle={{ zIndex: '9999999999999999' }}
          isOpen={isPopoverOpen}
          positions={['top', 'left']} // preferred positions by priority
          content={(
            <div style={{
              border: `4px solid black`,
              backgroundColor: COLORS.ERROR,
              maxWidth: '200px',
              padding: '10px 20px',
              margin: '10px',
              color: disabled ? COLORS.GREY : COLORS.WHITE,
            }}
            >
              {helperText}
            </div>
          )}
        >
          <span
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
            style={{
              position: 'absolute', right: '5px', top: '55%', transform: 'translateY(-50%)',
            }}
          >
            <InfoCircle set="bold" primaryColor={helperColor === 'error' ? COLORS.ERROR : COLORS.SUCCESS} />
          </span>
        </Popover>
      )}
      {helperColor && !helperText && (
        <span
          style={{
            position: 'absolute', right: '5px', top: '55%', transform: 'translateY(-50%)',
          }}
        >
          <InfoCircle set="bold" primaryColor={helperColor === 'error' ? COLORS.ERROR : COLORS.SUCCESS} />
        </span>
      )}
      <label className='input-label' htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        style={{ width: stretch ? '' : '100%', border: rightContent ? 'none' : '' }}
        className={rightContent ? '' : 'input'}
        onChange={(e) => onChange && onChange(e)}
        type={type}
        value={value}
        name={name}
        disabled={disabled}
      />
      {rightContent && (
        <span>
          {rightContent}
        </span>
      )}
    </div>
  );
}

export { Input };
