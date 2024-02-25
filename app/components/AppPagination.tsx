'use client'

import React from 'react'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
type PropType = {
  pages: number;
  currentPage: number
};

const AppPagination = ({ pages, currentPage }: PropType) => {

  const MAX_VISIBLE_PAGES = 5;
  const pathName = usePathname();

  const params = useSearchParams()
  const q = Object.fromEntries(params.entries())

  const getVisiblePages = (): Array<number | string> => {
    if (pages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: pages }, (_, index) => index + 1);
    }

    const visiblePages: Array<number | string> = [1, 2]; // Always show the first two pages

    if (currentPage > 4) {
      visiblePages.push('...'); // Add ellipsis if current page is greater than 4
    }

    // Calculate the range of visible pages around the current page
    const startPage = Math.max(3, currentPage - 2);
    const endPage = Math.min(pages - 2, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (currentPage < pages - 3) {
      visiblePages.push('...'); // Add ellipsis if current page is less than pages - 3
    }

    // Always show the last two pages
    visiblePages.push( pages);

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <Link
        href={{ pathname: pathName, query: { ...q,page: currentPage === 1 ? 1 : currentPage - 1 } }}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        Prev
      </Link>
      {visiblePages.map((page, index) => {
        const isEllipsis = page === '...';

        return (
          <React.Fragment key={index}>
            {!isEllipsis && (
              <Link  href={{ pathname: pathName, query: { ...q,page: page } }} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 ${currentPage === page ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0' : ''}`}>
                {page}
              </Link>
            )}
            {isEllipsis && <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>}
          </React.Fragment>
        );
      })}
      <Link
        href={{ pathname: pathName, query: { ...q,page: currentPage === pages ? pages : currentPage + 1 } }}
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        Next
      </Link>
    </nav>
  )
}

export default AppPagination