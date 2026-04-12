import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/Api'
import { toast } from 'react-toastify'
import { ArrowLeft, Tag, DollarSign } from 'lucide-react'

function SingleSolution() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [solution, setSolution] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const res = await API.get(`/solution/getSolution/${id}`)
        setSolution(res.data.data)
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load solution")
      } finally {
        setLoading(false)
      }
    }

    fetchSolution()
  }, [id])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading solution...</p>
      </div>
    )
  }

  if (!solution) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">No solution found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 relative">


        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft size={18} />
          Back
        </button>

  
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {solution.name}
        </h1>

        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-1 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
            <Tag size={14} />
            {solution.category}
          </span>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl mb-6">
          <h3 className="text-gray-700 font-semibold mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {solution.description}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-pink-50 px-6 py-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
              <DollarSign size={18} />
              Price
            </div>
            <h2 className="text-3xl font-bold text-pink-600">
              Rs. {solution.price}
            </h2>
          </div>
        </div>

      
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default SingleSolution