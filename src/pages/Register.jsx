import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

const Register = () => (
  <div>
    <Header />
    <div className="container">
      <h2>Регистрация</h2>
      <RegisterForm />
    </div>
  </div>
);

export default Register;
