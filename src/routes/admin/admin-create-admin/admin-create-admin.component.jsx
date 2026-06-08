import { useState } from 'react';
import './admin-create-admin.styles.scss';

const AdminCreateAdmin = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getToken = () => localStorage.getItem('adminToken');

  // ===============================
  // Validate Form
  // ===============================
  const validate = () => {
    if (!formData.displayName.trim()) {
      return 'Display name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Email is not valid';
    }
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  // ===============================
  // Handle Form Submit
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    // ✅ validate before submitting
    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          displayName: formData.displayName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // ✅ reset form on success
      setSuccess(true);
      setFormData({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin',
      });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // ✅ clear error when user starts typing
    if (formError) setFormError(null);
    if (success) setSuccess(false);
  };

  return (
    <div className='admin-create-admin'>
      <div className='admin-create-admin__header'>
        <h1 className='admin-create-admin__title'>Create Admin</h1>
        <p className='admin-create-admin__subtitle'>
          Create a new admin account
        </p>
      </div>

      <div className='admin-create-admin__form-wrapper'>
        <form onSubmit={handleSubmit} className='admin-create-admin__form'>

          {/* Display Name */}
          <div className='admin-create-admin__field'>
            <label>Display Name</label>
            <input
              type='text'
              name='displayName'
              value={formData.displayName}
              onChange={handleChange}
              placeholder='Admin display name'
            />
          </div>

          {/* Email */}
          <div className='admin-create-admin__field'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Admin email'
            />
          </div>

          {/* Password */}
          <div className='admin-create-admin__field'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Min 6 characters'
            />
          </div>

          {/* Confirm Password */}
          <div className='admin-create-admin__field'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm password'
            />
          </div>

          {/* Role */}
          <div className='admin-create-admin__field'>
            <label>Role</label>
            <select
              name='role'
              value={formData.role}
              onChange={handleChange}
            >
              <option value='admin'>Admin</option>
              <option value='superadmin'>Super Admin</option>
            </select>
          </div>

          {/* ✅ show error */}
          {formError && (
            <p className='admin-create-admin__error'>{formError}</p>
          )}

          {/* ✅ show success */}
          {success && (
            <p className='admin-create-admin__success'>
              ✅ Admin account created successfully!
            </p>
          )}

          <button
            type='submit'
            className='admin-create-admin__btn'
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateAdmin;