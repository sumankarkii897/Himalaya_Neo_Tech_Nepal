import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Navbar/>
    <main className='m-6'>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout