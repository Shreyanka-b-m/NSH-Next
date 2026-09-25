'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type HeroVideoProps = {
  poster: string
  mp4Src: string
  webmSrc?: string
}

export default function HeroVideo({ poster, mp4Src, webmSrc }: HeroVideoProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (document.readyState === 'complete') {
      setShouldLoadVideo(true)
      return
    }

    const onLoad = () => setShouldLoadVideo(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo) return
    const video = videoRef.current
    if (!video) return

    // iOS Safari ignores the `autoplay` attribute on elements mounted after
    // initial parse — play() must be called explicitly once muted+playsInline
    // are set as DOM properties, not just JSX attributes.
    video.muted = true
    video.playsInline = true
    video.play().catch(() => {
      // Autoplay was blocked (e.g. low power mode); poster stays visible.
    })
  }, [shouldLoadVideo])

  return (
    <>
      {/* Hero poster is the LCP element: preload it and serve a responsive size. */}
      <Image
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="hero-poster"
        style={{ opacity: isVideoReady ? 0 : 1 }}
      />

      {shouldLoadVideo && (
        <video
          ref={videoRef}
          className="hero-video"
          style={{ opacity: isVideoReady ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onPlaying={() => setIsVideoReady(true)}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={mp4Src} />
        </video>
      )}
    </>
  )
}
