import React, { useCallback, useRef, useState } from 'react'
import './_styles.css'

import PopupMessage from '../../../../shared/components/PopupMessage'
import Constant from '../../../../shared/utils/const'

import profile from '../../../../shared/assets/footer/profile.jpg'
import gmail from '../../../../shared/assets/footer/gmail.svg'
import linkedIn from '../../../../shared/assets/footer/linkedIn.svg'
import github from '../../../../shared/assets/footer/github-black.png'

const Footer: React.FC = () => {
  const [copyBalloon, setCopyBalloon] = useState({
    shown: false,
    text: 'Click to copy',
  })

  const email = 'handy.wijaya.p@gmail.com'
  const emailCopiedText = 'Copied!'
  const timeoutCopyBalloon = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggleCopyBalloon = useCallback((value: boolean, text?: string) => {
    setCopyBalloon((prev) => ({
      shown: value,
      text: text || prev.text,
    }))

    if (!value && timeoutCopyBalloon.current) {
      clearTimeout(timeoutCopyBalloon.current)
      timeoutCopyBalloon.current = null
    }
  }, [])

  const copyEmail = useCallback(() => {
    const textArea = document.createElement('input')
    textArea.style.position = 'fixed'
    textArea.style.top = '0px'
    textArea.style.left = 'calc(100vw - 50%)'
    textArea.style.zIndex = '-999'

    textArea.value = email
    document.body.appendChild(textArea)

    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      toggleCopyBalloon(true, emailCopiedText)

      timeoutCopyBalloon.current = setTimeout(() => {
        toggleCopyBalloon(false)
      }, 1500)
    } catch {
      toggleCopyBalloon(true, 'Oops cannot copy :(')
    }

    document.body.removeChild(textArea)
  }, [email, emailCopiedText, toggleCopyBalloon])

  const hoverEmail = useCallback(() => {
    if (!timeoutCopyBalloon.current) {
      toggleCopyBalloon(true, 'Click to copy')
    }
  }, [toggleCopyBalloon])

  const hoverEmailLeave = useCallback(() => {
    toggleCopyBalloon(false)
  }, [toggleCopyBalloon])

  const openLinkedIn = () =>
    window.open(
      'https://www.linkedin.com/in/handy-wijaya-prajitno-a980b0125',
      '_blank'
    )
  const openGithub = () => window.open('https://github.com/handywijaya', '_blank')

  return (
    <footer id="site-footer" className="mt-auto bg-[#f8f8f6]">
      <div className="relative mx-auto max-w-6xl px-5 py-3 md:px-8">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-4">
          <div className="relative shrink-0">
            <div
              className="absolute -bottom-1 -right-1 -z-0 h-10 w-10 rounded-lg bg-[#f5d547]"
              aria-hidden
            />
            <img
              className="relative z-[1] h-14 w-14 rounded-lg object-cover shadow-sm md:h-16 md:w-16"
              src={profile}
              alt="Handy Wijaya"
            />
          </div>

          <div className="relative min-w-0 flex-1 text-center md:text-left">
            <blockquote className="mb-2 font-serif text-xs italic leading-snug text-neutral-800 md:text-sm">
              Traveling is my passion. Sports is my nutrient.
            </blockquote>

            <div className="ic relative mx-auto flex w-max flex-wrap items-center md:mx-0">
              <img
                src={gmail}
                alt="Copy email"
                onMouseOver={hoverEmail}
                onMouseLeave={hoverEmailLeave}
                onClick={copyEmail}
              />
              <img
                src={linkedIn}
                alt="LinkedIn"
                onClick={openLinkedIn}
              />
              <img src={github} alt="GitHub" onClick={openGithub} />
              <div className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 text-black md:left-0 md:translate-x-0">
                <PopupMessage
                  show={copyBalloon.shown}
                  message={copyBalloon.text}
                  bgColor="white"
                />
              </div>
            </div>

            <p className="mt-2 text-[9px] leading-relaxed text-neutral-400 md:text-[10px]">
              © 2026 Handy Wijaya. All photographic rights reserved.
            </p>
          </div>
        </div>
        <span className="pointer-events-none absolute bottom-2 right-5 text-[9px] text-neutral-400 md:right-8 md:text-[10px]">
          v{Constant.VERSION}
        </span>
      </div>
    </footer>
  )
}

export default Footer
