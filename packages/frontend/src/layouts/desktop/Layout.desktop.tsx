import React from 'react';
import '../../theme/components/_layout.scss';

export type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className='layout'>
      {children}
    </div>
  );
}

export { Layout };
