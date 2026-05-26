import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../../store/user/user.reducer';

const AuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('customerToken', token);

      fetch('http://localhost:5000/api/customers/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          dispatch(signInSuccess(data.customer));
          navigate('/');
        });
    } else {
      navigate('/auth'); // no token, go back to login
    }
  }, []);

  return <div>Signing you in with Google...</div>;
};

export default AuthCallback;