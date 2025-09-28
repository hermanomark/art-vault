
const Pagination = ({ currentPage, totalPages, hasNextPage, hasPrevPage, handleNextPage, handlePrevPage }) => {
  return (
    <div className='flex justify-center items-center gap-4 mt-8'>
      <button
        onClick={handlePrevPage}
        disabled={!hasPrevPage}
        className={`font-lora cursor-pointer px-4 py-2 font-medium transition-colors ${hasPrevPage
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        Previous
      </button>

      <span className='font-lora text-sm font-medium'>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`font-lora cursor-pointer px-4 py-2 font-medium transition-colors ${hasNextPage
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination