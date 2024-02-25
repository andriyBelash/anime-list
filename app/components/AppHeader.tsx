'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


const AppHeader = () => {

  const pathname = usePathname()
  return (
    <header className='p-5 flex justify-between items-center gap-3 bg-[#1A2238] border-b border-b-[#FF6A3D]'>
      <Link href='/' className=''>
        <Image
          src='/icon-white.png'
          alt='logo'
          width={60}
          height={60}
        />
      </Link>
      
      <div className='flex gap-6'>
        <Link className={`text-xl hover:underline ${!!pathname.includes('anime') ? 'link-active' : ''}` } href='/anime?order_by=mal_id&sort=desc'>Anime</Link>
        <Link className={`text-xl hover:underline ${!!pathname.includes('manga') ? 'link-active' : ''}` } href='/manga?order_by=mal_id&sort=desc'>Manga</Link>
      </div>
    </header>
  )
}

export default AppHeader