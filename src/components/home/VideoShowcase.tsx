'use client'

import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export default function VideoShowcase() {
  return (
    <section className="bg-white">
      <div className="container-custom">
        <h2 className="section-heading mb-12">Explore Our Newest Residences</h2>

        <p className="max-w-[950px] mb-14">
          Explore refined architecture and design artistry in our newest homes, built to inspire
          elegant everyday living.
        </p>

        <div className="mx-auto max-w-[1100px]">
          <LiteYouTubeEmbed
            id="TpsguFWJ9yo"
            title="Explore Our Newest Residences"
            poster="maxresdefault"
          />
        </div>
      </div>
    </section>
  )
}
