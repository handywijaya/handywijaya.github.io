import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface ImagePreviewModalProps {
  open: boolean
  /** Full-resolution image URL (`CollectionImage.url`) */
  imageUrl: string | null
  title?: string
  onClose: () => void
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  open,
  imageUrl,
  title,
  onClose,
}) => {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open || !imageUrl) return null

  const modal = (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 p-4 pt-14 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Preview: ${title}` : 'Image preview'}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg ring-1 ring-black/10 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
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
        className="flex max-h-[90vh] max-w-[min(100%,96vw)] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={title || 'Full size'}
          className="max-h-[85vh] w-auto max-w-full select-none object-contain shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default ImagePreviewModal
