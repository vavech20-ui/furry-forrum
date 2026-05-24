import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const CommentSection = ({ threadId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Читаем комментарии из localStorage
    const allComments = JSON.parse(localStorage.getItem('comments')) || [];
    const threadComments = allComments.filter(comment => comment.threadId === threadId);
    setComments(threadComments);
  }, [threadId]);

  const handleAddComment = () => {
    if (!user) {
      alert('Войдите, чтобы оставлять комментарии');
      return;
    }

    if (!newComment.trim()) {
      alert('Комментарий не может быть пустым');
      return;
    }

    // Создаём новый комментарий
    const comment = {
      id: Date.now(),
      threadId,
      text: newComment,
      author: user.username,
      createdAt: new Date().toISOString(),
    };

    // Получаем текущие комментарии
    const allComments = JSON.parse(localStorage.getItem('comments')) || [];

    // Добавляем новый
    allComments.push(comment);

    // Сохраняем
    localStorage.setItem('comments', JSON.stringify(allComments));

    // Обновляем состояние
    setComments([...allComments.filter(c => c.threadId === threadId)]);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h4>Комментарии:</h4>
      <ul>
        {comments.length > 0 ? (
          comments.map(comment => (
            <li key={comment.id}>
              <strong>{comment.author}:</strong> {comment.text}
              <small> ({new Date(comment.createdAt).toLocaleString()})</small>
            </li>
          ))
        ) : (
          <li>Нет комментариев</li>
        )}
      </ul>

      {user && (
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Написать комментарий..."
          />
          <button onClick={handleAddComment}>Отправить</button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;