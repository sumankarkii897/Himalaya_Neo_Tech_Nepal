import React from 'react'
import { Link } from 'react-router-dom'

function Options({ user }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50">

      {user?.role === "admin" && (
        <>
          <Link to="/dashboard" className="hover:bg-gray-100 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/create/solution" className="hover:bg-gray-100 p-2 rounded">
            Create Solution
          </Link>
        </>
      )}

      <Link to="/profile" className="hover:bg-gray-100 p-2 rounded">
        Profile
      </Link>

    </div>
  )
}

export default Options