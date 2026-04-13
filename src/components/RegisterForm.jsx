import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем текущих пользователей
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем, существует ли пользователь с таким email
    const existingUser = users.find(user => user.email === formData.email);

    if (existingUser) {
      alert('Пользователь с таким email уже существует');
      return;
    }

    // Добавляем нового пользователя
    users.push(formData);

    // Сохраняем в localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация успешна! Можете войти.');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Имя пользователя"
        onChange={handleChange}
        required
      />
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
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;