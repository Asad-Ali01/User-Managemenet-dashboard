
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
function Router() {
  return (
    <div className='h-screen  flex flex-col '>
    <Header />
    <main className='flex-1'>

    <Outlet/>
    </main>
    

    <Footer/>
 
    </div>
  )
}

export default Router