import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '../schema/RegisterSchema'
import { toast } from 'react-toastify'
import API from '../services/Api'
function Register() {
    const navigate = useNavigate();
    const {register, handleSubmit , formState : {errors}, reset}= useForm({
        resolver : zodResolver(RegisterSchema)
    })
    const onSubmit = async(data) => {
        // alert(JSON.stringify(data))
        try {
           await API.post('/auth/register',data);
            toast.success("User registered successfully");
            reset();
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error occurred while registering user";
            toast.error(errorMessage);
        }
    }
  return (
   <>
  <div className="flex items-center justify-center h-screen">
     <div className="w-96 md:w-1/2 lg:w-1/3 mx-auto mt-10 p-5 border-white rounded shadow-2xl">
   <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
   <form onSubmit={handleSubmit(onSubmit)}>
<div className="mb-2">
    <input type="text" name="username" id="" {...register("username")} placeholder='Username' className='border w-full p-2 mb-2'/>
    {
        errors.username && <p className='text-red-500'>{errors.username.message}</p>
    }
</div>
<div className="mb-2">
    <input type="email" name="email" id="" {...register("email")} placeholder='Email Address' className='border w-full p-2 mb-2'/>
    {
        errors.email && <p className='text-red-500'>{errors.email.message}</p>
    }
</div>
<div className="mb-2">
    <input type="password" name="password" id="" {...register("password")} placeholder='Password' className='border  w-full p-2 mb-2'/>
    {
        errors.password && <p className='text-red-500'>{errors.password.message}</p>
    }
</div>
<button className='bg-pink-600 text-white w-full py-2 rounded mb-4 cursor-pointer'>Sign up</button>

<p className='text-center text-[#9096B2]'>Already have an Account ? <Link to='/login' className='text-pink-600 hover:underline'>Login</Link></p>

   </form>
   </div>
  </div>
   </>
  )
}

export default Register