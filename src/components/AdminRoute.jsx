import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin, useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin(user)) {
    return (
      <div className="container">
        <p className="error">
          Создание досок доступно только администраторам. Войдите под учёткой с правами
          staff или создайте суперпользователя (`createsuperuser`).
        </p>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
