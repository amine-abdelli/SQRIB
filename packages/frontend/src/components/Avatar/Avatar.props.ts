export interface AvatarProps {
  username: string | JSX.Element;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  avatarUrl?: string | null;
}
