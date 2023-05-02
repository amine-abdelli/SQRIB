import React, { CSSProperties, useState } from 'react';
import { InfoCircle } from 'react-iconly';
import { Popover } from 'react-tiny-popover';
import './FormInput.style.scss';
import { InputProps } from './FormInput.props';

function FormInput({
  onChange, placeholder, value, type, stretch, helperColor, helperText, name, disabled, fullWidth,
  rightContent, style,
}: InputProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const rightContentStyle: CSSProperties = rightContent ? {
    display: 'flex', flexDirection: 'row', background: '#FFFFFF',
  } : {};
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
              border: '4px solid black',
              backgroundColor: '#FFFFFF',
              maxWidth: '200px',
              padding: '10px 20px',
              boxShadow: '2px 2px 0px black',
              margin: '10px',
              color: disabled ? 'grey' : 'black',
              fontWeight: 800,
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
            <InfoCircle set="bold" primaryColor={'red'} />
          </span>
        </Popover>
      )}
      {helperColor && !helperText && (
      <span
        style={{
          position: 'absolute', right: '5px', top: '55%', transform: 'translateY(-50%)',
        }}
      >
        <InfoCircle set="bold" primaryColor={'red'} />
      </span>
      )}
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

export { FormInput };
