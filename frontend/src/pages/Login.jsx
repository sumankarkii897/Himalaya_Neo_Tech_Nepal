import React, { useContext } from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {zodResolver} from '@hookform/resolvers/zod'
import { LoginSchema } from '../schema/LoginSchema'
import API from '../services/Api'
import {toast} from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

function Login() {
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
   const {
    register, handleSubmit, watch, formState : {errors},
   }=useForm({
    resolver: zodResolver(LoginSchema)
   })
   const onSubmit = async(data) => {
    // alert(JSON.stringify(data))
    try {
      await API.post("/auth/login", data)
      await login();
      toast.success("Login successful")
      
      navigate("/");
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login Failed"
      toast.error(errorMessage);
      
    }
   }
  return (
   <>
    <div className="flex items-center justify-center h-screen">
         <div className="w-96 md:w-1/2 lg:w-1/3 mx-auto mt-10 p-5 border-white rounded shadow-2xl">

  <div className="text-center mb-4">
    <h2 className="text-2xl font-bold">Login</h2>
    <p className="text-[#9096B2]">Please login using your account details below</p>
  </div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2 '>
<input type="email" name="" id="" placeholder='Email Address' {...register("email")} className={`border w-full p-2 mb-2 focus:outline-none ${
    errors.email
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-pink-400"
  }`}/>
{
    errors.email && <p className='text-red-500'>{errors.email.message}</p>
}
</div>
<div className='mb-2'>
<input type="password" name="password" id="" placeholder='Password' {...register("password")} className={`border w-full p-2 mb-2 focus:outline-none ${
    errors.password
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-pink-400"
  }`}/>
{
    errors.password && <p className='text-red-500'>{errors.password.message}</p>
}
        </div>

        <button className='bg-pink-600 text-white w-full py-2 rounded mb-4 cursor-pointer'>Sign in</button>

        <p className='text-center text-[#9096B2]'>Don't have an Account ? <Link to='/register' className='text-pink-600 hover:underline'>Create account</Link></p>
    </form>
   </div>
    </div>
   
   </>
  )
}

export default Login