import { useAuth } from '../hooks/useAuth';
import { NightsStay, WbSunny } from '@material-ui/icons';

const ToggleTheme = () => {
  const auth = useAuth();
  const handleTheme = e => {
    e.preventDefault();
    auth.toggleTheme();
  }

  return(
    auth.isThemeLight
      ? <WbSunny onClick={handleTheme}/>
      : <NightsStay onClick={handleTheme}/>
  )
}

export default ToggleTheme;
