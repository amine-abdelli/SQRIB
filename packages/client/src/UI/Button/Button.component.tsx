import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

function Button({
  text, onClick, secondary, stretch, style,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: secondary ? '#FFFFFF' : '', width: stretch ? '' : '100%', padding: '5px 15px', ...style,
      }}
      className={styles.primaryButton}
      type='submit'
    >
      {text}
    </button>
  );
}

export default Button;
