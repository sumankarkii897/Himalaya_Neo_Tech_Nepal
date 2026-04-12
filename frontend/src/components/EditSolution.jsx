import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/Api'
import { toast } from 'react-toastify'
import { ArrowLeft } from 'lucide-react'

function EditSolution() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: ''
  })


  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const res = await API.get(`/solution/getSolution/${id}`)
        const data = res.data.data

        setFormData({
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price
        })

      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchSolution()
  }, [id])


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.put(`/solution/updateSolution/${id}`, formData)

      toast.success("Solution updated successfully")
      navigate(`/`)

    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed")
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-center mb-6">
          Edit Solution
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

      
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

        
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

        
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

     
          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

         
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/2 bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
            >
              Update
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default EditSolution