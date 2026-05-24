import Header from '../components/Header';
import CreateThreadForm from '../components/CreateThreadForm';

const CreateThread = () => (
  <div>
    <Header />
    <div className="container">
      <h2>Создать тред</h2>
      <CreateThreadForm />
    </div>
  </div>
);

export default CreateThread;
