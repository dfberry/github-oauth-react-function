import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../component/navigation'

import { IUser } from '../utils/types'

type ILayoutProps = {
  user: IUser
}

const Layout: React.FC<ILayoutProps> = ({ user }) => {
  return (
    <>
      <Navigation user={user} />
      <Outlet />
    </>
  )
}
export default Layout
