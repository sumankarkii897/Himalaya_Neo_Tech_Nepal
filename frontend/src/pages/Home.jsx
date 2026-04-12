import React, { useEffect, useState } from "react";
import SolutionCard from "../components/SolutionCard";
import API from "../services/Api";

function Home() {
  const [solutions, setSolutions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const fetchSolutions = async (pageNumber = 1) => {
    try {
      const response = await API.get(
        `/solution/getAllSolutions?page=${pageNumber}&limit=${limit}`
      );

      setSolutions(response.data.data);
      setPage(response.data.pagination.page);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
  };

  useEffect(() => {
    fetchSolutions(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchSolutions(newPage);
    }
  };

  return (
    <>
     
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} product={solution} />
        ))}
      </div>

  
      <div className="flex justify-center items-center gap-2 mt-6 mb-10">
        
       
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

    
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

   
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Home;