import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import API from '../services/Api'

function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/dashboard')
        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  if (!data) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading dashboard...
      </p>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <DashboardCard
          title="Total Users"
          value={data.totalUsers}
        
        />

        <DashboardCard
          title="Total Products"
          value={data.totalProducts}
         
        />

        <DashboardCard
          title="Total Categories"
          value={data.totalCategories}
         
        />

      </div>


      <div className="bg-white rounded-2xl shadow-lg p-5">

        <h2 className="text-xl font-bold mb-4">
          Products by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {data.productsPerCategory.map((item, index) => (
           <DashboardCard
              key={index}
              title={item.category}
              value={item.count}
            />
          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard