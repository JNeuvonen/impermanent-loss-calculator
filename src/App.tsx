import AppBar from './components/Appbar'
import AppPage from './pages/App'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'
import './style/css/style.css'

function App() {
  return (
    <div>
      <AppBar />
      <Routes>
        <Route path="/" element={<AppPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
