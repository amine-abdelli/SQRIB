import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

function Button({
  text, onClick, secondary, stretch, style, disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: secondary ? '#FFFFFF' : '',
        width: stretch ? '' : '100%',
        padding: '5px 15px',
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={styles.primaryButton}
      type='submit'
    >
      {text}
    </button>
  );
}

export default Button;
