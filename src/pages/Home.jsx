import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ThreadList from '../components/ThreadList';
import { fetchBoards } from '../api/boards';
import { getErrorMessage } from '../api/client';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBoards()
      .then(setBoards)
      .catch((err) => setError(getErrorMessage(err, 'Не удалось загрузить доски')));
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Фурри-форум</h1>
        {error && <p className="error">{error}</p>}
        {boards.length > 0 && (
          <div className="board-filter">
            <label>
              Доска:{' '}
              <select value={boardId} onChange={(e) => setBoardId(e.target.value)}>
                <option value="">Все</option>
                {boards.map((b) => (
                  <option key={b.id} value={b.id}>
                    /{b.slug}/ — {b.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <ThreadList boardId={boardId || null} />
      </div>
    </div>
  );
};

export default Home;
