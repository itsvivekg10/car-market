import React from "react";

const Footer = () => {
  const footerStyle = {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f7f7f7",
  };

  const logoStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  };

  const logoImgStyle = {
    width: "50px",
    marginRight: "10px",
  };

  const descriptionStyle = {
    marginBottom: "20px",
    color: "#555",
  };

  const linkListStyle = {
    listStyle: "none",
    padding: "0",
  };

  const linkItemStyle = {
    display: "inline",
    margin: "0 10px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
  };

  const socialStyle = {
    margin: "0 10px",
    color: "#333",
  };

  const socialIconStyle = {
    fontSize: "20px",
  };

  return (
    <footer style={footerStyle}>
      <div style={logoStyle}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Fg85DWsveLUGeGEgbjIvxZx5c3UXuvoNhQ&s"
          alt="Logo"
          style={logoImgStyle}
        />
        <p>carmarketplace</p>
      </div>
      <div style={descriptionStyle}>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <p>Incidunt consequuntur amet culpa cum itaque neque.</p>
      </div>
      <div className="footer-links">
        <nav>
          <ul style={linkListStyle}>
            <li style={linkItemStyle}>
              <a href="#about" style={linkStyle}>
                About
              </a>
            </li>

            <li style={linkItemStyle}>
              <a href="#services" style={linkStyle}>
                Services
              </a>
            </li>

            <li style={linkItemStyle}>
              <a href="#blog" style={linkStyle}>
                Blog
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-social">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={socialStyle}
        >
          <i className="fab fa-facebook" style={socialIconStyle}></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={socialStyle}
        >
          <i className="fab fa-instagram" style={socialIconStyle}></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={socialStyle}
        >
          <i className="fab fa-twitter" style={socialIconStyle}></i>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={socialStyle}
        >
          <i className="fab fa-github" style={socialIconStyle}></i>
        </a>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noopener noreferrer"
          style={socialStyle}
        >
          <i className="fab fa-dribbble" style={socialIconStyle}></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
