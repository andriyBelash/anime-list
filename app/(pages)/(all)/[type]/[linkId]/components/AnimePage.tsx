import React from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { getAnimeFullById, getAnimeCharacters, getAnimeRecommendations } from '@/utils/services/anime/fetch'
import { generateLink } from '@/utils/functions'

import { notFound } from 'next/navigation'
import { LogFile } from '@/app/components/LogFile'

import List from '@/app/components/List'
import Link from 'next/link'
import AnimeTrailer from './AnimeTrailer'
import Show from '@/app/components/Show'
import ConditionalRender from '@/app/components/ConditionalRender'

type PagePropType = {
  params: { type: string, linkId: string },
}
 
export async function generateMetadata(
  { params:  { type, linkId } }: PagePropType,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const ID = linkId.split('-')[linkId.split('-').length - 1]
  const { data: anime } = await getAnimeFullById(Number(ID))

  return {
    title: anime?.title ? anime.title : 'Anime world',
    description: anime?.background ? anime.background : 'description'
  }
}

const AnimePage = async ({ params: { type, linkId }}: PagePropType): Promise<React.ReactElement> => {

  const ID = linkId.split('-')[linkId.split('-').length - 1]
  if(!ID) notFound()

  const { data: anime } = await getAnimeFullById(Number(ID))
  const { data: characters } = await getAnimeCharacters(Number(ID))
  const { data: recommendations } = await getAnimeRecommendations(Number(ID))

  


  if(!anime || anime.status == String(404)) notFound()

  return (
    <div className='mt-5 h-full'>
      <div className='max-w-7xl mx-auto bg-[#272D3E] p-4 h-full grid grid-cols-id gap-6'>
        <div>
          <AnimeTrailer imageUrl={anime.images.webp.large_image_url} youtubeUrl={anime.trailer.embed_url}/>
          <div className='mt-4'>
            <span>Type: </span>
            <strong>{anime.type}</strong>
          </div>
          <div className='mt-4'>
            <span className='block'>Aired:</span>
            <ConditionalRender
              condition={Boolean(anime.aired.to)}
              ifComponent={<strong className='mt-2 block'>{(new Intl.DateTimeFormat().format(new Date(anime.aired.from)))} - {new Intl.DateTimeFormat().format(new Date(anime.aired.to))}</strong>}
              elseComponent={<strong className='mt-2 block'>{(new Intl.DateTimeFormat().format(new Date(anime.aired.from)))}</strong>}
            />
            
          </div>
          <div className='mt-4'>
            <span>Episodes: </span>
            <strong>{anime.episodes}</strong>
          </div>
          <div className='mt-4'>
            <span>Duration: </span>
            <strong>{anime.duration}</strong>
          </div>
          <div className='mt-4'>
            <span>Status: </span>
            <strong>{anime.status}</strong>
          </div>
          <div className='mt-4'>
            <span>Source: </span>
            <strong>{anime.source}</strong>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex items-center gap-3'>
            <svg className='w-[48px] h-[48px]' width="255" height="240" viewBox="0 0 51 48">
              <path fill='#e4bb24' d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
            </svg>
            <div className='flex items-center'>
              <span className='pr-3 border-r'>{anime.score} ({anime.scored_by})</span>
            </div>
           
            <span>{anime.rating}</span>
          </div>
          <strong className='inline-block mt-5 text-4xl'>{anime.title_english ?? anime.title}</strong>
          <List 
            className='mt-2'
            items={anime.titles}
            renderItem={(title) => <span className='text-sm'>{ title.title }</span>}
          />
          <p className='mt-4'>
            <span className='block'>Synopsis:</span>
            <strong className='mt-2 block'>{anime.synopsis}</strong>
          </p>
          <Link className='mt-5 inline-block underline' href={`/anime-episodes/${linkId}`}>Watch episodes</Link>
          <div className='border-b border-b-[#FF6A3D] mt-7'></div>
          <Show when={Boolean(anime.genres && anime.genres[0])}>
            <div className='mt-5'>
              <strong className='text-2xl'>Genres:</strong>
              <List
                items={anime.genres} 
                className='flex gap-3 mt-2 flex-wrap'
                renderItem={(genre) => <Link className='rounded border whitespace-nowrap border-[#FF6A3D] text-[#FF6A3D] px-4 py-2 mt-2 block' href={`/anime?order_by=mal_id&sort=desc&genres=${genre.mal_id}`}>{genre.name}</Link>}
              />
            </div>
          </Show>
          <Show when={Boolean(anime.relations && anime.relations[0])}>
            <div className='mt-5 flex flex-col gap-3'>
              <strong className='text-2xl'>Relations:</strong>
              <List
                items={anime.relations}
                className='flex gap-3 mt-2 flex-wrap'
                renderItem={(item) => <Link className='rounded border whitespace-nowrap border-[#FF6A3D] text-[#FF6A3D] px-4 py-2 mt-2 block'  href={`/${item.entry[0].type}/${generateLink(item.entry[0].name ,item.entry[0].mal_id)}`}>{item.entry[0].name}</Link>}
              />
            </div>
          </Show>
          <Show when={Boolean(anime.streaming && anime.streaming[0])}>
            <div className='mt-5 flex flex-col gap-3'>
              <strong className='text-2xl'>Streaming:</strong>
              <List
                items={anime.streaming}
                className='flex gap-3 mt-2 flex-wrap '
                renderItem={(item) => <Link className='rounded whitespace-nowrap border border-[#FF6A3D] text-[#FF6A3D] px-4 py-2 mt-2 block' target='blank'  href={item.url}>{item.name}</Link>}
              />
            </div>
          </Show>
          <Show when={Boolean(characters && characters[0])}>
            <div className='mt-5'>
              <strong className='text-2xl block'>Characters:</strong>
              <div className='border-b border-b-[#FF6A3D] mt-7'></div>
              <List
                items={characters.length > 10 ? characters.slice(0, 10) : characters}
                className='grid grid-cols-2 gap-4 mt-3'
                renderItem={(item) => 
                  <Link href={'/'} className='flex gap-3 hover:bg-[#1A2238] p-2'>
                    <img src={item.character.images.jpg.image_url} className='w-[50px] h-[50px] object-cover'/>
                    <div className='flex flex-col justify-between'>
                      <span className='text-md'>{item.character.name}</span>
                      <span className='text-sm'>{item.role}</span>
                    </div>
                  </Link>
                }
              />
            </div>
          </Show>
          <Show when={Boolean(recommendations && recommendations[0])}>
          <div className='mt-5'>
              <strong className='text-2xl block'>Recommendations:</strong>
              <div className='border-b border-b-[#FF6A3D] mt-7'></div>
              <List
                items={recommendations.length > 10 ? recommendations.slice(0, 10) : recommendations}
                className='grid gap-4 mt-3'
                renderItem={(item) => 
                  <Link href={`/${type}/${generateLink(item.entry.title, item.entry.mal_id)}`} className='flex gap-3 hover:bg-[#1A2238] p-2'>
                    <img src={item.entry.images.webp.image_url} className='w-[80px] h-[80px] object-cover'/>
                    <div className='flex flex-col justify-between'>
                      <span className='text-md'>{item.entry.title}</span>
                    </div>
                  </Link>
                }
              />
            </div>
          </Show>
        </div>
      </div>
    </div>
  )
}

export default AnimePage