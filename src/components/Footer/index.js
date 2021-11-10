// Import composant Link de react-router-dom
import { Link } from 'react-router-dom';

import './style.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer_navigation">
      <Link to="#">
        <p>Plan du site</p>
      </Link>
      <p>|</p>
      <Link to="#">
        <p>Contact</p>
      </Link>
      <p>|</p>
      <Link to="#">
        <p>Cookies</p>
      </Link>
    </div>
    <div className="footer_copyright">
      <p>CompostOns 2021 &copy; Tous droits réservés</p>
    </div>
  </footer>
);

export default Footer;
