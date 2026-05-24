import { Link } from 'react-router-dom';
import { isAdmin, useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, loading } = useAuth();

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="logo">
          Фурри-форум
        </Link>
        <div className="nav-links">
          {!loading && !user ? (
            <>
              <Link to="/login">Войти</Link>
              <Link to="/register">Регистрация</Link>
            </>
          ) : (
            !loading && (
              <>
                <span className="user-greeting">Привет, {user.username}</span>
                {isAdmin(user) && <Link to="/create-board">Создать доску</Link>}
                <Link to="/create-thread">Создать тред</Link>
                <button type="button" onClick={logout}>
                  Выйти
                </button>
              </>
            )
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
