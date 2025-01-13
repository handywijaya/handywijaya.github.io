import React, { useState, useRef, useCallback } from 'react';
import './_styles.css';

import PopupMessage from '../../components/PopupMessage';

import profile from './profile.jpg';
import gmail from './gmail.svg';
import linkedIn from './linkedIn.svg';
import github from './github.png';

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
  const openGithub = () => window.open('https://github.com/handywijaya', '_blank');

  return (
    <div className="flex justify-between items-center 
      min-h-footer-height box-border p-[20px] 
      bg-black shadow-black text-white">
      <div className="flex justify-center">
        <div>
          <img className="w-[100px]" src={profile} alt="profile" />
        </div>
        <div className="ml-[10px] flex flex-col justify-center relative">
          <div className="font-normal">Handy Wijaya</div>
          <div className="font-extralight">Traveling is my passion. Sports is my nutrient.</div>
          <div className="border-t border-t-[rgba(0,0,0,0.5)] shadow-white my-[10px]" />
          <div className="ic">
            <img src={gmail} alt="gmail" onMouseOver={hoverEmail} onMouseLeave={hoverEmailLeave} onClick={copyEmail} />
            <img src={linkedIn} alt="linkedIn" onClick={openLinkedIn} />
            <img src={github} alt="github" onClick={openGithub} />
            <div className="absolute text-black">
              <PopupMessage show={copyBalloon.shown} message={copyBalloon.text} bgColor="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-[12px] mt-[10px]">
        © Handy, 2024
      </div>
    </div>
  );
};

export default Footer;