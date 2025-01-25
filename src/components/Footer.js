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
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ictrivia.com/"
            >
              <img
                src="./Max.jpg"
                alt="Built on open source"
                style={{ width: '170px', height: '80px' }}
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
                style={{ width: '100px', height: 'auto' }}
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
                style={{ width: '100px', height: 'auto' }}
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
