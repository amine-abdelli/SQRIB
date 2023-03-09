/* eslint-disable react/no-unstable-nested-components */
import React, { ChangeEvent, CSSProperties, useState } from 'react';
import { InfoCircle } from 'react-iconly';
import { Popover } from 'react-tiny-popover';
import { theme } from '../../../styles/theme';
import styles from './Input.module.scss';

export interface InputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
  type?: 'text' | 'password' | 'email' | 'username',
  stretch?: boolean,
  state?: 'error' | 'success',
  helperColor?: string,
  helperText?: string | boolean,
  name?: string,
  disabled?: boolean,
  fullWidth?: boolean,
  rightContent?: JSX.Element,
  style?: CSSProperties
}

function Input({
  onChange, placeholder, value, type, stretch, helperColor, helperText, name, disabled, fullWidth,
  rightContent, style,
}: InputProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const rightContentStyle: CSSProperties = rightContent ? {
    display: 'flex', flexDirection: 'row', background: theme.tertiary,
  } : {};
  return (
    <div
      className={rightContent ? styles.input : ''}
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
              border: `4px solid ${theme.outline}`,
              backgroundColor: theme.tertiary,
              maxWidth: '200px',
              padding: '10px 20px',
              boxShadow: `2px 2px 0px ${theme.outline}`,
              margin: '10px',
              color: disabled ? 'grey' : theme.outline,
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
            <InfoCircle set="bold" primaryColor={theme[helperColor]} />
          </span>
        </Popover>
      )}
      {helperColor && !helperText && (
      <span
        style={{
          position: 'absolute', right: '5px', top: '55%', transform: 'translateY(-50%)',
        }}
      >
        <InfoCircle set="bold" primaryColor={theme[helperColor]} />
      </span>
      )}
      <input
        placeholder={placeholder}
        style={{ width: stretch ? '' : '100%', border: rightContent ? 'none' : '' }}
        className={rightContent ? '' : styles.input}
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

export default Input;
