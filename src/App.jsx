import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import CreateBoard from './pages/CreateBoard';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateThread from './pages/CreateThread';
import ThreadDetail from './pages/ThreadDetail';
import ActivateAccount from './pages/ActivateAccount';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Активация по почте отключена — заглушка на случай старых ссылок */}
          <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
          <Route
            path="/create-board"
            element={
              <AdminRoute>
                <CreateBoard />
              </AdminRoute>
            }
          />
          <Route
            path="/create-thread"
            element={
              <ProtectedRoute>
                <CreateThread />
              </ProtectedRoute>
            }
          />
          <Route path="/threads/:id" element={<ThreadDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
