import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Profile() {
    const {user}= useContext(AuthContext);

    
  return (
    <div className='flex  items-center mt-20 '>
        {/* <h1 className='text-xl md:text-2xl text-center mt-10'>Welcome to your profile, {user?.username}</h1> */}
       <div className="w-96 md:w-1/2 lg:w-1/3 mx-auto p-5 border-white rounded shadow-2xl">
       <h2 className='text-2xl font-bold text-center mb-4'>Profile</h2>
         <form className=' mt-5'>
            <div className='mb-2 flex gap-2 items-center '>
                <label htmlFor="username" className='block mb-1'>Username</label>
                <input type="text" id='username' value={user?.username} disabled className='border w-full p-2 focus:outline-none border-gray-300 '/>
            </div>
            <div className='mb-2 flex gap-2 items-center '>
                <label htmlFor="email" className='block mb-1'>Email</label>
                <input type="email" id='email' value={user?.email} disabled className='border w-full p-2 focus:outline-none border-gray-300 '/>
            </div>
            <div className='mb-2 flex gap-2 items-center '>
                <label htmlFor="role" className='block mb-1'>Role</label>
                <input type="text" id='role' value={user?.role} disabled className='border w-full p-2 focus:outline-none border-gray-300 '/>
            </div>
        </form>
       </div>
    </div>
  )
}

export default Profile