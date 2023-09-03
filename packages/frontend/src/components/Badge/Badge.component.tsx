import React, { ReactNode } from 'react';
import './Badge.style.scss';

interface BadgeProps {
  count?: number;
  children: ReactNode;
  content?: string;
  x?: number;
  y?: number;
  padding?: number;
}

const Badge: React.FC<BadgeProps> = ({ count, children, content, x, y, padding }) => (
  <div className="badge-container">
    {children}
    {count && count > 0 && <span style={{ top: `${y}px`, right: `${x}px`, padding }} className="badge">{count}</span>}
    {content && <span style={{ top: `${y}px`, right: `${x}px`, padding }} className="badge">{content}</span>}
  </div>
);

export { Badge };
