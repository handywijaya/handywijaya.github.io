import React, { useRef, useState } from 'react'

import { Collection, CollectionImage } from '../../../../shared/interfaces/Collections'
import ToolTip from '../../../../shared/components/ToolTip'
import ImagePreviewModal from '../ImagePreviewModal'

interface Props {
  collection: Collection
}

/**
 * Same grid + image sizing as src/components/Album (photo book).
 */
const CollectionPhotoGrid: React.FC<Props> = ({ collection }) => {
  const [popup, setPopup] = useState({
    show: false,
    caption: '',
    x: 0,
    y: 0,
    bgColor: 'white',
  })
  const [lightbox, setLightbox] = useState<{
    url: string
    title: string
  } | null>(null)
  const popupTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openLightbox = (url: string, title: string) => {
    setLightbox({ url, title })
  }

  const closeLightbox = () => setLightbox(null)

  const showPopup = (caption: string, x: number, y: number, bgColor: string) => {
    setPopup({
      show: true,
      caption,
      x,
      y,
      bgColor,
    })
  }

  const hidePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }))
  }

  const onFrameOut = () => {
    if (popupTimeout.current) {
      clearTimeout(popupTimeout.current)
    }
    hidePopup()
  }

  const onFrameHover = (e: React.MouseEvent, caption: string, bgColor: string) => {
    onFrameOut()
    const x = e.clientX
    const y = e.clientY
    popupTimeout.current = setTimeout(() => {
      showPopup(caption, x, y, bgColor)
    }, 125)
  }

  const bgColor = collection.popupColor

  return (
    <>
      <div
        className="grid content-center justify-evenly justify-items-center items-center
        gap-[16px] grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))]"
      >
        {collection.images.map((image: CollectionImage, index: number) => {
          const alt = `${collection.id}-${index + 1}`
          return (
            <img
              key={`${collection.id}-${index}`}
              src={image.previewUrl}
              alt={alt}
              onMouseMove={(e) => onFrameHover(e, image.title, bgColor)}
              onMouseOut={onFrameOut}
              onClick={() => openLightbox(image.url, image.title)}
              className="cursor-pointer self-center rounded-lg shadow-md transition-all duration-125 hover:scale-105"
            />
          )
        })}
      </div>
      <ToolTip
        show={popup.show}
        message={popup.caption}
        mouseX={popup.x}
        mouseY={popup.y}
        bgColor={popup.bgColor}
      />
      <ImagePreviewModal
        open={lightbox !== null}
        imageUrl={lightbox?.url ?? null}
        title={lightbox?.title}
        onClose={closeLightbox}
      />
    </>
  )
}

export default CollectionPhotoGrid
