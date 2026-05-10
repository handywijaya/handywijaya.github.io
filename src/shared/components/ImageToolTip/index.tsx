import React from 'react'

import cn from 'classnames'

export interface ImageToolTipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  caption: string
  children: React.ReactNode
}

/** Long ease-out so opacity and backdrop-filter settle together without feeling snappy. */
const easeSmooth = '[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]'

const ImageToolTip: React.FC<ImageToolTipProps> = ({
  caption,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn(
        'group relative inline-block max-w-full cursor-pointer overflow-hidden rounded-[20px] shadow-md',
        'ring-1 ring-black/5 transition-transform duration-150 ease-out hover:scale-105',
        className,
      )}
    >
      {children}

      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center p-3 pb-4',
          'translate-y-1.5 opacity-0 will-change-[opacity,transform]',
          easeSmooth,
          'transition-[opacity,transform] duration-[520ms]',
          'group-hover:translate-y-0 group-hover:opacity-100',
        )}
        aria-hidden
      >
        <div
          className={cn(
            'mx-auto w-[88%] max-w-full rounded-[2rem]',
            // Dark-tinted frost so white type stays legible on bright / white photos
            'border border-white/[0.22] bg-black/[0.48]',
            'px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]',
            easeSmooth,
            'transition-[backdrop-filter,-webkit-backdrop-filter,background-color,border-color,box-shadow] duration-[520ms]',
            'backdrop-blur-[6px] backdrop-saturate-150',
            'group-hover:border-white/[0.36] group-hover:bg-black/[0.58]',
            'group-hover:backdrop-blur-[24px]',
            // Strong halo so glyphs don’t disappear on snowy / white backgrounds
            '[&_p]:[text-shadow:0_1px_2px_rgba(0,0,0,1),0_0_14px_rgba(0,0,0,0.85),0_0_1px_rgba(0,0,0,1)]',
          )}
        >
          <p className="whitespace-pre-line text-left font-sans text-[0.9375rem] font-semibold leading-snug text-white sm:text-base">
            {caption}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageToolTip
