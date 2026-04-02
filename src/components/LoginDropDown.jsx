import React from 'react'
import { logout } from "../services/authApi.js";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LogOut } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
function LoginDropDown( ) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div className='bg-blue-600 rounded-md shadow-lg'>
                <Link to={'/dashboard/my-profile'}
                        className="flex cursor-pointer gap-2 items-center w-full px-4 py-3 hover:bg-blue-700 transition-all duration-200 rounded-md text-white font-semibold">
                
                <LayoutDashboard size={18}/>
                    <span>Dashboard</span>
                </Link>
                <button 
                        onClick={()=>dispatch(logout(navigate))}
                        className="flex cursor-pointer gap-2 items-center w-full px-4 py-3 hover:bg-blue-700 transition-all duration-200 rounded-md text-white font-semibold border-t border-blue-500">
                            <LogOut size={18}/>
                    <span>LogOut</span>
                </button>
    </div>
  )
}

export default LoginDropDown