import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

function Button({
  text, onClick, secondary, stretch,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: secondary ? '#FFFFFF' : '', width: stretch ? '' : '100%', padding: '5px 15px' }}
      className={styles.primaryButton}
      type='submit'
    >
      {text}
    </button>
  );
}

export default Button;
