import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

import Hero from './components/Hero'
import Header from './components/Header'
import VideoImage from './components/video-image'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Hero />
    <VideoImage />
    </>
  )
}

export default App
