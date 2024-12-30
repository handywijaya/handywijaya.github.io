import React from 'react'
import './styles.scss'
import cn from 'classnames'

interface Props {
  show: boolean,
  message: string,
  bgColor: string
}

class PopupMessage extends React.Component<Props> {
  render () {
    const { show, message, bgColor } = this.props
    const bg = bgColor || 'transparent'

    return (
      <div
        className={cn("PopupMessage", show ? "PopupMessage-showed" : "PopupMessage-hidden")}
        style={{background: bg}}>
        { message }
      </div>
    )
  }
}

export default PopupMessage