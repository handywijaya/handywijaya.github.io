import React from 'react'
import './styles.scss'
import cn from 'classnames'

import { Collection, CollectionImage, CollectionImageType } from '../../interfaces/Collections'

import ToolTip from '../ToolTip'

interface Props {
  collection: Collection
}

class Album extends React.Component<Props, any> {
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
      // <div key={key} className={"Album-pages-img"}>
        <img
          src={previewUrl}
          onMouseMove={(e) => this.onFrameHover(e, title, bgColor)}
          onMouseOut={() => this.onFrameOut()}
          className={cn("Image", imageType === CollectionImageType.LANDSCAPE ? "Image-landscape" : "Image-portrait")}
          alt={alt}
          onClick={() => {this.openImage(url)}} />
      // </div>
    )
  }

  renderFrames(collectionId: string, images: Array<CollectionImage>, popupColor: string) {
    let elements:Array<any> = []

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const alt = collectionId + "-" + (i+1)

      elements.push(this.getFrameElement(i, collectionId, image.url, image.previewUrl, image.caption, image.title, image.type, alt, popupColor))
    }

    return elements
  }

  renderPhotoBook (collection: Collection) {
    return (
      <div className="Album-pages">
        {
          this.renderFrames(collection.id, collection.images, collection.popupColor)
        }
      </div>
    )
  }

  render () {
    const { popup } = this.state
    const { collection } = this.props
    return (
      <div className="Album">
        <h2 className="Album-title">{collection.title}</h2>
        <p className="Album-caption">{collection.caption}</p>
        {
          this.renderPhotoBook(collection)
        }
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