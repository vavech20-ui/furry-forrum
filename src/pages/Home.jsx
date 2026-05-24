import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ThreadList from '../components/ThreadList';
import { fetchBoards } from '../api/boards';
import { getErrorMessage } from '../api/client';

const Home = () => {
  const location = useLocation();
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState('');
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchBoards()
      .then(setBoards)
      .catch((err) => setError(getErrorMessage(err, 'Не удалось загрузить доски')));
  }, [refreshKey]);

  useEffect(() => {
    if (location.state?.message) {
      setRefreshKey((k) => k + 1);
    }
  }, [location.state]);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Фурри-форум</h1>
        {location.state?.message && (
          <p className="success">{location.state.message}</p>
        )}
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
