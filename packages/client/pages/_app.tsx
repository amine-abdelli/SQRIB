// import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Layout from '../src/components/Layout/Layout';
import Nav from '../src/components/Nav/Nav';
import SideBar from '../src/components/SideBar/SideBar';
import { themes } from '../styles/theme';
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import styles from '../styles/_app.module.scss';
import { Position } from '../src/components/SideBar/SideBar.enum';
import Modal from '../src/components/ModeSelectionModal/Modal';
import { Language } from '../src/helpers/Language.enum';
import ModeSelection from '../src/components/ModeSelectionModal/ModeSelection';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<any>(themes.LIGHT)
  const [fontSize, setFontSize] = useState<number>(0);
  const [navigationState, setNavigationState] = useState<any>('Main');
  const [showModeSelection, setShowModeSelection] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<null | number>(null);
  const [language, setLanguage] = useState(Language.FR);
  const router = useRouter();

  function onGameModeSelection(selectedMode: number) {
    setGameMode(selectedMode)
    setShowModeSelection(false);
  }

  return (
    <>
      <Layout theme={theme}>
        <Nav theme={theme} />
        <div style={{ display: 'flex' }}>
          <SideBar position={Position.LEFT} navigationState={navigationState} theme={theme} />
          <div className={styles.componentWrapper}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              <Component 
              language={language} {...pageProps} router={router} setNavigationState={setNavigationState} setFontSize={setFontSize} fontSize={fontSize} theme={theme} gameMode={gameMode} setShowModeSelection={setShowModeSelection} />
            </div>
          </div>
          <SideBar setShowModeSelection={setShowModeSelection} setLanguage={setLanguage} position={Position.RIGHT} setFontSize={setFontSize} setTheme={setTheme} theme={theme} />
        </div>
      </Layout>
      {/* Selection mode modal */}
      <Modal 
        showModeSelection={showModeSelection}
        setShowModeSelection={setShowModeSelection}
        gameMode={gameMode}
        content={<ModeSelection onGameModeSelection={onGameModeSelection} theme={theme}/>}
      />
    </>
  )
}

export default MyApp