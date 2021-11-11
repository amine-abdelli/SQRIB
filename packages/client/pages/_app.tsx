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


function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<any>(themes.LIGHT)
  const [fontSize, setFontSize] = useState<number>(0);
  const [navigationState, setNavigationState] = useState<any>('Main');
  const [language, setLanguage] = useState('fr');
  const router = useRouter();


  return (
    <Layout theme={theme}>
      <Nav theme={theme} />
      <div style={{ display: 'flex' }}>
        <SideBar position={Position.LEFT} navigationState={navigationState} theme={theme} />
        <div className={styles.componentWrapper} >
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <Component language={language} {...pageProps} router={router} setNavigationState={setNavigationState} setFontSize={setFontSize} fontSize={fontSize} theme={theme} />
          </div>
        </div>
        <SideBar setLanguage={setLanguage} position={Position.RIGHT} setFontSize={setFontSize} setTheme={setTheme} theme={theme} />
      </div>
    </Layout>

  )
}

export default MyApp