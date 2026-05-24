import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import CommentSection from '../components/CommentSection';
import { deleteThread, fetchThread } from '../api/boards';
import { getErrorMessage } from '../api/client';
import { mediaUrl } from '../utils/mediaUrl';
import { isAdmin, useAuth } from '../context/AuthContext';

const ThreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchThread(id);
        setThread(data);
      } catch (err) {
        setError(getErrorMessage(err, 'Тред не найден'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Удалить этот тред и все посты в нём?')) return;
    setDeleting(true);
    setError('');
    try {
      await deleteThread(id);
      navigate('/', { state: { message: 'Тред удалён' } });
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось удалить тред'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <p>
          <Link to="/">← К списку тредов</Link>
        </p>
        {loading && <p>Загрузка...</p>}
        {error && <p className="error">{error}</p>}
        {thread && (
          <article className="thread-detail">
            <h1>{thread.title}</h1>
            {thread.img && (
              <img
                src={mediaUrl(thread.img)}
                alt={thread.title}
                className="thread-image"
              />
            )}
            {thread.description && <p>{thread.description}</p>}
            <div className="thread-meta">
              <span>Доска: {thread.board}</span>
              {thread.author != null && <span>Автор: #{thread.author}</span>}
              {thread.created_at && (
                <span>{new Date(thread.created_at).toLocaleString('ru-RU')}</span>
              )}
            </div>
            {isAdmin(user) && (
              <div className="thread-actions">
                <button
                  type="button"
                  className="btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Удаление...' : 'Удалить тред'}
                </button>
              </div>
            )}
            <CommentSection threadId={thread.id} />
          </article>
        )}
      </div>
    </div>
  );
};

export default ThreadDetail;
