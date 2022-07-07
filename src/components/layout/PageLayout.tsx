import React from 'react'

interface Props {
  children: React.ReactNode
  pageTitle: string
  pageDescription?: string
}

const PageLayout: React.FC<Props> = ({
  children,
  pageTitle,
  pageDescription,
}) => {
  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <main className='relative z-0 flex-1 overflow-y-auto focus:outline-none max-w-[1700px]'>
        <div className='py-8'>
          <div className='block min-h-[80px] justify-between px-4 sm:flex sm:px-6 md:px-8'>
            <div className='mb-8 w-full'>
              <h1 className='font-cal mb-1 text-xl font-bold capitalize tracking-wide text-gray-900'>
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className='min-h-10 text-sm text-neutral-500 ltr:mr-4 rtl:ml-4'>
                  {pageDescription}
                </p>
              )}
            </div>
          </div>
          <div className='px-4 sm:px-6 md:px-8'>{children}</div>
          <div className='block pt-12 md:hidden'></div>
        </div>
      </main>
    </div>
  )
}

export default PageLayout
