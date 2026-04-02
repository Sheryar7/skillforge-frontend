import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/Dashboard/SideBar'
function Dashboard() {
    const {loading:authloading} = useSelector(state=>state.auth)
    const {loading:profileloading} = useSelector(state=>state.profile)

    if(authloading || profileloading){
        return(
            <div className="spinner mx-auto">
          <div></div>   
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
        </div>
        )
    }
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="ml-64 w-full pt-20 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard