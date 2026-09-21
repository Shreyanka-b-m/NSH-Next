'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type HeroVideoProps = {
  poster: string
  mp4Src: string
  webmSrc?: string
}

export default function HeroVideo({ poster, mp4Src, webmSrc }: HeroVideoProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    if (document.readyState === 'complete') {
      setShouldLoadVideo(true)
      return
    }

    const onLoad = () => setShouldLoadVideo(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])

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
