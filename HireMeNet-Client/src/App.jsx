import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <footer>Footer</footer>
    </>
  )
}

export default App