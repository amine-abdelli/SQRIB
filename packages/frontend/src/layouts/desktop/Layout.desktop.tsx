import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SideBar } from '../../components/SideBar/SideBar.component';
import '../../theme/components/_layout.scss';
import Button from '../../components/Button/Button.component';
import { useWindowSize } from '../../hooks/useWindowSize.hook';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const { isMediumScreen } = useWindowSize();
  const props = { isMenuOpen, setIsMenuOpen };
  // State to track whether the component has initially mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Close the mobile menu when user navigate to another page
  useEffect(() => {
    // Check if the component has initially mounted
    if (hasMounted) {
      setIsMenuOpen(false);
    } else {
      setHasMounted(true);
    }
  }, [useLocation().pathname]);

  return (
    <div className='layout'>
      <Button className={`${(!isMediumScreen || isMenuOpen) ? 'hidden' : ''}`} secondary stretch onClick={() => setIsMenuOpen(true)} label='MENU' />
      <SideBar {...props} />
      {children}
    </div>
  );
}

export { Layout };
