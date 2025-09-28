
const Medium = ({medium, activeMedium, handleMedium}) => {
  return (
    <div className={`border p-2 sm:p-3 cursor-pointer text-xs sm:text-sm md:text-base hover:bg-gray-800 hover:text-white transition-colors ${medium === activeMedium ? 'bg-gray-800 text-white hover:bg-gray-800' : ''}`}
      onClick={() => handleMedium(medium)}
    >
      <h3 className='font-lora'>{medium}</h3>
    </div>
  )
}

export default Medium