import { Routes, Route } from 'react-router'
import { ComponentPlayground } from './pages/playground'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentPlayground />} />
    </Routes>
  )
}
