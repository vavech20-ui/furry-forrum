import { useState, useEffect } from 'react';
import ThreadCard from './ThreadCard';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Читаем треды из localStorage
    const savedThreads = JSON.parse(localStorage.getItem('threads')) || [
      { id: 1, title: 'Добро пожаловать!', body: 'Первый тред.', author: 'Foxy' },
      { id: 2, title: 'Любимые персонажи', body: 'Кто ваши любимые фурри?', author: 'Wolfie' },
    ];
    setThreads(savedThreads);
  }, []);

  return (
    <div>
      {threads.map(thread => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;