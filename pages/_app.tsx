import 'tailwindcss/tailwind.css';
import KeyBoard from '../components/KeyBoard/KeyBoard';
import '../styles/globals.css';
import { Main } from './Main/Main';


function MyApp() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <div style={{ width: '65vw', height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Main />
        <KeyBoard />
      </div>
    </div>
  )
}
export default MyApp
