
import "./Footer.css";


function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-p">A guac-tastic game</p>
      <p className="copyrightText">© {currentYear} Copyright. Göteborg</p>
    </footer>
  );
}

export default Footer;