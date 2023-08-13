import React, { ReactNode } from 'react';
import './Badge.style.scss';

interface BadgeProps {
  count: number;
  children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ count, children }) => (
  <div className="badge-container">
    {children}
    {count > 0 && <span className="badge">{count}</span>}
  </div>
);

export { Badge };
