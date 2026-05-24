import { useEffect, useState } from 'react';
import { fetchThreads } from '../api/boards';
import { getErrorMessage } from '../api/client';
import ThreadCard from './ThreadCard';

const ThreadList = ({ boardId }) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchThreads();
        const filtered = boardId
          ? data.filter((t) => String(t.board) === String(boardId))
          : data;
        setThreads(filtered);
      } catch (err) {
        setError(getErrorMessage(err, 'Не удалось загрузить треды'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [boardId]);

  if (loading) return <p>Загрузка тредов...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!threads.length) return <p>Тредов пока нет.</p>;

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;
