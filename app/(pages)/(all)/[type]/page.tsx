import React from 'react'
import { notFound } from 'next/navigation';
import type { Metadata } from 'next'

import Filter from './components/Filter';
import List from '@/app/components/List';
import MediaItem from './components/MediaItem';
import AppPagination from '@/app/components/AppPagination';

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

  const currentPage = Number(searchParams?.page) || 1;


  return (
    <div className='mt-5 flex flex-col-reverse gap-6'>
      <div>
        <List 
          items={items}
          renderItem={(item: IAnimeList | IMangeList) => <MediaItem type={type} item={item} />}
          className='grid grid-cols-5 gap-4'
        />
        <div className='mt-24 mb-24 flex items-center justify-between'>
          { data.pagination && data.pagination.last_visible_page > 1 ? <AppPagination pages={data.pagination.last_visible_page} currentPage={currentPage}/> : null}
        </div>
        
      </div>

      <Filter genres={genres.data} pageType={type}/>
    </div>
  )
}

export default page