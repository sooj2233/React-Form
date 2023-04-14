import { useState } from 'react'
import './App.css'
import { YouTubeForm } from './components/YoutubeForm'
import { YFormAuth } from './components/YFormAuth'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="app">
    <YouTubeForm/>
    <hr/>
    <YFormAuth/>
   </div>
  )
}

export default App
