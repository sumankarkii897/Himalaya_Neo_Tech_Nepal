import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LogIn, LogOut, UserRound } from 'lucide-react'

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  const [showOptions, setShowOptions] = useState(false)
  const dropdownRef = useRef()

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className='bg-gray-600 w-full p-4 text-white flex justify-between items-center'>

   
      <h2 className='font-bold ml-3 text-sm md:text-xl'>
        <Link to="/">Himalaya Neo Tech Nepal</Link>
      </h2>

      <div className="relative" ref={dropdownRef}>

        {user ? (
          <div className='flex gap-5 items-center'>

          
            <div
              className='flex gap-2 items-center cursor-pointer hover:text-gray-200 transition'
              onClick={() => setShowOptions(prev => !prev)}
            >
              <UserRound size={20} />
              <span className='text-sm md:text-xl'>{user.username}</span>
            </div>

          
            <button
              className='flex gap-2 items-center cursor-pointer hover:text-gray-200 transition'
              onClick={logout}
            >
              <LogOut size={20} />
              <span className='text-sm md:text-xl'>Logout</span>
            </button>

          </div>
        ) : (
          <Link to="/login" className='flex gap-2 items-center hover:text-gray-200 transition'>
            <LogIn size={20} />
            <span>Login</span>
          </Link>
        )}

   
        {showOptions && user && (
          <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-lg p-3 flex flex-col gap-2 animate-fadeIn z-999">

            {user.role === "admin" && (
              <>
                <Link to="/dashboard" className="hover:bg-gray-100 p-2 rounded transition">
                  Dashboard
                </Link>
                <Link to="/create/solution" className="hover:bg-gray-100 p-2 rounded transition">
                  Create Solution
                </Link>
              </>
            )}

            <Link to="/profile" className="hover:bg-gray-100 p-2 rounded transition">
              Profile
            </Link>

          </div>
        )}

      </div>

    </div>
  )
}

export default Navbar