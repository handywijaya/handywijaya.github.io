import React from 'react'

import ImageToolTip from '../../../../shared/components/ImageToolTip'
import { Collection, CollectionImage } from '../../../../shared/interfaces/Collections'

interface Props {
  collection: Collection
  onImageClick?: (index: number) => void
}

/**
 * Same grid + image sizing as src/components/Album (photo book).
 */
const CollectionPhotoGrid: React.FC<Props> = ({ collection, onImageClick }) => {
  const label = (image: CollectionImage) => image.caption || image.title

  return (
    <div
      className="grid content-center justify-evenly justify-items-center items-center
        gap-[16px] grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))]"
    >
      {collection.images.map((image: CollectionImage, index: number) => {
        const alt = `${collection.id}-${index + 1}`
        return (
          <ImageToolTip
            key={`${collection.id}-${index}`}
            caption={label(image)}
            onClick={() => onImageClick?.(index)}
            className="self-center"
          >
            <img
              src={image.previewUrl}
              alt={alt}
              className="pointer-events-none block max-h-[min(90vh,1200px)] w-auto max-w-full"
            />
          </ImageToolTip>
        )
      })}
    </div>
  )
}

export default CollectionPhotoGrid
