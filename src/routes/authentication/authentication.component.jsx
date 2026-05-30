import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user.selector';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // ✅ redirect to home after successful customer sign in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;