import React from 'react'
import './styles.scss'
import cn from 'classnames'

import { Collection, CollectionImage, CollectionImageType } from '../../interfaces/Collections'

import ToolTip from '../ToolTip'

interface Props {
  collection: Collection
  onOpenCollection: (collectionPath: string) => void
}

class Album extends React.Component<Props, any> {
  public static defaultProps = {
      onOpenCollection: () => {}
  }
  popupTimeout?: NodeJS.Timeout

  constructor (props:any) {
    super(props)

    this.state = {
      popup: {
        show: false,
        caption: '',
        x: 0,
        y: 0,
        bgColor: 'white'
      }
    }
    this.popupTimeout = undefined
  }

  openCollection (collectionId: string) {
    const { onOpenCollection } = this.props
    onOpenCollection('/collections/' + collectionId)
  }

  openImage (imageUrl: string) {
    window.open(imageUrl, '_blank')
  }

  showPopup (caption: string, x: number, y: number, bgColor: string) {
    let { popup } = this.state
    popup.show = true
    popup.caption = caption
    popup.x = x
    popup.y = y
    popup.bgColor = bgColor
    this.setState({ popup })
  }

  hidePopup () {
    let { popup } = this.state
    popup.show = false
    this.setState({ popup })
  }

  onFrameHover (e:any, caption: string, bgColor: string) {
    this.onFrameOut()
    
    const x = e.clientX
    const y = e.clientY
    this.popupTimeout = setTimeout(() => {
      this.showPopup(caption, x, y, bgColor)
    }, 125)
  }

  onFrameOut () {
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout)
    }
    this.hidePopup()
  }

  getFrameElement (key: number, collectionId: string, url: string, previewUrl: string, caption: string, title: string, imageType: CollectionImageType, alt: string, bgColor:string) {
    return (
      <div key={key}
        className={cn("Album-pages-row-frame", "Frame-background-" + collectionId)}>
        <img src={previewUrl}
          onMouseMove={(e) => this.onFrameHover(e, caption, bgColor)}
          onMouseOut={() => this.onFrameOut()}
          className={cn("Image", imageType === CollectionImageType.LANDSCAPE ? "Image-landscape" : "Image-portrait")}
          alt={alt}
          onClick={() => {this.openImage(url)}} />
        <div className="Album-pages-row-frame-caption">{title}</div>
      </div>
    )
  }

  renderFrames(collectionId: string, images: Array<CollectionImage>, maxImagePerRow: number, rowNumber: number, popupColor: string) {
    let elements:Array<any> = []

    const startIndex = rowNumber * maxImagePerRow
    for (let i = startIndex; i < Math.min(images.length, startIndex + maxImagePerRow); i++) {
      const image = images[i]
      const alt = collectionId + "-" + (i+1)

      elements.push(this.getFrameElement(i, collectionId, image.url, image.previewUrl, image.caption, image.title, image.type, alt, popupColor))
    }

    return elements
  }

  renderPreviewFrames (collection: Collection) {
    let elements:Array<any> = []

    collection.previewImageIdx.forEach((idx, i) => {
      const image = collection.images[idx]
      const alt = collection.id + "-" + (i+1)

      elements.push(this.getFrameElement(i, collection.id, image.url, image.previewUrl, image.caption, image.title, image.type, alt, collection.popupColor))
    })

    return elements
  }

  renderPhotoBook (collection: Collection) {
    return (
      <div className="PreviewAlbum-pages">
        <div className="PreviewAlbum-pages-row">
          {
            this.renderPreviewFrames(collection)
          }
        </div>
        <div className="PreviewAlbum-pages-more">
          <div className="PreviewAlbum-pages-more-text" onClick={() => {this.openCollection(collection.id)}}>
            Full collection..
          </div>
        </div>
      </div>
    )
  }

  renderPreviewImages (collection: Collection) {
    let elements:Array<any> = []
    const maxImagePerRow = 2

    for (let i = 0; i < maxImagePerRow; i++) {
      let collectionImage = collection.images[i]
      elements.push(
        <img key={i} 
        src={collectionImage.previewUrl}
        onMouseMove={(e) => this.onFrameHover(e, collectionImage.caption, collection.popupColor)}
        onMouseOut={() => this.onFrameOut()}
        className={cn("PreviewImage", collectionImage.type === CollectionImageType.LANDSCAPE ? "PreviewImage-landscape" : "PreviewImage-portrait")}
        alt={collectionImage.title}
        onClick={() => {this.openImage(collectionImage.url)}} />
      )
    }

    return elements
  }

  render () {
    const { popup } = this.state
    const { collection } = this.props
    const theme = "Theme-" + collection.id
    return (
      <div className={cn("PreviewAlbum", theme)}>
          {
            this.renderPreviewImages(collection)
          }
          
          <h2 className="PreviewAlbum-title">{collection.title}</h2>
          <p className="PreviewAlbum-caption">{collection.caption}</p>
          <div className={cn("PreviewAlbum-pages-more", theme + "-button")} onClick={() => {this.openCollection(collection.id)}}>
            View Full Album
          </div>
          <ToolTip
            show={popup.show}
            message={popup.caption}
            mouseX={popup.x}
            mouseY={popup.y}
            bgColor={popup.bgColor} />
      </div>
    )
  }
}

export default Album