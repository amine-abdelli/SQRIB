import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';
import { theme } from '../../../styles/theme';

function Button({
  text, onClick, secondary, stretch, style, disabled, light,
}: ButtonProps) {
  const lightButtonStyle = light ? {
    border: 'none',
    background: 'transparent',
    boxShadow: 'none',
    fontWeight: 400,
    color: theme.primary,
  } : {};
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: secondary ? '#FFFFFF' : '',
        width: stretch ? '' : '100%',
        padding: '5px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...lightButtonStyle,
        ...style,
      }}
      className={styles.primaryButton}
      type='submit'
    >
      {text}
    </button>
  );
}

export default Button;
