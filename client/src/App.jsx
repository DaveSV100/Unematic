import { useRoutes, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Index'
import Body from './Components/Body/Index'
import Email from './Components/Form/Index'
import Footer from './Components/Footer/Index'
import Link from './Pages/Link/index.jsx'
import Portfolio from './Pages/Portfolio/index.jsx'
import './App.css'

// Home component that includes Body, Email, and Footer
const Home = () => {
  return (
    <>
      <Body />
      <Email />
      <Footer />
    </>
  );
};

// Portfolio page component that includes Email and Footer
const PortfolioPage = () => {
  return (
    <>
      <Portfolio />
      <Email />
      <Footer />
    </>
  );
};

function App() {
  const AppRoutes = () => {
    let routes = useRoutes([
      { path: '/', element: <Home /> },
      { path: '/link/278', element: <Link /> },
      { path: '/portfolio', element: <PortfolioPage /> },
    ]);
    return routes;
  };
  return (
    <>
    <BrowserRouter>
    <Navbar />
          <AppRoutes />
    </BrowserRouter>
          
    </>
  )
}

export default App
