import { Hourglass } from 'ldrs/react'
import 'ldrs/react/Hourglass.css'

const Spinner = () => {
  return <Hourglass
    size="40"
    bgOpacity="0.1"
    speed="1.75"
    color="black"
  />
}

export default Spinner