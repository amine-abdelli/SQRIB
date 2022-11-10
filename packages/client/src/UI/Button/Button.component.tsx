import { CSSProperties } from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

function Button({
  text, onClick, secondary, stretch, style, disabled, light, className,
  color,
}: ButtonProps) {
  const lightButtonStyle: CSSProperties = light ? {
    border: 'none',
    background: 'transparent',
    boxShadow: 'none',
    fontWeight: 400,
    padding: 0,
    margin: '0 4px',
    // color: theme.primary,
  } : {};
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: secondary ? '#FFFFFF' : '',
        width: stretch ? '' : '100%',
        padding: '5px 15px',
        color,
        ...lightButtonStyle,
        ...style,
      }}
      className={`${styles.primaryButton} ${className}`}
      type='submit'
    >
      {text}
    </button>
  );
}

export default Button;
