import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Ищем пользователя с совпадающим email и password
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      login(user); // Авторизуем
      alert('Успешный вход!');
      navigate('/');
    } else {
      alert('Неверный email или пароль');
    }
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;