import { Outlet, useLocation } from 'react-router-dom'

import NavBar from '../ui/NavBar'
import ToolBar from '../ui/ToolBar'

export default function Home() {
  const { pathname } = useLocation()
  return (
    <>
      <NavBar />
      {pathname==='/home/student'||pathname==='/home/score'?<ToolBar />:null}
      <Outlet />
    </>
  )
}