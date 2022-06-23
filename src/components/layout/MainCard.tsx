const MainCard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <main className='mx-auto sm:my-24 my-0 max-w-3xl'>
      <div className='main bg-primary overflow-hidden border border-gray-200 dark:border-1 dark:bg-primary rounded-md dark:border-gray-600 sm:border'>
        <div className='px-4 py-5 sm:flex sm:p-4'>{children}</div>
      </div>
    </main>
  )
}

export default MainCard
