import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { activateAccount } from '../api/auth';
import { getErrorMessage } from '../api/client';
import Header from '../components/Header';

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        await activateAccount(uid, token);
        setStatus('success');
        setMessage('Аккаунт активирован. Теперь можно войти.');
      } catch (err) {
        setStatus('error');
        setMessage(getErrorMessage(err, 'Не удалось активировать аккаунт'));
      }
    };
    run();
  }, [uid, token]);

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Активация аккаунта</h2>
        {status === 'loading' && <p>Активация...</p>}
        {status !== 'loading' && (
          <p className={status === 'error' ? 'error' : 'success'}>{message}</p>
        )}
        <p>
          <Link to="/login">Перейти ко входу</Link>
        </p>
      </div>
    </div>
  );
};

export default ActivateAccount;
