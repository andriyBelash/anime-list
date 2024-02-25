'use client'

import React, { useState } from 'react'
import Modal from './YouTubeModal'
import Show from '@/app/components/Show'

type URLS = {
  imageUrl: string,
  youtubeUrl: string
}

const AnimeTrailer = ({ imageUrl, youtubeUrl }: URLS) => {
  const [hover, setHover] = useState<boolean>(false)
  const [showTrailer, setShowTrailer] = useState<boolean>(false)

  return (
    <div className='relative'>
      <img onMouseEnter={() => setHover(true)} className='w-full object-cover h-[380px]' src={imageUrl} />
      <Show when={Boolean(hover && youtubeUrl)}>
        <div onMouseLeave={() => setHover(false)} className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#1A22389a]'>
          <button onClick={() => setShowTrailer(true)} className='h-[36px] w-[36px] cursor-pointer '><svg height="100%" width="100%" fill="#FF6A3D"><polygon  points="5,0 30,15 5,30" viewBox="0 0 30 15"></polygon><path  d="M5,0 L30,15 L5,30z" fill="none" stroke="#f857a6" stroke-width="1"></path></svg></button>
        </div>
      </Show>
      <Show when={showTrailer}><Modal close={() => setShowTrailer(false)} url={youtubeUrl}/></Show>
    </div>
  )
}

export default AnimeTrailer