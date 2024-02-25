import React from 'react'
import type { IAnimeList } from '@/types/anime';
import type { IMangeList } from '@/types/manga';
import { generateLink } from '@/utils/functions';

import Link from 'next/link';

type PropType = {
  item: IAnimeList | IMangeList
  type: string
}

const MediaItem = ({ type, item }: PropType) => {

  return (
    <Link href={`/${type}/${generateLink(item.title_english ?? item.title ,item.mal_id)}`} className='h-[450px] block relative'>
      <img className='h-full w-full object-cover' src={item.images.webp.large_image_url} ></img>
      <div className='absolute h-14 bottom-0 flex items-center justify-center w-full bg-black/[.8]'>
        {item.title_english ?? item.title}
      </div>
     <div className='absolute top-2 right-2 p-2 bg-black'>{item.score ?? '-'}</div>
    </Link>
  )
}

export default MediaItem