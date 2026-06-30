import { Routes, Route } from 'react-router'
import { RefundList } from './pages/refund-list'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RefundList />} />
    </Routes>
  )
}
