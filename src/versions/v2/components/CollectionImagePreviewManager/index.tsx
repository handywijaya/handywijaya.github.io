import React, { useCallback, useEffect, useRef, useState } from 'react'

import { CollectionImage } from '../../../../shared/interfaces/Collections'
import ImagePreviewModal from '../ImagePreviewModal'
import SlideshowImagePreviewModal from '../SlideshowImagePreviewModal'

const SLIDESHOW_INTERVAL_MS = 4000
const SLIDESHOW_FIRST_IMAGE_EXTRA_DELAY_MS = 1500
const SLIDESHOW_PRELOAD_AHEAD_COUNT = 3

export type SlideshowStatus = 'stopped' | 'playing' | 'paused'

interface RenderArgs {
  slideshowStatus: SlideshowStatus
  onImageClick: (index: number) => void
  onStartSlideshow: () => void
}

interface Props {
  images: CollectionImage[]
  children: (args: RenderArgs) => React.ReactNode
}

const CollectionImagePreviewManager: React.FC<Props> = ({ images, children }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [slideshowStatus, setSlideshowStatus] = useState<SlideshowStatus>('stopped')
  const [firstSlideDelayPending, setFirstSlideDelayPending] = useState(false)
  const [pendingAutoAdvance, setPendingAutoAdvance] = useState(false)
  const [preloadVersion, setPreloadVersion] = useState(0)
  const slideshowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const preloadedUrlsRef = useRef<Set<string>>(new Set())
  const readyImageUrlsRef = useRef<Set<string>>(new Set())

  const clearSlideshowTimer = useCallback(() => {
    if (slideshowTimerRef.current) {
      clearTimeout(slideshowTimerRef.current)
      slideshowTimerRef.current = null
    }
  }, [])

  const preloadUpcomingImages = useCallback(
    (startIndex: number) => {
      if (!images.length) return
      for (let offset = 1; offset <= SLIDESHOW_PRELOAD_AHEAD_COUNT; offset += 1) {
        const preloadIndex = (startIndex + offset) % images.length
        const nextImageUrl = images[preloadIndex]?.url
        if (!nextImageUrl || preloadedUrlsRef.current.has(nextImageUrl)) continue
        const img = new Image()
        img.onload = () => {
          readyImageUrlsRef.current.add(nextImageUrl)
          setPreloadVersion((v) => v + 1)
        }
        img.onerror = () => {
          readyImageUrlsRef.current.add(nextImageUrl)
          setPreloadVersion((v) => v + 1)
        }
        img.src = nextImageUrl
        preloadedUrlsRef.current.add(nextImageUrl)
      }
    },
    [images]
  )

  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return null
      if (!images.length) return null
      return idx === 0 ? images.length - 1 : idx - 1
    })
  }, [images])

  const goLightboxNext = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return null
      if (!images.length) return null
      return idx === images.length - 1 ? 0 : idx + 1
    })
  }, [images])

  const onImageClick = useCallback(
    (index: number) => {
      setSlideshowStatus('stopped')
      setFirstSlideDelayPending(false)
      setPendingAutoAdvance(false)
      clearSlideshowTimer()
      setLightboxIndex(index)
    },
    [clearSlideshowTimer]
  )

  const closeLightbox = useCallback(() => {
    setSlideshowStatus('stopped')
    setFirstSlideDelayPending(false)
    setPendingAutoAdvance(false)
    clearSlideshowTimer()
    setLightboxIndex(null)
  }, [clearSlideshowTimer])

  const onStartSlideshow = useCallback(() => {
    if (!images.length) return
    preloadedUrlsRef.current.clear()
    readyImageUrlsRef.current.clear()
    setLightboxIndex(0)
    setFirstSlideDelayPending(true)
    setPendingAutoAdvance(false)
    setSlideshowStatus('playing')
  }, [images])

  const pauseSlideshow = useCallback(() => {
    setSlideshowStatus('paused')
    setPendingAutoAdvance(false)
    clearSlideshowTimer()
  }, [clearSlideshowTimer])

  const resumeSlideshow = useCallback(() => {
    if (lightboxIndex === null || !images.length) return
    setSlideshowStatus('playing')
  }, [images, lightboxIndex])

  const stopSlideshow = useCallback(() => {
    setSlideshowStatus('stopped')
    setFirstSlideDelayPending(false)
    setPendingAutoAdvance(false)
    clearSlideshowTimer()
    setLightboxIndex(null)
  }, [clearSlideshowTimer])

  useEffect(() => {
    if (slideshowStatus !== 'playing' || lightboxIndex === null || !images.length || pendingAutoAdvance) {
      return
    }

    preloadUpcomingImages(lightboxIndex)
    const delayMs = firstSlideDelayPending
      ? SLIDESHOW_INTERVAL_MS + SLIDESHOW_FIRST_IMAGE_EXTRA_DELAY_MS
      : SLIDESHOW_INTERVAL_MS

    slideshowTimerRef.current = setTimeout(() => {
      const nextIndex = lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1
      const nextImageUrl = images[nextIndex]?.url
      if (firstSlideDelayPending) {
        setFirstSlideDelayPending(false)
      }
      if (nextImageUrl && readyImageUrlsRef.current.has(nextImageUrl)) {
        goLightboxNext()
        return
      }
      setPendingAutoAdvance(true)
      preloadUpcomingImages(lightboxIndex)
    }, delayMs)

    return clearSlideshowTimer
  }, [
    clearSlideshowTimer,
    firstSlideDelayPending,
    goLightboxNext,
    images,
    lightboxIndex,
    pendingAutoAdvance,
    preloadUpcomingImages,
    slideshowStatus,
  ])

  useEffect(() => {
    if (slideshowStatus !== 'playing' || !pendingAutoAdvance || lightboxIndex === null || !images.length) {
      return
    }

    const nextIndex = lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1
    const nextImageUrl = images[nextIndex]?.url
    if (!nextImageUrl || !readyImageUrlsRef.current.has(nextImageUrl)) return

    setPendingAutoAdvance(false)
    goLightboxNext()
  }, [goLightboxNext, images, lightboxIndex, pendingAutoAdvance, preloadVersion, slideshowStatus])

  const lightboxImage = lightboxIndex !== null ? images[lightboxIndex] : undefined

  return (
    <>
      {children({ slideshowStatus, onImageClick, onStartSlideshow })}
      {slideshowStatus === 'stopped' ? (
        <ImagePreviewModal
          open={lightboxIndex !== null}
          imageUrl={lightboxImage?.url ?? null}
          title={lightboxImage?.title}
          onClose={closeLightbox}
          onPrev={goLightboxPrev}
          onNext={goLightboxNext}
        />
      ) : (
        <SlideshowImagePreviewModal
          open={lightboxIndex !== null}
          imageUrl={lightboxImage?.url ?? null}
          title={lightboxImage?.title}
          slideshowStatus={slideshowStatus}
          onSlideshowPause={pauseSlideshow}
          onSlideshowResume={resumeSlideshow}
          onClose={closeLightbox}
          onPrev={goLightboxPrev}
          onNext={goLightboxNext}
        />
      )}
    </>
  )
}

export default CollectionImagePreviewManager
