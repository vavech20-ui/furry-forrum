import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { getErrorMessage } from '../api/client';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    re_password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.re_password) {
      setError('Пароли не совпадают');
      return;
    }

    setSubmitting(true);
    try {
      await register(formData);
      navigate('/login', {
        state: {
          message:
            'Регистрация успешна. Проверьте почту и перейдите по ссылке для активации аккаунта.',
        },
      });
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось зарегистрироваться'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      {error && <p className="error">{error}</p>}
      <label>
        Имя пользователя
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
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
        />
      </label>
      <label>
        Повтор пароля
        <input
          name="re_password"
          type="password"
          value={formData.re_password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
