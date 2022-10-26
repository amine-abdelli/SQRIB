import React, { ChangeEvent, useState } from 'react';
import { InfoCircle } from 'react-iconly';
// import { usePopper } from 'react-popper';
import { theme } from '../../../styles/theme';
import Popover from '../Popover/Popover.component';
import styles from './Input.module.scss';

export interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
  type?: 'text' | 'password' | 'email' | 'username',
  stretch?: boolean,
  state?: 'error' | 'success',
  helperColor?: string,
  helperText?: string,
  name?: string
}

function Input({
  onChange, placeholder, value, type, stretch, helperColor, helperText, name,
}: InputProps) {
  // const [referenceElement, setReferenceElement] = useState<any>();
  // const [popperElement, setPopperElement] = useState<any>();
  // const { styles: poppoverStyle, attributes } = usePopper(referenceElement, popperElement);
  return (
    <div style={{ position: 'relative' }}>
      {helperColor === 'error' && helperText && (
        <span
          // ref={setReferenceElement}
          style={{
            position: 'absolute', right: '5px', top: '55%', transform: 'translateY(-50%)',
          }}
        >
          <InfoCircle set="bold" primaryColor={theme.error} />
        </span>
      )}
      {/* <span ref={setPopperElement} style={poppoverStyle.popper} {...attributes.popper}>HIHI</span> */}
      <input
        placeholder={placeholder}
        style={{ width: stretch ? '' : '100%' }}
        className={styles.input}
        onChange={(e) => onChange(e)}
        type={type}
        value={value}
        name={name}
      />
    </div>
  );
}

export default Input;
