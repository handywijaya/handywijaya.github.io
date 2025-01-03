import React from 'react'
import cn from 'classnames'

interface Props {
  show: boolean,
  message: string,
  bgColor: string
}

const PopupMessage: React.FC<Props> = ({ show, message, bgColor }) => {
  const bg = bgColor || 'transparent'
  const className=cn(
    'rounded-md pointer-events-none select-none bg-white py-[4px] px-[8px] transition-opacity duration-125 ease-linear text-xs',
    show ? 'opacity-1' : 'opacity-0'
  )

  return (
    <div className={className} style={{ background: bg }}>
      {message}
    </div>
  )
}

export default PopupMessage