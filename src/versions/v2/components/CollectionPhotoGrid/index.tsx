import React, { useCallback, useRef, useState } from 'react'

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const popupTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => setLightboxIndex(null)

  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return null
      const n = collection.images.length
      if (n === 0) return null
      return idx === 0 ? n - 1 : idx - 1
    })
  }, [collection.images.length])

  const goLightboxNext = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return null
      const n = collection.images.length
      if (n === 0) return null
      return idx === n - 1 ? 0 : idx + 1
    })
  }, [collection.images.length])

  const lightboxImage =
    lightboxIndex !== null ? collection.images[lightboxIndex] : undefined

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
              onClick={() => openLightbox(index)}
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
        open={lightboxIndex !== null}
        imageUrl={lightboxImage?.url ?? null}
        title={lightboxImage?.title}
        onClose={closeLightbox}
        onPrev={goLightboxPrev}
        onNext={goLightboxNext}
      />
    </>
  )
}

export default CollectionPhotoGrid
