import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ImagePreviewModalProps {
  open: boolean
  /** Full-resolution image URL (`CollectionImage.url`) */
  imageUrl: string | null
  title?: string
  onClose: () => void
  /** Parent decides which image is previous (e.g. wrap to last). */
  onPrev: () => void
  /** Parent decides which image is next (e.g. wrap to first). */
  onNext: () => void
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  open,
  imageUrl,
  title,
  onClose,
  onPrev,
  onNext,
}) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [imageLoading, setImageLoading] = useState(true)

  useLayoutEffect(() => {
    if (!open || !imageUrl) return
    setImageLoading(true)
    const img = imgRef.current
    if (img?.complete && img.naturalHeight > 0) {
      setImageLoading(false)
    }
  }, [open, imageUrl])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose, onPrev, onNext])

  /** Glass-style nav: compact, works on dark overlay; distinct from solid close control. */
  const navButtonClass =
    'z-[2] flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-sm backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'

  if (!open || !imageUrl) return null

  const ariaLabel = title ? `Preview: ${title}` : 'Image preview'

  const modal = (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 p-4 pt-14 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-busy={imageLoading}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-[3] flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg ring-1 ring-black/10 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close preview"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="absolute inset-0 flex items-center justify-center px-12 pb-4 pt-14 sm:px-14"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={`absolute left-1 top-1/2 -translate-y-1/2 sm:left-2 ${navButtonClass}`}
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          className={`absolute right-1 top-1/2 -translate-y-1/2 sm:right-2 ${navButtonClass}`}
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div className="relative flex min-h-[min(85vh,480px)] min-w-[min(calc(100vw-7rem),240px)] max-h-[85vh] max-w-full items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 rounded-lg bg-black/40 backdrop-blur-[2px]">
              <div
                className="h-11 w-11 animate-spin rounded-full border-2 border-white/25 border-t-white"
                role="status"
              />
              <span className="text-sm font-medium text-white/90">Loading…</span>
            </div>
          )}
          <img
            ref={imgRef}
            key={imageUrl}
            src={imageUrl}
            alt={title || 'Full size'}
            className={`max-h-[85vh] w-auto max-w-full select-none object-contain shadow-2xl transition-opacity duration-200 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            draggable={false}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default ImagePreviewModal
