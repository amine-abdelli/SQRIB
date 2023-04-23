import { Header, NavLinks } from './SubComponent';
import { Spacer, SpacerSize } from '../Spacer';
import { Cross as ClosingCross } from './SubComponent/Cross/Cross.component';
import './SideBar.style.scss';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import { SideBarProps } from './SideBar.props';

function SideBar({ isMenuOpen, setIsMenuOpen }: SideBarProps) {
  const { isMediumScreen } = useWindowSize();
  const shouldBeVisible = isMenuOpen && isMediumScreen;
  return (
    !(!isMenuOpen && isMediumScreen) ? (
      <nav className='sidebar'>
        <ClosingCross isVisible={shouldBeVisible} onClick={() => setIsMenuOpen(false)} />
        <Header />
        <Spacer size={SpacerSize.LARGE} />
        <NavLinks />
        {/* <Footer /> */}
      </nav>
    ) : <></>
  );
}

export { SideBar };
