import React from 'react'

import { notFound } from 'next/navigation'

import { getCurrentCharacter } from '@/utils/services/character/fetch'
import { generateLink } from '@/utils/functions'

import { LogFile } from '@/app/components/LogFile'
import Show from '@/app/components/Show'
import List from '@/app/components/List'
import Link from 'next/link'

type PagePropType = {
  params: { linkId: string },
}

const page = async ({params: {linkId}}: PagePropType) => {

  const ID = linkId.split('-')[linkId.split('-').length - 1]
  if(!ID) notFound()

  const { data: character } = await getCurrentCharacter(Number(ID))

  return (
    <div className='mt-5 h-full'>
      <LogFile data={character}/>
      <div className='max-w-7xl mx-auto bg-[#272D3E] p-4 h-full grid grid-cols-id gap-6'>
        <div>
          <img className='w-full object-cover h-[380px]' src={character.images.webp.image_url}/>
          <Show when={Boolean(character.anime && character.anime[0])}>
            <div>
              <div className='border-b pb-1 mt-4'>Animeography</div>
              <List
                items={character.anime}
                className='mt-1'
                renderItem={(item) => 
                <Link className='flex gap-3 hover:bg-[#1A2238] p-2 mt-2' href={`/anime/${generateLink(item.anime.title, item.anime.mal_id)}`}>
                  <img src={item.anime.images.webp.image_url} className='w-[50px] h-[50px] object-cover'/>
                  <div className='flex flex-col justify-between'>
                    <span className='text-[14px]'>{item.anime.title}</span>
                    <span className='text-[12px]'>role: {item.role}</span>
                  </div>
                </Link>}
              />
            </div>
          </Show>
          <Show when={Boolean(character.manga && character.manga[0])}>
            <div>
              <div className='border-b pb-1 mt-4'>Mangaography</div>
              <List
                items={character.manga}
                className='mt-1'
                renderItem={(item) => 
                <Link className='flex gap-3 hover:bg-[#1A2238] p-2 mt-2' href={`/manga/${generateLink(item.manga.title, item.manga.mal_id)}`}>
                  <img src={item.manga.images.webp.image_url} className='w-[50px] h-[50px] object-cover'/>
                  <div className='flex flex-col justify-between'>
                    <span className='text-[14px]'>{item.manga.title}</span>
                    <span className='text-[12px]'>role: {item.role}</span>
                  </div>
                </Link>}
              />
            </div>
          </Show>
        </div>
        <div>
         <strong className='inline-block mt-5 text-3xl border-b pb-2 mt-4 w-full block'>{character.name} | {character.name_kanji}</strong>
         <p className='mt-3'>{character.about}</p>
        </div>
      </div>

    </div>
  )
}

export default page