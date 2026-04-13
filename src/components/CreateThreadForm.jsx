import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateThreadForm = () => {
  const [threadData, setThreadData] = useState({
    title: '',
    body: '',
    tags: '',
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    alert('Войдите для создания треда');
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setThreadData({ ...threadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем текущие треды из localStorage
    const threads = JSON.parse(localStorage.getItem('threads')) || [];

    // Создаём новый тред
    const newThread = {
      id: Date.now(), // уникальный ID
      title: threadData.title,
      body: threadData.body,
      tags: threadData.tags,
      author: user.username,
    };

    // Добавляем тред в массив
    threads.push(newThread);

    // Сохраняем обратно в localStorage
    localStorage.setItem('threads', JSON.stringify(threads));

    alert('Тред успешно создан!');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Заголовок треда"
        onChange={handleChange}
        required
      />
      <textarea
        name="body"
        placeholder="Текст треда"
        onChange={handleChange}
        required
      />
      <input
        name="tags"
        placeholder="Теги (через запятую)"
        onChange={handleChange}
      />
      <button type="submit">Создать тред</button>
    </form>
  );
};

export default CreateThreadForm;