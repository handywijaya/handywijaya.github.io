import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { Collection, CollectionImageType } from '../../../../shared/interfaces/Collections'
import { v2CollectionPath } from '../../utils/paths'

interface Props {
  collection: Collection
}

const AlbumPreviewCard: React.FC<Props> = ({ collection }) => {
  const navigate = useNavigate()

  const previewSlots = useMemo(() => {
    return collection.previewImageIdx.slice(0, 2).map((imageIndex) => ({
      imageIndex,
      img: collection.images[imageIndex],
    }))
  }, [collection])

  const title = collection.titleV2
  const description = collection.caption
  const goToAlbum = () => {
    navigate(v2CollectionPath(collection.id))
  }

  // Per-album theme classes are defined in src/_theme.scss
  // (-preview = base bg, -title / -caption = themed text, -button = themed CTA)
  const theme = `Theme-${collection.id}`

  return (
    <article
      className={cn(
        'flex w-full max-w-[320px] flex-col overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5',
        `${theme}-preview`
      )}
    >
      <button
        type="button"
        onClick={goToAlbum}
        className="group relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        aria-label={`View full album: ${collection.titleV2}`}
      >
        {/* Same indices & sizing rules as src/components/PreviewAlbum (previewImageIdx, LANDSCAPE vs PORTRAIT) */}
        <div className="relative isolate w-full overflow-hidden bg-neutral-200">
          {/* z-0: preview images (avoid transforms here — they stack above siblings without z-index in some browsers) */}
          <div className="relative z-0">
            {previewSlots.map(({ imageIndex, img }) => {
              if (!img) return null
              const isLandscape = img.type === CollectionImageType.LANDSCAPE
              return (
                <div
                  key={`${collection.id}-${imageIndex}`}
                  className={
                    isLandscape
                      ? 'w-full overflow-hidden'
                      : 'flex min-h-[200px] w-full items-center justify-center overflow-hidden bg-neutral-100'
                  }
                >
                  <img
                    src={img.previewUrl}
                    alt=""
                    className={
                      isLandscape
                        ? 'h-[200px] w-full object-cover'
                        : 'm-auto h-full w-auto max-w-full object-contain'
                    }
                  />
                </div>
              )
            })}
          </div>
          {/* z-[1]: dim + CTA; pointer-events-none so the button still receives hover */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            <div className="absolute inset-0 bg-black/45" />
            <span
              className={cn(
                'relative rounded-xl px-6 py-3 text-sm font-bold shadow-md',
                `${theme}-button`
              )}
            >
              View Full Album
            </span>
          </div>
          {/* z-[2]: year badge above overlay */}
          {collection.year ? (
            <span className="pointer-events-none absolute left-3 top-3 z-[2] rounded-full bg-white px-3 py-1 text-xs font-bold tabular-nums tracking-wide text-neutral-900 shadow-md ring-1 ring-black/5">
              {collection.year}
            </span>
          ) : null}
        </div>
      </button>
      <div className="px-5 py-4">
        <h2 className={cn('text-xl font-bold', `${theme}-title`)}>{title}</h2>
        <p className={cn('mt-2 text-sm leading-relaxed', `${theme}-caption`)}>
          {description}
        </p>
      </div>
    </article>
  )
}

export default AlbumPreviewCard
