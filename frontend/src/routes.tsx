import { Routes, Route, Navigate } from 'react-router-dom'
import Store from './pages/Store/Store'
import Biblioteca from './pages/Biblioteca/Biblioteca'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Admin from './pages/Admin/Admin'
import AdminUsuarios from './pages/Admin/Usuarios/AdminUsuarios'
import AdminJuegos from './pages/Admin/Juegos/AdminJuegos'
import Profile from './pages/Profile/Profile'
import { useUser } from './hooks/useUser'

const AppRoutes = () => {
  const { user } = useUser()

  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Navigate to="/store" replace />} />
        <Route path="/store" element={<Store />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {user?.tipo === 'ADMINISTRADOR' && (
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminUsuarios />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="juegos" element={<AdminJuegos />} />
          </Route>
        )}
      </Routes>
    </main>
  )
}

export default AppRoutes 