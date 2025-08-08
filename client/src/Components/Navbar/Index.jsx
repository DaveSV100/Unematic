// import lightLogo from "../../assets/logo-light-new.png"
// import darkLogo from "../../assets/logo-dark-new.png"
// import logo from "../../assets/logo.png"
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ColorSchemeContext } from '../../Context/ColorSchemeProvider';
import './App.css';


const Navbar = () => {

    const navigate = useNavigate();

    const redirectToPortfolio = () => {
        navigate('/portfolio');
        closeMenu();
    }

    const colorScheme = useContext(ColorSchemeContext);

    // const logo = colorScheme === 'dark' ? darkLogo : lightLogo;
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

      const goHome = () => {
    navigate('/');
    closeMenu();
  };

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        closeMenu();
    }

      // unified handler: if we're on home, scroll directly, else navigate to home and pass the target id in state
  const goToSection = (e, targetId) => {
    e && e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    } else {
      // Navigate to home and pass which element we want to scroll to
      navigate('/', { state: { scrollTo: targetId } });
      closeMenu();
    }
  };
    
    return (
        <nav className={colorScheme}>
                <div className="img-container">
                    <a href="#" onClick={(e) => { e.preventDefault(); goHome(); }}>
                        {/* <img src={logo} className="logo" alt="Huastex logo" /> */}
                        <h2 className={`logo-title ${colorScheme} `}>Unematic</h2>
                    </a>
                </div>
                <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className={`bar ${colorScheme}2`}></div>
                    <div className={`bar ${colorScheme}2`}></div>
                </div>
                <ul className={`menu ${isOpen ? `open ${colorScheme}-open` : ''}`}>
        <li><a href="#" onClick={(e) => { e.preventDefault(); goHome(); }}>Home</a></li>
        <li><a href="#us" onClick={(e) => goToSection(e, 'us')}>Contacto</a></li>
        <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); closeMenu(); }}>Portfolio</a></li>
        <li><a href="#services" onClick={(e) => goToSection(e, 'services')}>Servicios</a></li>
        <li><a href="#whyUs" onClick={(e) => goToSection(e, 'whyUs')}>Por qué elegirnos</a></li>
        <li><a href="#contact" onClick={(e) => goToSection(e, 'contact')}>Solicita información</a></li>
      </ul>
                
        </nav>
    )
}
export default Navbar