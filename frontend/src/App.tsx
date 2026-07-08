import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import store from './store'

// Pages
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import CreatorProfile from './pages/Creator/CreatorProfile'
import CreatorDiscovery from './pages/Creator/CreatorDiscovery'
import Campaigns from './pages/Campaigns/Campaigns'
import Messages from './pages/Messages/Messages'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminDashboard from './pages/Admin/AdminDashboard'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/creators" element={<CreatorDiscovery />} />
            <Route path="/creator/:id" element={<CreatorProfile />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
