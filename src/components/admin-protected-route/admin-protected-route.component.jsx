import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentAdmin } from '../../store/admin/admin.selector';

const AdminProtectedRoute = ({ children }) => {
  const currentAdmin = useSelector(selectCurrentAdmin);

  if (!currentAdmin) {
    return <Navigate to='/auth/admin-login' />;
  }

  return children;
};

export default AdminProtectedRoute;