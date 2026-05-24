import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPost, deletePost, fetchPosts } from '../api/boards';
import { getErrorMessage } from '../api/client';
import { mediaUrl } from '../utils/mediaUrl';
import { Link } from 'react-router-dom';

const CommentSection = ({ threadId }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadPosts = useCallback(async () => {
    if (!user) {
      setPosts([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const all = await fetchPosts();
      setPosts(all.filter((p) => String(p.thread) === String(threadId)));
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось загрузить посты'));
    } finally {
      setLoading(false);
    }
  }, [threadId, user]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Текст поста не может быть пустым');
      return;
    }

    const formData = new FormData();
    formData.append('thread', threadId);
    formData.append('content', content.trim());
    if (imageFile) formData.append('img', imageFile);
    if (videoFile) formData.append('video', videoFile);

    setSubmitting(true);
    setError('');
    try {
      await createPost(formData);
      setContent('');
      setImageFile(null);
      setVideoFile(null);
      await loadPosts();
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось отправить пост'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Удалить пост?')) return;
    try {
      await deletePost(postId);
      await loadPosts();
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось удалить пост'));
    }
  };

  if (!user) {
    return (
      <div className="comment-section">
        <p>
          <Link to="/login">Войдите</Link>, чтобы читать и писать посты в треде.
        </p>
      </div>
    );
  }

  return (
    <div className="comment-section">
      <h4>Посты в треде</h4>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Загрузка постов...</p>
      ) : (
        <ul className="post-list">
          {posts.length === 0 ? (
            <li className="post-empty">Постов пока нет</li>
          ) : (
            posts.map((post) => (
              <li key={post.id} className="post-item">
                <p>{post.content}</p>
                {post.img && (
                  <img src={mediaUrl(post.img)} alt="" className="post-media" />
                )}
                {post.video && (
                  <video controls src={mediaUrl(post.video)} className="post-media" />
                )}
                <button
                  type="button"
                  className="btn-link danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Удалить
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Текст поста..."
          rows={3}
        />
        <label>
          Картинка (необязательно)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </label>
        <label>
          Видео mp4/webm/mov (необязательно)
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Отправка...' : 'Отправить пост'}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
