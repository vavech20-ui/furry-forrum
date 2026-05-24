import Header from '../components/Header';
import CreateBoardForm from '../components/CreateBoardForm';

const CreateBoard = () => (
  <div>
    <Header />
    <div className="container">
      <h2>Создать доску</h2>
      <p className="hint">Доступно только администраторам.</p>
      <CreateBoardForm />
    </div>
  </div>
);

export default CreateBoard;
