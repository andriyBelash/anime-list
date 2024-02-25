import React from 'react'
import AnimePage from './components/AnimePage'
import MangaPage from './components/MangaPage'

import { notFound } from 'next/navigation'

type PagePropType = {
  params: { type: string, linkId: string },
}
 

const page = async ({ params: { type, linkId }}: PagePropType): Promise<React.ReactElement> => {
  if(!['anime', 'manga'].includes(type)) notFound()
  return type === 'anime' ? <AnimePage params={{ type, linkId }} /> : <MangaPage/>
}

export default page