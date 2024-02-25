'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import type { IMangeList } from '@/types/manga'
import type { IAnimeList } from '@/types/anime'

import { generateLink } from '@/utils/functions';

import Link from 'next/link';

type PropType = {
  type: 'anime' | 'manga'
  data: IMangeList[] | IAnimeList[]
}

const MediaSlider = ({ type, data }: PropType) => {
  return (
    <Swiper 
      className='media-swiper'
      spaceBetween={24}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {data.map(slide => (
        <SwiperSlide key={slide.mal_id}>
          <div className='relative h-full'>
            <img src={slide.images.webp.large_image_url}/>
            <Link 
              href={`/${type}/${generateLink(slide.title_english ?? slide.title, slide.mal_id)}`} 
              className='absolute h-14 bottom-0 flex items-center justify-center w-full bg-black/[.8]'
            >
                {slide.title_english ?? slide.title}
            </Link>
          </div>
        </SwiperSlide>
      ))}
      
      
    </Swiper>
  )
}

export default MediaSlider