import React from 'react'

function DashboardCard({ title, value}) {
  return (
    <div className={`p-5 rounded-2xl shadow-lg bg-white flex items-center justify-between hover:shadow-xl transition duration-300`}>

      {/* Left Content */}
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>

    </div>
  )
}

export default DashboardCard