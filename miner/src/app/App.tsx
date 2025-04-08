import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import PlayField from '../pages/playfield/ui/PlayPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayField />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
