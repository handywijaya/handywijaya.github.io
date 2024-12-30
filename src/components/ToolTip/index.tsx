import React from 'react'
import './styles.scss'

import PopupMessage from '../PopupMessage'

interface Props {
  show: boolean,
  message: string,
  mouseX: number,
  mouseY: number,
  bgColor: string
}

class ToolTip extends React.Component<Props> {
  render () {
    const { show, message, mouseX, mouseY, bgColor } = this.props

    return (
      <div className="ToolTip"
        style={{top: (mouseY + 5) + 'px', left: (mouseX + 5) + 'px'}}>
        <PopupMessage
          show={show}
          message={message}
          bgColor={'linear-gradient(#fff, ' + bgColor + ')'} />
      </div>
    )
  }
}

export default ToolTip