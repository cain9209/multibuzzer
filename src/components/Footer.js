import React from 'react';
import { Container } from 'react-bootstrap';
import MaxD20 from '../Assets/MaxD20.png';

export function FooterSimple() {
  return (
    <div id="footer-simple">
      <p>Social</p>
      <div className="image-container">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ictrivia.com/"
        >
          <img
            src="./Max.jpg"
            alt="Built on open source"
            style={{ width: '180px', height: 'auto' }}
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/wsun/multibuzzer"
        >
          <img
            src="./MaxD20.png"
            alt="Built on open source"
            style={{ width: '80px', height: 'auto' }}
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/intelligencechecktrivia"
        >
          <img
            src="./Insta.jpg"
            alt="Built on open source"
            style={{ width: '80px', height: 'auto' }}
          />
        </a>
      </div>
    </div>
  );
}

/**
 * Footer component
 * @param {bool} mobileOnly - only display on mobile devices, <768 px
 */
export default function Footer({ mobileOnly = false }) {
  return (
    <footer className={mobileOnly ? 'd-block d-md-none' : null}>
      <Container>
        <div id="footer-simple">
          <p>Social</p>
          <div
            className="image-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/wsun/multibuzzer"
            >
              <img
                src="./IC Trivia FB Banner.png"
                alt="Built on open source"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '15px', // Rounded corners for app icon effect
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adds shadow effect
                  objectFit: 'cover', // Ensures the image fills the container properly
                  border: '1px solid #ddd', // Optional border for definition
                }}
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/wsun/multibuzzer"
            >
              <img
                src="./MaxD20.png"
                alt="D20"
                style={{
                  width: '50px',
                  height: '50px',
                }}
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/intelligencechecktrivia"
            >
              <img
                src="./Insta.jpg"
                alt="Instagram Profile"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '15px', // Rounded corners for app icon effect
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adds shadow effect
                  objectFit: 'cover', // Ensures the image fills the container properly
                  border: '1px solid #ddd', // Optional border for definition
                }}
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
