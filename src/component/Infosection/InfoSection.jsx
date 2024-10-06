import React from "react";
import "./infosection.css"; // Link to the CSS file

function InfoSection() {
  return (
    <section>
      <div className="container">
        <div className="grid">
          {/* Left side image */}
          <div className="image-wrapper">
            <img
              alt="Nature"
              src="https://www.jamesedition.com/stories/wp-content/uploads/2022/10/10-1.jpg"
              className="image"
            />
          </div>

          {/* Right side content */}
          <div className="content-wrapper">
            <div className="content">
              <h2 className="heading">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore, debitis.
              </h2>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquid, molestiae! Quidem est esse numquam odio deleniti,
                beatae, magni dolores provident quaerat totam eos, aperiam
                architecto eius quis quibusdam fugiat dicta.
              </p>
              <a href="#" className="button">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
