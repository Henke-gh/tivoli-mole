
import "./Footer.css";


function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="copyrightText">© {currentYear} Copyright. Göteborg</p>
    </footer>
  );
}

export default Footer;