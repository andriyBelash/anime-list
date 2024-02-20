import React from 'react'
import type { IAnimeList } from '@/types/anime';
import type { IMangeList } from '@/types/manga';

type PropType = {
  item: IAnimeList | IMangeList
  type: string
}

const MediaItem = ({ type, item }: PropType) => {
  return (
    <div>{type}</div>
  )
}

export default MediaItem