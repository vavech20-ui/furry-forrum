import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createThread, fetchBoards } from '../api/boards';
import { getErrorMessage } from '../api/client';

const CreateThreadForm = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [form, setForm] = useState({
    board: '',
    name: '',
    title: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBoards()
      .then((data) => {
        setBoards(data);
        if (data.length) {
          setForm((prev) => ({ ...prev, board: String(data[0].id) }));
        }
      })
      .catch(() => setError('Не удалось загрузить список досок'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Картинка обязательна для треда');
      return;
    }

    const formData = new FormData();
    formData.append('board', form.board);
    formData.append('name', form.name);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('img', imageFile);

    setSubmitting(true);
    setError('');
    try {
      const thread = await createThread(formData);
      navigate(`/threads/${thread.id}`);
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось создать тред'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      {error && <p className="error">{error}</p>}
      <label>
        Доска
        <select name="board" value={form.board} onChange={handleChange} required>
          {boards.map((b) => (
            <option key={b.id} value={b.id}>
              /{b.slug}/ — {b.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Короткое имя (name)
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="general"
          required
        />
      </label>
      <label>
        Заголовок
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Описание
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </label>
      <label>
        Картинка треда (обязательно)
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
        />
      </label>
      <button type="submit" disabled={submitting || !boards.length}>
        {submitting ? 'Создание...' : 'Создать тред'}
      </button>
    </form>
  );
};

export default CreateThreadForm;
