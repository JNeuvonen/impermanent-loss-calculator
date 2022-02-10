import AppBar from './components/Appbar'
import AppPage from './pages/App'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'
import styles from './css/app.module.css'

function App() {
  return (
    <div className={styles.appDiv}>
      <AppBar />
      <Routes>
        <Route path="/" element={<AppPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
