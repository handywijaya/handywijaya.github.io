import React from 'react'
import './styles.scss'
import cn from 'classnames'

import { Collection, CollectionImageType } from '../../interfaces/Collections'

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