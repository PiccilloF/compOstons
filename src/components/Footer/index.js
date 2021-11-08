// Import composant Link de react-router-dom
import { Link } from 'react-router-dom';

import './style.scss';

const Footer = () => {
  console.log('test composant footer');

  return (
    <footer className="footer">
      <div className="footer_navigation">
        <Link to="#">
          <p>Plan du site</p>
        </Link>
        <Link to="#">
          <p>Contact</p>
        </Link>
        <Link to="#">
          <p>Confidentialité & Cookies</p>
        </Link>
      </div>
      <div className="footer_copyright">
        <p>CompostOns 2021 &copy; Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;
