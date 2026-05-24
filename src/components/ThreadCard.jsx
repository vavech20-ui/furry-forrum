import { Link } from 'react-router-dom';
import { mediaUrl } from '../utils/mediaUrl';

const ThreadCard = ({ thread }) => {
  const imageSrc = mediaUrl(thread.img);

  return (
    <article className="thread-card">
      <h3>
        <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
      </h3>
      {imageSrc && (
        <img src={imageSrc} alt={thread.title} className="thread-thumb" />
      )}
      {thread.description && <p>{thread.description}</p>}
      <div className="thread-meta">
        <span>Доска: {thread.board}</span>
        {thread.is_pinned && <span className="badge">Закреплён</span>}
        {thread.author != null && <span>Автор: #{thread.author}</span>}
        {thread.created_at && (
          <span>{new Date(thread.created_at).toLocaleString('ru-RU')}</span>
        )}
      </div>
    </article>
  );
};

export default ThreadCard;
