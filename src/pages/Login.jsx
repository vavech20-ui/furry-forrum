import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { getErrorMessage } from '../api/client';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(formData.username, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, 'Неверный логин или пароль'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Вход</h2>
        {location.state?.message && (
          <p className="success">{location.state.message}</p>
        )}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form-card">
          <label>
            Имя пользователя
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </label>
          <label>
            Пароль
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <p>
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
