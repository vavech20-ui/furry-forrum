import Header from '../components/Header';
import ThreadList from '../components/ThreadList';

const Home = () => {
  return (
    <div>
      <Header /> {/* ← Эта строка должна быть */}
      <div className="container">
        <h1>Фурри-форум</h1>
        <ThreadList />
      </div>
    </div>
  );
};

export default Home;