import CommentSection from './CommentSection';

const ThreadCard = ({ thread }) => {
  return (
    <div className="thread-card">
      <h3>{thread.title}</h3>
      <p>{thread.body}</p>
      <small>Автор: {thread.author}</small>

      {/* Комментарии к треду */}
      <CommentSection threadId={thread.id} />
    </div>
  );
};

export default ThreadCard;