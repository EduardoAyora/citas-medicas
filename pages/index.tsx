import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className='flex h-screen justify-center items-center'>
      <Link href='/login'>
        <span className='underline text-blue-600 cursor-pointer'>Login</span>
      </Link>
    </div>
  )
}

export default Home
