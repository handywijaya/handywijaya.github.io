import React from 'react'
import './styles.scss'

import PopupMessage from '../../components/PopupMessage'

import profile from './profile.jpg'
import gmail from './gmail.svg'
import linkedIn from './linkedIn.svg'
import facebook from './facebook.svg'
import instagram from './instagram.svg'

interface State {
  copyBalloon: CopyBalloon
}

interface CopyBalloon {
  shown: boolean
  text: string
}

class Footer extends React.Component<{}, State> {
  _copyEmail: () => void
  _hoverEmail: () => void
  _hoverEmailLeave: () => void
  _openLinkedIn: () => void
  _openFb: () => void
  _openIg: () => void
  timeoutCopyBalloon?: NodeJS.Timeout
  email: string
  emailHoverText: string
  emailCopiedText: string
  
  constructor (props: any) {
    super(props)
    this.email = 'handy.wijaya.p@gmail.com'
    this.emailHoverText = 'Click to copy'
    this.emailCopiedText = 'Copied!'
    this._copyEmail = this.copyEmail.bind(this)
    this._hoverEmail = this.hoverEmail.bind(this)
    this._hoverEmailLeave = this.hoverEmailLeave.bind(this)
    this._openLinkedIn = this.openLinkedIn.bind(this)
    this._openFb = this.openFb.bind(this)
    this._openIg = this.openIg.bind(this)

    this.timeoutCopyBalloon = undefined

    this.state = {
        copyBalloon: {
            shown: false,
            text: this.emailHoverText
        }
    }
  }

  copyEmail () {
    let textArea = document.createElement("input")
    textArea.style.position = 'fixed'
    textArea.style.top = '0px'
    textArea.style.left = 'calc( 100vw - 50%)'
    textArea.style.zIndex = '-999'

    textArea.value = this.email
    document.body.appendChild(textArea)

    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy')
        this.toggleCopyBalloon(true, this.emailCopiedText)

        this.timeoutCopyBalloon = setTimeout(() => {
            this.toggleCopyBalloon(false, this.emailCopiedText)
        }, 1500)
    } catch (err) {
        this.toggleCopyBalloon(true, 'Oops cannot copy :(')
    }
    
    if (textArea) {
        document.body.removeChild(textArea)
    }
  }

  hoverEmail () {
    if (!this.timeoutCopyBalloon) { // toggle if copied! text is not shown
      this.toggleCopyBalloon(true, this.emailHoverText)
    }
  }

  hoverEmailLeave () {
    this.toggleCopyBalloon(false)
  }

  openLinkedIn () {
    window.open('https://www.linkedin.com/in/handy-wijaya-prajitno-a980b0125', '_blank')
  }

  openFb () {
    window.open('https://www.facebook.com/handy.wijaya.p','_blank')
  }

  openIg () {
    window.open('https://www.instagram.com/handywijaya_', '_blank')
  }

  toggleCopyBalloon (value: boolean, text?: string) {
    let { copyBalloon } = { ...this.state }
    copyBalloon.shown = value
    copyBalloon.text = text || copyBalloon.text

    if (!value && this.timeoutCopyBalloon) {
      // reset timeout so it can be hovered again
      clearTimeout(this.timeoutCopyBalloon)
      this.timeoutCopyBalloon = undefined
    }

    this.setState({ copyBalloon })
  }

  render () {
    let { copyBalloon } = this.state
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
              <img className="Footer-contacts-ic-gmail" src={gmail} alt="gmail" onMouseOver={this._hoverEmail} onMouseLeave={this._hoverEmailLeave} onClick={this._copyEmail}/>
              <img className="Footer-contacts-ic-linkedIn" src={linkedIn} alt="linkedIn" onClick={this._openLinkedIn}/>
              <img className="Footer-contacts-ic-fb" src={facebook} alt="facebook" onClick={this._openFb} />
              <img className="Footer-contacts-ic-ig" src={instagram} alt="instagram" onClick={this._openIg} />
              <div className="Footer-popupMessage">
                <PopupMessage show={copyBalloon.shown} message={copyBalloon.text} bgColor='white' />
              </div>
            </div>
          </div>
        </div>
        <div className="Footer-copyright">
          © Handy, 2024
        </div>
      </div>
    )
  }
}

export default Footer