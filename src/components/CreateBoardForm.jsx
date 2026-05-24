import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../api/boards';
import { getErrorMessage } from '../api/client';

const CreateBoardForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    slug: '',
    name: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createBoard({
        slug: form.slug.trim(),
        name: form.name.trim(),
        description: form.description.trim(),
      });
      navigate('/', { state: { message: `Доска /${form.slug}/ создана` } });
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось создать доску'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      {error && <p className="error">{error}</p>}
      <label>
        Slug (короткий id, например game)
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="game"
          maxLength={10}
          required
        />
      </label>
      <label>
        Название
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Игры"
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
      <button type="submit" disabled={submitting}>
        {submitting ? 'Создание...' : 'Создать доску'}
      </button>
    </form>
  );
};

export default CreateBoardForm;
