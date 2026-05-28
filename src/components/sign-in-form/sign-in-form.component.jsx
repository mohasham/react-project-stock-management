import { useState, useEffect } from 'react'; // ✅ add useEffect
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import GoogleIcon from '../icons/google-icon.component';
import SignInIcon from '../icons/sign-in-icon.component';
import './sign-in-form.styles.scss';
import { emailSignInStart } from '../../store/user/user.reducer';
import { adminSignInStart } from '../../store/admin/admin.reducer';
import { selectUserError } from '../../store/user/user.selector';
import { selectAdminError } from '../../store/admin/admin.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCurrentAdmin } from '../../store/admin/admin.selector';

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({ isAdmin = false }) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { email, password } = formFields;

  const serverError = useSelector(isAdmin ? selectAdminError : selectUserError);
  const currentUser = useSelector(selectCurrentUser);
  const currentAdmin = useSelector(selectCurrentAdmin);

  // ✅ reset form only after successful sign in
  useEffect(() => {
    if ((isAdmin && currentAdmin) || (!isAdmin && currentUser)) {
      resetFormFields();
    }
  }, [currentUser, currentAdmin]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setErrors({});
    setSubmitAttempted(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const signInWithGoogle = () => {
    window.location.href = 'http://localhost:5000/api/customers/auth/google';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isAdmin) {
        dispatch(adminSignInStart({ email, password }));
      } else {
        dispatch(emailSignInStart({ email, password }));
      }
      // ❌ removed resetFormFields() from here
    } catch (error) {
      console.log('sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className='sign-in-form'>
      <h2 className='sign-in-form__title'>
        {isAdmin ? 'Admin Login' : 'Already have an account?'}
      </h2>
      <span className='sign-in-form__subtitle'>
        {isAdmin ? 'Sign in to your admin account' : 'Sign in with your email and password'}
      </span>

      <form onSubmit={handleSubmit}>
        <div className='sign-in-form__field'>
          <FormInput
            label='Email'
            type='email'
            onChange={handleChange}
            name='email'
            value={email}
          />
          {errors.email && <p className='sign-in-form__error'>{errors.email}</p>}
        </div>

        <div className='sign-in-form__field'>
          <FormInput
            label='Password'
            type='password'
            onChange={handleChange}
            name='password'
            value={password}
          />
          {errors.password && <p className='sign-in-form__error'>{errors.password}</p>}
        </div>

        {submitAttempted && serverError && (
          <p className='sign-in-form__server-error'>{serverError}</p>
        )}

        <div className='sign-in-form__buttons'>
          <Button type='submit'>
            <SignInIcon /> Sign In
          </Button>

          {!isAdmin && (
            <Button
              type='button'
              buttonType={BUTTON_TYPE_CLASSES.google}
              onClick={signInWithGoogle}
            >
              <GoogleIcon /> Google Sign In
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;