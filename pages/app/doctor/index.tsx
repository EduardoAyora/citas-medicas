import { LogoutIcon } from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'
import PageLayout from '../../../src/components/layout/PageLayout'

const index = () => {
  return (
    <PageLayout pageTitle='Panel de doctor'>
      <>
        <button onClick={() => signOut()} className='button'>
          <LogoutIcon className='w-5 h-5 mr-2' />
          Logout
        </button>
      </>
    </PageLayout>
  )
}

export default index
