import React, { useState, useCallback } from 'react'
import './styles.scss'
import cn from 'classnames'

import { Collection, CollectionImageType } from '../../interfaces/Collections'

import ToolTip from '../ToolTip'

interface Props {
  collection: Collection
  onOpenCollection: (collectionPath: string) => void
}

const Album: React.FC<Props> = ({ collection, onOpenCollection = () => {} }) => {
  const [popup, setPopup] = useState({
    show: false,
    caption: '',
    x: 0,
    y: 0,
    bgColor: 'white'
  })

  const popupTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const openCollection = (collectionId: string) => {
    onOpenCollection('/collections/' + collectionId)
  }

  const openImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank')
  }

  const showPopup = (caption: string, x: number, y: number, bgColor: string) => {
    setPopup({ show: true, caption, x, y, bgColor })
  }

  const hidePopup = () => {
    setPopup(prevState => ({ ...prevState, show: false }))
  }

  const onFrameHover = (e: React.MouseEvent, caption: string, bgColor: string) => {
    onFrameOut()
    
    const x = e.clientX
    const y = e.clientY
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current)
    }
    popupTimeoutRef.current = setTimeout(() => {
      showPopup(caption, x, y, bgColor)
    }, 125)
  }

  const onFrameOut = () => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current)
    }
    hidePopup()
  }

  const renderPreviewImages = useCallback((collection: Collection) => {
    const maxImagePerRow = 2
    return collection.images.slice(0, maxImagePerRow).map((collectionImage, index) => (
      <img
        key={index}
        src={collectionImage.previewUrl}
        onMouseMove={(e) => onFrameHover(e, collectionImage.caption, collection.popupColor)}
        onMouseOut={onFrameOut}
        className={cn("PreviewImage", collectionImage.type === CollectionImageType.LANDSCAPE ? "PreviewImage-landscape" : "PreviewImage-portrait")}
        alt={collectionImage.title}
        onClick={() => openImage(collectionImage.url)}
      />
    ))
  }, [])

  const theme = "Theme-" + collection.id

  return (
    <div className={cn("PreviewAlbum", theme)}>
      { renderPreviewImages(collection) }
      
      <h2 className="PreviewAlbum-title">{collection.title}</h2>
      <p className="PreviewAlbum-caption">{collection.caption}</p>
      <div className={cn("PreviewAlbum-pages-more", theme + "-button")} onClick={() => openCollection(collection.id)}>
        View Full Album
      </div>
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