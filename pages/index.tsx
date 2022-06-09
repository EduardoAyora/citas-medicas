import type { NextPage } from 'next'
import NuevaCita from '../src/components/nueva-cita/NuevaCita'

const Home: NextPage = () => {
  return (
    <div>
      <NuevaCita />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </div>
  )
}

export default Home
