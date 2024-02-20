'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Select from 'react-select';

import { MediaTypes, MediaRating, MediaSort, OrderTypeAnime, mediaStatus, MediaTypesMange, mediaStatusManga } from '@/utils/constants';

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
      setFilters({ ...filter, genres: selectedGenres });
    } else {
      // Reset genres if 'genres' parameter is not present in the URL
      setFilters({ ...filter, genres: [] });
    }
  };
  
  const setSort = () => {
    const params = new URLSearchParams(searchParams.toString())
    if(!params.has('order_by')) {
      params.set('order_by', 'mal_id')
      router.push(`${pathname}?${params.toString()}`)
    }
    if(!params.has('sort')) {
      params.set('sort', 'desc')
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const changeCheckbox = (e: any, name: string) => {
    changeSelectFilters(e.target.checked, name)
    setFilters({ ...filter, [name]: e.target.checked})
    createQueryString(name, String(e.target.checked))
  }

  const checkboxChecked = (name: string): boolean => {
    return valueParams(name) ? valueParams(name) === 'true' : typeof filter[name] === 'string' ? filter[name] === 'true' : filter[name]
  }
  useEffect(() => {
    setSort()
    const newFilters: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      newFilters[key] = val;
    });
    setFilters({ ...filter, ...newFilters });
    setGenresValue()
  }, [searchParams]);


  return (
    <div className='w-full'>
      <h5 className='text-2xl'>Filter</h5>
      <div className='p-4 bg-white mt-6 rounded-sm'>
      <div className='flex flex-col gap-3 mt-3'>
        <label className='text-black text-xl'>Sort type</label>
        <Select
            placeholder='Chose a sort'
            className="basic-select"
            classNamePrefix='basic-select'
            isClearable
            options={OrderTypeAnime}
            value={OrderTypeAnime.find(option => option.value === valueParams('order_by'))}
            onChange={selectedOption => changeSelectFilters(selectedOption, 'order_by')}
          />
        </div>
        <div className='flex flex-col gap-3 mt-3 mb-6'>
        <label className='text-black text-xl'>Sort by</label>
          <Select
            placeholder='Chose a sort'
            className="basic-select"
            classNamePrefix='basic-select'
            isClearable
            options={MediaSort}
            value={MediaSort.find(option => option.value === valueParams('sort'))}
            onChange={selectedOption => changeSelectFilters(selectedOption, 'sort')}
          />
        </div>
        <div className='w-full h-[1px] bg-black'></div>

        <div className='flex flex-col gap-3 mt-3'>
          <label className='text-black text-xl'>Name</label>
          <input 
            onInput={(e) => changeSelectFilters(e.target, 'q')} 
            className='h-[36px] rounded-sm px-2 border-black border text-black placeholder:text-black' 
            placeholder='Search name'
            value={filter.q}
          />
        </div>

        <div className='flex flex-col gap-3 mt-3'>
          <label className='text-black text-xl'>Type</label>
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

        <div className='flex flex-col gap-3 mt-3'>
          <label className='text-black text-xl'>Score</label>
          <input 
            onInput={(e) => changeSelectFilters(e.target, 'score')} 
            pattern="[1-9]" 
            className='h-[36px] rounded-sm px-2 border-black border text-black placeholder:text-black' 
            placeholder='Search score'
            value={filter.score}
          />
        </div>

        <div className='flex flex-col gap-3 mt-3'>
          <label className='text-black text-xl'>Score range</label>
          <div className='flex gap-2 w-full'>
            <input 
              onInput={(e) => changeSelectFilters(e.target, 'min_score')} 
              pattern="[1-9]" 
              className='h-[36px] rounded-sm px-2 border-black border text-black placeholder:text-black w-full' 
              placeholder='Search min score'
              value={filter.min_score}
            />
            <input 
              onInput={(e) => changeSelectFilters(e.target, 'max_score')} 
              pattern="[1-9]" 
              className='h-[36px] rounded-sm px-2 border-black border text-black placeholder:text-black w-full' 
              placeholder='Search max score'
              value={filter.max_score}
            />
          </div>

        </div>

        {pageType === 'anime' ? 
          <div className='flex flex-col gap-3 mt-3'>
            <label className='text-black text-xl'>Rating</label>
            <Select
              placeholder='Chose a rating'
              className="basic-select"
              classNamePrefix='basic-select'
              isClearable
              options={MediaRating}
              value={MediaRating.find(option => option.value === valueParams('rating'))}
              onChange={selectedOption => changeSelectFilters(selectedOption, 'rating')}
            />
          </div>
          :
        <div className="flex mt-3">
          <input checked={checkboxChecked('sfw')} onChange={(e) => changeCheckbox(e, 'sfw')} type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-black-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="sfw" />
          <label htmlFor="sfw" className="text-xl text-black ms-3 dark:text-gray-400">For adult</label>
        </div>
        }


        <div className='flex flex-col gap-3 mt-3'>
          <label className='text-black text-xl'>Status</label>
          <Select
            placeholder='Chose a status'
            className="basic-select"
            classNamePrefix='basic-select'
            isClearable
            options={pageType === 'anime' ? mediaStatus : mediaStatusManga}
            value={(pageType === 'anime' ? mediaStatus : mediaStatusManga).find(option => option.value === valueParams('status'))}
            onChange={selectedOption => changeSelectFilters(selectedOption, 'status')}
          />
        </div>

        <div className='flex flex-col gap-3 mt-3'>
          <label className='text-black text-xl'>Genres</label>
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
          />
        </div>
      </div>
    </div>
  )
}

export default Filter