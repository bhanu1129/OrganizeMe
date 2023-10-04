import styles from '../Styles/Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import avatar from '../images/avatar.png';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        navigate('/login');
    }
    const handleWeatherClick = () => {
      navigate('/weather');
    };
    const handleCalculatorClick = () => {
      navigate('/calculator');
    }
    
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="logo"/>
      </div>

      <div className={styles.center}>
        <button onClick={handleWeatherClick}>Weather</button>
        <button onClick={handleCalculatorClick}>Calculator</button>
      </div>

      <div className={styles.right}>
        <button onClick={handleLogout}>Logout</button>
        <img src={avatar} alt="img"/>
      </div>
    </div>
  );
};

export default Navbar;
