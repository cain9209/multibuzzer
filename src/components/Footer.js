import React from 'react';
import { Container } from 'react-bootstrap';

export function FooterSimple() {
  return (
    <div id="footer-simple">
      <p>GitHubCreator</p>
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
        <div>
          Built on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/wsun/multibuzzer"
          >
            open source
          </a>
        </div>
      </Container>
    </footer>
  );
}
