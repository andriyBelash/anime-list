'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Select from 'react-select';

import { MediaTypes, MediaRating, MediaSort, OrderTypeAnime, mediaStatus, MediaTypesMange, mediaStatusManga, OrderTypeManga } from '@/utils/constants';

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { IGenres } from '@/types';


const Filter = ({genres, pageType}: { genres: IGenres[], pageType: string }) => {

  const [ filter, setFilters ] = useState<Record<string, string | any>>({})
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      value ? params.set(name, value) : params.delete(name)
      if(name !== 'page') {
        params.set('page', '1')
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  )


  const valueParams = (name: string): any => {
    const params = new URLSearchParams(searchParams.toString())
    return params.get(name)
  }

  const changeSelectFilters = (e: any | null, type: string) => {
    setFilters({ ...filter, [type]: e ? e.value : '' })
    createQueryString(type, e ? e.value : '')
  }

  const setMultipleValue = (e: any) => {
    if(Array.isArray(e) && e.length) {
      setFilters({...filter, genres: e})
      const idx = e.map(i => i.value)
      createQueryString('genres', idx.join(','))
    } else {
      setFilters({...filter, genres: []})
      createQueryString('genres', '')
    }
  }

  const setGenresValue = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has('genres')) {
      const paramsGenres = params.get('genres');
      const idx = paramsGenres?.split(',') as string[];
      const selectedGenres = genres
        .filter((i) => idx.includes(String(i.mal_id)))
        .map((i) => ({ label: i.name, value: i.mal_id }));
      setFilters(prevstate  => ({ ...prevstate, genres: selectedGenres }));
    } else {
      // Reset genres if 'genres' parameter is not present in the URL
      setFilters(prevstate  => ({ ...prevstate, genres: [] }));
    }
  };
  
  const setSort = () => {
    const params = new URLSearchParams(searchParams.toString())
    if(!params.has('order_by')) {
      params.set('order_by', 'score')
      router.push(`${pathname}?${params.toString()}`)
    }
    if(!params.has('sort')) {
      params.set('sort', 'desc')
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const clearFilter = () => {
    router.push(`${pathname}?order_by=mal_id&sort=desc`)
  }
  useEffect(() => {
    setSort()
    const newFilters: Record<string, string> = {};
    
    searchParams.forEach((val, key) => {
      if (key !== 'page') {
        newFilters[key] = val;
      }
    });
    setFilters(newFilters);
    setGenresValue()
  }, [searchParams]);
  


  return (
    <div className='w-full'>
      <div className='p-4 mt-6 grid gap-5 grid-cols-4 rounded-sm'>
        <div className='flex flex-col gap-3 '>
          <label className='text-[#FF6A3D] text-xl'>Sort type</label>
          <Select
              placeholder='Chose a sort'
              className="basic-select"
              classNamePrefix='basic-select'
              options={ pageType === 'anime' ? OrderTypeAnime : OrderTypeManga }
              value={ (pageType === 'anime' ? OrderTypeAnime : OrderTypeManga).find(option => option.value === valueParams('order_by'))}
              onChange={selectedOption => changeSelectFilters(selectedOption, 'order_by')}
            />
        </div>
        <div className='flex flex-col gap-3  mb-6'>
          <label className='text-[#FF6A3D] text-xl'>Sort by</label>
            <Select
              placeholder='Chose a sort'
              className="basic-select"
              classNamePrefix='basic-select'
              options={MediaSort}
              value={MediaSort.find(option => option.value === valueParams('sort'))}
              onChange={selectedOption => changeSelectFilters(selectedOption, 'sort')}
            />
        </div>
        <div className='flex flex-col gap-3 '>
          <label className='text-[#FF6A3D] text-xl'>Name</label>
          <input 
            onInput={(e) => changeSelectFilters(e.target, 'q')} 
            className='h-[36px] rounded-sm px-2 border-[#FF6A3D] border text-[#FF6A3D] bg-[#1A2238] placeholder:text-[#FF6A3D]' 
            placeholder='Search name'
            value={filter.q}
          />
        </div>

        <div className='flex flex-col gap-3 '>
          <label className='text-[#FF6A3D] text-xl'>Type</label>
          <Select
            placeholder='Chose a type'
            className="basic-select"
            classNamePrefix='basic-select'
            isClearable
            options={pageType === 'anime' ? MediaTypes : MediaTypesMange}
            value={(pageType === 'anime' ? MediaTypes : MediaTypesMange).find(option => option.value === valueParams('type'))}
            onChange={selectedOption => changeSelectFilters(selectedOption, 'type')}
          />
        </div>

        <div className='flex flex-col gap-3 '>
          <label className='text-[#FF6A3D] text-xl'>Score</label>
          <input 
            onInput={(e) => changeSelectFilters(e.target, 'score')} 
            pattern="[1-9]" 
            className='h-[36px] rounded-sm px-2 border-[#FF6A3D] border text-[#FF6A3D] bg-[#1A2238] placeholder:text-[#FF6A3D]' 
            placeholder='Search score'
            value={filter.score}
          />
        </div>

        <div className='flex flex-col gap-3 '>
          <label className='text-[#FF6A3D] text-xl'>Score range</label>
          <div className='flex gap-2 w-full'>
            <input 
              onInput={(e) => changeSelectFilters(e.target, 'min_score')} 
              pattern="[1-9]" 
              className='h-[36px] rounded-sm px-2 border-[#FF6A3D] border bg-[#1A2238] placeholder:text-[#FF6A3D] w-full' 
              placeholder='Search min score'
              value={filter.min_score}
            />
            <input 
              onInput={(e) => changeSelectFilters(e.target, 'max_score')} 
              pattern="[1-9]" 
              className='h-[36px] rounded-sm px-2 border-[#FF6A3D] border bg-[#1A2238] placeholder:text-[#FF6A3D] w-full' 
              placeholder='Search max score'
              value={filter.max_score}
            />
          </div>

        </div>

        {pageType === 'anime' ? 
          <div className='flex flex-col gap-3 '>
            <label className='text-[#FF6A3D] text-xl'>Rating</label>
            <Select
              placeholder='Chose a rating'
              className="basic-select"
              classNamePrefix='basic-select'
              isClearable
              options={MediaRating}
              value={MediaRating.find(option => option.value === valueParams('rating'))}
              onChange={selectedOption => changeSelectFilters(selectedOption, 'rating')}
              menuPlacement='top'

            />
          </div>
          :
        null
        }


        <div className='flex flex-col gap-3 '>
          <label className='text-[#FF6A3D] text-xl'>Status</label>
          <Select
            placeholder='Chose a status'
            className="basic-select"
            classNamePrefix='basic-select'
            isClearable
            options={pageType === 'anime' ? mediaStatus : mediaStatusManga}
            value={(pageType === 'anime' ? mediaStatus : mediaStatusManga).find(option => option.value === valueParams('status'))}
            onChange={selectedOption => changeSelectFilters(selectedOption, 'status')}
            menuPlacement='top'

          />
        </div>

        <div className='flex flex-col gap-3 '>
          <label className='text-[#FF6A3D] text-xl'>Genres</label>
          <Select
            placeholder='Chose a Genres'
            className="basic-select"
            classNamePrefix='basic-select'
            isClearable
            isMulti
            value={filter.genres}
            options={genres.map(i => ({ label: i.name, value: i.mal_id }))}
            closeMenuOnSelect={false}
            onChange={(e) => setMultipleValue(e)}
            menuPlacement='top'
          />
        </div>

        <button onClick={clearFilter} className='h-10 mt-10 flex items-center justify-center border border-[#FF6A3D] cursor-pointer w-full text-[#FF6A3D]'>Clear filter</button>
      </div>
    </div>
  )
}

export default Filter