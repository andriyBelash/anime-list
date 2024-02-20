import React from 'react'


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className='p-5'>
        {children}
      </div>
    </div>
  )
}

export default layout