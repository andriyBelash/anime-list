import React from 'react'
import { notFound } from 'next/navigation';
import type { Metadata } from 'next'

import Filter from './components/Filter';
import List from '@/app/components/List';
import MediaItem from './components/MediaItem';

import type { IGenres } from '@/types';
import type { IAnimeData, IAnimeList } from '@/types/anime';
import type { IMangeData, IMangeList } from '@/types/manga';

import { fetchWrapper } from '@/utils/fetchWrapper';


type PagePropType = {
  params: { type: string },
  searchParams: { [key: string]: string | string[] | any }
}

export async function generateMetadata({params}: PagePropType): Promise<Metadata> {
  return { title: (params.type).charAt(0).toUpperCase() + (params.type).slice(1) } 
}

const getData = async (type: string, params: string): Promise<IAnimeData | IMangeData> => {
  const res = await fetchWrapper<IAnimeData | IMangeData>(`/${type}?${params}`)
  return res
}

const page = async ({params: { type }, searchParams}: PagePropType ) => {
  if(!['anime', 'manga'].includes(type)) notFound()

  const params = new URLSearchParams(searchParams)
  const data = await getData(type, params.toString())
  const items: IAnimeList[] = Array.isArray(data.data) ? data.data as IAnimeList[] : [];
  const genres = await fetchWrapper<{data: IGenres[]}>('/genres/'+type)
  return (
    <div className='mt-5 grid grid-cols-filter gap-6'>
      <List 
        items={items}
        renderItem={(item: IAnimeList | IMangeList) => <MediaItem type={type} item={item} />}
      />
      <Filter genres={genres.data} pageType={type}/>
    </div>
  )
}

export default page