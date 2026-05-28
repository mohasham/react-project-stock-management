import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './admin-auth.styles.scss';

const AdminAuth = () => {
  return (
    <div className='admin-auth'>
      <SignInForm isAdmin={true} />
    </div>
  );
};

export default AdminAuth;