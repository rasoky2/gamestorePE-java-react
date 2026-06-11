import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Navbar from './components/Navbar/Navbar'
import AppRoutes from './routes'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
