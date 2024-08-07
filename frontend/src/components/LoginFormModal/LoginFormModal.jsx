import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [loginErrors, setLoginErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = async () => {
    const demoCredential = 'DemoUser';
    const demoPassword = 'password';

    try {
      setCredential(demoCredential);
      setPassword(demoPassword);
      setErrors({});

      await dispatch(sessionActions.login({ credential: demoCredential, password: demoPassword }));
      closeModal();
    } catch (err) {
      console.error('Demo login failed:', err);
    }
  };

  useEffect(() => {
    const loginErrors = {}

    if (credential.length < 4) loginErrors.credential = 'not long enough'
    if (password.length < 6) loginErrors.password= 'not long enough'

    setLoginErrors(loginErrors)
  }, [credential, password, errors])



  return (
    <div className='modal-container'>
      <h1 id='login-word'>Log In</h1>
      <form className='modal-form' onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button id='submit-button' type="submit" disabled={Object.keys(loginErrors).length}>Log In</button>
      </form>
      <button id='demo-button' type='button' onClick={handleDemoLogin}>Demo User Login</button>
    </div>
  );
}

export default LoginFormModal;
