import React, { useState, useRef } from 'react'
import cn from 'classnames';

import { Collection, CollectionImage, CollectionImageType } from '../../interfaces/Collections'

import ToolTip from '../ToolTip'

interface Props {
  collection: Collection
}

const Album: React.FC<Props> = ({ collection }) => {
  const [popup, setPopup] = useState({
    show: false,
    caption: '',
    x: 0,
    y: 0,
    bgColor: 'white'
  })
  const popupTimeout = useRef<NodeJS.Timeout | null>(null)

  const openImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank')
  }

  const showPopup = (caption: string, x: number, y: number, bgColor: string) => {
    setPopup({
      show: true,
      caption,
      x,
      y,
      bgColor
    })
  }

  const hidePopup = () => {
    setPopup(prevPopup => ({ ...prevPopup, show: false }))
  }

  const onFrameHover = (e: React.MouseEvent, caption: string, bgColor: string) => {
    onFrameOut()

    const x = e.clientX
    const y = e.clientY
    popupTimeout.current = setTimeout(() => {
      showPopup(caption, x, y, bgColor)
    }, 125)
  }

  const onFrameOut = () => {
    if (popupTimeout.current) {
      clearTimeout(popupTimeout.current)
    }
    hidePopup()
  }

  const getFrameElement = (
    key: number,
    collectionId: string,
    url: string,
    previewUrl: string,
    caption: string,
    title: string,
    imageType: CollectionImageType,
    alt: string,
    bgColor: string
  ) => (
      <img
        key={key}
        src={previewUrl}
        onMouseMove={(e) => onFrameHover(e, title, bgColor)}
        onMouseOut={onFrameOut}
        className="cursor-pointer rounded-lg shadow-md self-center transition-all duration-125 hover:scale-105"
        alt={alt}
        onClick={() => openImage(url)}
      />
  )

  const renderFrames = (collectionId: string, images: Array<CollectionImage>, popupColor: string) => {
    return images.map((image, index) => {
      const alt = `${collectionId}-${index + 1}`
      return getFrameElement(index, collectionId, image.url, image.previewUrl, image.caption, image.title, image.type, alt, popupColor)
    })
  }

  const renderPhotoBook = (collection: Collection) => (
    <div className="grid justify-evenly items-center justify-items-center content-center
    grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))]
    gap-[16px]">
      {renderFrames(collection.id, collection.images, collection.popupColor)}
    </div>
  )

  const theme = `Theme-${collection.id}`;
  const titleClassName = cn('m-0 font-semibold text-[40px] drop-shadow-lg', `${theme}-title`)
  const captionClassName = cn('text-[16px]', `${theme}-caption`)
  return (
    <div className="mb-[20px] text-center max-w-screen-lg m-auto">
      <div className="mb-[20px]">
        <h2 className={titleClassName}>{collection.title}</h2>
        <p className={captionClassName}>{collection.caption}</p>
      </div>
      {renderPhotoBook(collection)}
      <ToolTip
        show={popup.show}
        message={popup.caption}
        mouseX={popup.x}
        mouseY={popup.y}
        bgColor={popup.bgColor}
      />
    </div>
  )
}

export default Album