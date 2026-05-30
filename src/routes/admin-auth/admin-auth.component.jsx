import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentAdmin } from '../../store/admin/admin.selector';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './admin-auth.styles.scss';

const AdminAuth = () => {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const navigate = useNavigate();

  // ✅ redirect to admin dashboard after successful sign in
  useEffect(() => {
    if (currentAdmin) {
      navigate('/admin');
    }
  }, [currentAdmin]);

  return (
    <div className='admin-auth'>
      <SignInForm isAdmin={true} />
    </div>
  );
};

export default AdminAuth;