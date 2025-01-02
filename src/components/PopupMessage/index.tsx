import React from 'react'
import './_styles.scss';
import cn from 'classnames'

interface Props {
  show: boolean,
  message: string,
  bgColor: string
}

const PopupMessage: React.FC<Props> = ({ show, message, bgColor }) => {
  const bg = bgColor || 'transparent'

  return (
    <div
      className={cn('PopupMessage', show ? 'PopupMessage-showed' : 'PopupMessage-hidden')}
      style={{ background: bg }}
    >
      {message}
    </div>
  )
}

export default PopupMessage