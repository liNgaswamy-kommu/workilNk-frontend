import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>WorkiLnk</h3>
        <p>Connecting people with trusted local help.</p>

        <div className="footer-links">
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} WorkiLnk. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
