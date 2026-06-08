import { useState, useEffect } from 'react'
import './App.css'
import Landing from './pages/Landing'
import Editor from './pages/Editor'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentHash === '#editor') {
    return <Editor />
  }

  return <Landing />
}

export default App
