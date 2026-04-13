const ThreadCard = ({ thread }) => {
  return (
    <div className="thread-card">
      <h3>{thread.title}</h3>
      <p>{thread.body}</p>
      <small>Автор: {thread.author}</small>
    </div>
  );
};

export default ThreadCard;