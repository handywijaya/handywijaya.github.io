import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface SlideshowImagePreviewModalProps {
  open: boolean
  /** Full-resolution image URL (`CollectionImage.url`) */
  imageUrl: string | null
  title?: string
  slideshowStatus?: 'stopped' | 'playing' | 'paused'
  onSlideshowPause?: () => void
  onSlideshowResume?: () => void
  onClose: () => void
  /** Parent decides which image is previous (e.g. wrap to last). */
  onPrev: () => void
  /** Parent decides which image is next (e.g. wrap to first). */
  onNext: () => void
}

const SlideshowImagePreviewModal: React.FC<SlideshowImagePreviewModalProps> = ({
  open,
  imageUrl,
  title,
  slideshowStatus = 'stopped',
  onSlideshowPause,
  onSlideshowResume,
  onClose,
  onPrev,
  onNext,
}) => {
  const currentImgRef = useRef<HTMLImageElement>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
  const [previousImageUrl, setPreviousImageUrl] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (!open) return

    if (!imageUrl) {
      setCurrentImageUrl(null)
      setPreviousImageUrl(null)
      setImageLoading(false)
      return
    }

    setImageLoading(true)
    setCurrentImageUrl((prev) => {
      if (!prev || prev === imageUrl) {
        return imageUrl
      }
      setPreviousImageUrl(prev)
      return imageUrl
    })
  }, [open, imageUrl])

  useEffect(() => {
    if (!open || !currentImageUrl) return

    const img = currentImgRef.current
    if (img?.complete && img.naturalHeight > 0) {
      setImageLoading(false)
      return
    }

    setImageLoading(true)
  }, [open, currentImageUrl])

  useEffect(() => {
    if (!previousImageUrl || imageLoading) return

    const timeoutId = window.setTimeout(() => {
      setPreviousImageUrl(null)
    }, 450)

    return () => window.clearTimeout(timeoutId)
  }, [imageLoading, previousImageUrl])

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

  const navButtonClass =
    'z-[2] flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-sm backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
  const slideshowControlClass =
    'z-[3] rounded-full border border-white/30 bg-white/12 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
  const showInitialLoadingOverlay = imageLoading && !previousImageUrl

  if (!open || !imageUrl || !currentImageUrl) return null

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
      {(slideshowStatus === 'playing' || slideshowStatus === 'paused') && (
        <div
          className="absolute left-4 top-4 z-[3] flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {slideshowStatus === 'playing' ? (
            <button
              type="button"
              className={slideshowControlClass}
              onClick={onSlideshowPause}
            >
              Pause
            </button>
          ) : (
            <button
              type="button"
              className={slideshowControlClass}
              onClick={onSlideshowResume}
            >
              Resume
            </button>
          )}
        </div>
      )}

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
          {showInitialLoadingOverlay && (
            <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 rounded-lg bg-black/40 backdrop-blur-[2px]">
              <div
                className="h-11 w-11 animate-spin rounded-full border-2 border-white/25 border-t-white"
                role="status"
              />
              <span className="text-sm font-medium text-white/90">Loading…</span>
            </div>
          )}
          {previousImageUrl && (
            <img
              src={previousImageUrl}
              alt=""
              aria-hidden="true"
              className={`pointer-events-none absolute max-h-[85vh] w-auto max-w-full select-none object-contain shadow-2xl transition-opacity duration-500 ease-out ${
                imageLoading ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          )}
          <img
            ref={currentImgRef}
            key={currentImageUrl}
            src={currentImageUrl}
            alt={title || 'Full size'}
            className={`max-h-[85vh] w-auto max-w-full select-none object-contain shadow-2xl transition-all duration-500 ease-out ${
              imageLoading ? 'scale-[0.99] opacity-0' : 'scale-100 opacity-100'
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

export default SlideshowImagePreviewModal
