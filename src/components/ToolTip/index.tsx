import React from 'react'

import PopupMessage from '../PopupMessage'

interface Props {
  show: boolean,
  message: string,
  mouseX: number,
  mouseY: number,
  bgColor: string
}

const ToolTip: React.FC<Props> = ({ show, message, mouseX, mouseY, bgColor }) => {
  return (
    <div className="fixed transition-opacity duration-125 ease-linear select-none pointer-events-none"
      style={{ top: (mouseY + 5) + 'px', left: (mouseX + 5) + 'px' }}>
      <PopupMessage
        show={show}
        message={message}
        bgColor={'linear-gradient(#fff, ' + bgColor + ')'} />
    </div>
  )
}

export default ToolTip