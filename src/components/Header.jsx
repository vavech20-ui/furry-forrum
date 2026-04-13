import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <nav>
        <Link to="/">Главная</Link> |{' '}
        {!user ? (
          <>
            <Link to="/login">Войти</Link> |{' '}
            <Link to="/register">Регистрация</Link>
          </>
        ) : (
          <>
            <Link to="/create-thread">Создать тред</Link> |{' '}
            <button onClick={() => logout()}>Выйти</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;