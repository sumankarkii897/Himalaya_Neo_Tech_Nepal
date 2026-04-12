import React,{useState,useEffect} from 'react'
import API from '../services/Api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {CreateSolutionSchema} from '../schema/CreateSolution'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'react-toastify'

function CreateSolution() {
    const navigate = useNavigate();
   const { register, handleSubmit, formState: {errors}, reset}=useForm({
    resolver:zodResolver(CreateSolutionSchema)
   })
   const onSubmit = async (data) => {
    
    
    try {
        await API.post("/solution/createSolution",data)
        toast.success("Solution Created Successfully")
        reset()
    } catch (error) {
         const errorMessage = error.response?.data?.message || "Solution Creation Failed"
              toast.error(errorMessage);
    }
   }
  return (
       <div className="min-h-screen bg-gray-100 flex  items-center justify-center p-4">
       <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">
        <button
        onClick={()=> navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Solution
        </h1>
        <form  className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
<div >
    <label htmlFor="solutionName" className="text-sm text-gray-600">Solution Name</label>
    <input type="text" name="solutionName" id="solutionName" {...register("name")} className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none" />
    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}  

</div>
<div className="">
    <label htmlFor='description' className="text-sm text-gray-600">Description</label>
    <textarea name="description" id="description" {...register("description")} className='w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none'></textarea>
    {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
</div>
<div>
    <label htmlFor='category' className='text-sm text-gray-600'>Category</label>
    <input type="text" name="category" id="category" {...register("category")} className='border rounded w-full p-2 focus:ring-2 focus:ring-pink-400 outline-none' />
    {errors.category && <p className='text-red-500 text-sm'>{errors.category.message}</p>}
</div>
<div>
    <label htmlFor='price' className='text-sm text-gray-600'>Price</label>
    <input type="number" name="price" id="price" {...register("price",{valueAsNumber: true})} className='w-full border rounded p-2 focus:ring-2 focus:ring-pink-400 outline-none'/>
    {
        errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>
    }
</div>
<div className="flex gap-3 pt-4">
    <button type="button"
    onClick={()=>navigate(-1)}
        className="w-1/2 bg-gray-300 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
    >Cancel</button>
    <button
              type="submit"
              className="w-1/2 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition cursor-pointer"
            >
              Create
            </button>
</div>

        </form>
        
        </div> 
        
        
        </div>
  )
}

export default CreateSolution