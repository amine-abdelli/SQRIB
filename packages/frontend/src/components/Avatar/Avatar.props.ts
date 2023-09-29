export interface AvatarProps {
  username: string | JSX.Element;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
  avatarUrl?: string | null;
  color?: string | null;
  style?: React.CSSProperties;
  onClick?: () => void;
}
