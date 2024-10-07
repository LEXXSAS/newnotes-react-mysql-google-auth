import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <>
     <main className="mx-auto px-8 mt-24">
      <Navbar />
      <Outlet />
    </main>
    </>
  )
}

export default Layout
