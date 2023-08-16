import { Header, NavLinks } from './SubComponent';
import { Spacer, SpacerSize } from '../Spacer';
import { Cross as ClosingCross } from './SubComponent/Cross/Cross.component';
import './SideBar.style.scss';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import { SideBarProps } from './SideBar.props';
import { useModal } from '../../contexts/ModalContext';
import { MODAL_ID } from '../Modals/modals.constants';
import { Button } from '../Button/Button.component';
import { useAuthContext } from '../../contexts/AuthContext';

function SideBar({ isMenuOpen, setIsMenuOpen }: SideBarProps) {
  const { isMediumScreen } = useWindowSize();
  const { isAuthenticated, logout } = useAuthContext()
  const shouldBeVisible = isMenuOpen && isMediumScreen;
  const { openModal } = useModal()
  return (
    !(!isMenuOpen && isMediumScreen) ? (
      <nav className='sidebar'>
        <span>
          <ClosingCross isVisible={shouldBeVisible} onClick={() => setIsMenuOpen(false)} />
          <Header />
          <Spacer size={SpacerSize.LARGE} />
          <NavLinks />
        </span>
        {isAuthenticated ?
          <Button onClick={() => logout()}>Logout</Button> :
          <span>
            <Button onClick={() => openModal(MODAL_ID.LOGIN)}>Login</Button>
            <Spacer y size={SpacerSize.SMALL} />
            <Button secondary onClick={() => openModal(MODAL_ID.SIGNUP)}>Signup</Button>
          </span>
        }
      </nav>
    ) : <></>
  );
}

export { SideBar };
