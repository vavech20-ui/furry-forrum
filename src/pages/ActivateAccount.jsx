import { Link } from 'react-router-dom';
import Header from '../components/Header';

/**
 * Заглушка: активация по почте отключена (DJOSER SEND_ACTIVATION_EMAIL = False).
 * Старые ссылки из писем сюда ведут, но отдельный шаг не нужен.
 */
const ActivateAccount = () => (
  <div>
    <Header />
    <div className="container">
      <h2>Активация аккаунта</h2>
      <p className="success">
        Активация по почте сейчас не используется. После регистрации можно сразу войти.
      </p>
      <p>
        <Link to="/login">Перейти ко входу</Link>
      </p>
    </div>
  </div>
);

export default ActivateAccount;
