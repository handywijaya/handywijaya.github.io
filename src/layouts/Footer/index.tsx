import React, { useState, useRef, useCallback } from 'react';
import './styles.scss';

import PopupMessage from '../../components/PopupMessage';

import profile from './profile.jpg';
import gmail from './gmail.svg';
import linkedIn from './linkedIn.svg';
import facebook from './facebook.svg';
import instagram from './instagram.svg';

const Footer: React.FC = () => {
  const [copyBalloon, setCopyBalloon] = useState<{ shown: boolean, text: string }>({
    shown: false,
    text: 'Click to copy',
  });

  const email = 'handy.wijaya.p@gmail.com';
  const emailCopiedText = 'Copied!';
  const timeoutCopyBalloon = useRef<NodeJS.Timeout | null>(null);

  const toggleCopyBalloon = useCallback((value: boolean, text?: string) => {
    setCopyBalloon((prev) => ({
      shown: value,
      text: text || prev.text,
    }));

    if (!value && timeoutCopyBalloon.current) {
      clearTimeout(timeoutCopyBalloon.current);
      timeoutCopyBalloon.current = null;
    }
  }, []);

  const copyEmail = useCallback(() => {
    const textArea = document.createElement('input');
    textArea.style.position = 'fixed';
    textArea.style.top = '0px';
    textArea.style.left = 'calc(100vw - 50%)';
    textArea.style.zIndex = '-999';

    textArea.value = email;
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      toggleCopyBalloon(true, emailCopiedText);

      timeoutCopyBalloon.current = setTimeout(() => {
        toggleCopyBalloon(false);
      }, 1500);
    } catch (err) {
      toggleCopyBalloon(true, 'Oops cannot copy :(');
    }

    document.body.removeChild(textArea);
  }, [email, emailCopiedText, toggleCopyBalloon]);

  const hoverEmail = useCallback(() => {
    if (!timeoutCopyBalloon.current) {
      toggleCopyBalloon(true, 'Click to copy');
    }
  }, [toggleCopyBalloon]);

  const hoverEmailLeave = useCallback(() => {
    toggleCopyBalloon(false);
  }, [toggleCopyBalloon]);

  const openLinkedIn = () => window.open('https://www.linkedin.com/in/handy-wijaya-prajitno-a980b0125', '_blank');
  const openFb = () => window.open('https://www.facebook.com/handy.wijaya.p', '_blank');
  const openIg = () => window.open('https://www.instagram.com/handywijaya_', '_blank');

  return (
    <div className="Footer">
      <div className="Footer-content">
        <div className="Footer-profpic">
          <img className="Footer-profpic-img" src={profile} alt="profile" />
        </div>
        <div className="Footer-contacts">
          <div className="Footer-contacts-name">Handy Wijaya</div>
          <div className="Footer-contacts-caption">Traveling is my passion. Sports is my nutrient.</div>
          <div className="Footer-contacts-linebreak" />
          <div className="Footer-contacts-ic">
            <img
              className="Footer-contacts-ic-gmail"
              src={gmail}
              alt="gmail"
              onMouseOver={hoverEmail}
              onMouseLeave={hoverEmailLeave}
              onClick={copyEmail}
            />
            <img className="Footer-contacts-ic-linkedIn" src={linkedIn} alt="linkedIn" onClick={openLinkedIn} />
            <img className="Footer-contacts-ic-fb" src={facebook} alt="facebook" onClick={openFb} />
            <img className="Footer-contacts-ic-ig" src={instagram} alt="instagram" onClick={openIg} />
            <div className="Footer-popupMessage">
              <PopupMessage show={copyBalloon.shown} message={copyBalloon.text} bgColor="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="Footer-copyright">
        © Handy, 2024
      </div>
    </div>
  );
};

export default Footer;