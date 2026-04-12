import { Delete, Edit, Eye, Trash } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';
function SolutionCard({product}) {
    const navigate = useNavigate();
    const {user}=useContext(AuthContext);
    const handleView = async(product) => {
try {
    
    // const response = await API.get(`/solution/getSolution/${product.id}`)
    // const solution = response.data.data;
    // alert(`Solution Details:\nName: ${solution.name}\nDescription: ${solution.description}\nCategory: ${solution.category}\nPrice: ${solution.price}`);
    navigate(`/solution/${product.id}`)
} catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch solution details"
    toast.error(errorMessage);
}
    }
    const handleDelete = async(product) => {
try {
    await API.delete(`/solution/deleteSolution/${product.id}`)
toast.success("Solution deleted successfully");
} catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete solution"
    toast.error(errorMessage);
}

    }
    const handleEdit = async (product) => {
        navigate(`/solution/edit/${product.id}`)
    }
  return (
     <div className="bg-white h-72 w-72 p-4 border rounded shadow-xl relative ">
      <h2 className="text-xl font-bold text-center">{product.name}</h2>
     <div className="flex flex-col justify-between gap-2 mt-2">

         <p className="text-gray-600"> Description : {product.description}</p>
      <p className="text-gray-600">Category : {product.category}</p>
      <p className="mt-2 text-gray-600">Price : {product.price}</p>
     </div>
   
     <div className="absolute bottom-4 left-0 w-full px-2 flex justify-evenly gap-2 flex-wrap">

  <button className="cursor-pointer text-pink-600 hover:text-pink-700 flex items-center gap-2" onClick={() => handleView(product)}>
    <Eye size={18} /> 
  </button>

  {user?.role === "admin" && (
    <>
      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 cursor-pointer" onClick={() => handleEdit(product)}>
        <Edit size={18} />
      </button>

      <button className="text-red-600 hover:text-red-700 flex items-center gap-2 cursor-pointer" onClick={() => handleDelete(product)}>
        <Trash size={18} /> 
      </button>
    </>
  )}

</div>
    </div>
  )
}

export default SolutionCard