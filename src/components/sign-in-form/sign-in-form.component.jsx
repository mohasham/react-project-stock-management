import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './sign-in-form.styles.scss';
import { emailSignInStart } from '../../store/user/user.reducer';
import { selectUserError } from '../../store/user/user.selector';

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false); // ✅ track submit attempt
  const { email, password } = formFields;
  const serverError = useSelector(selectUserError);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setErrors({});
    setSubmitAttempted(false); // ✅ reset on form clear
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
    setSubmitAttempted(true); // ✅ mark that user tried to sign in

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(emailSignInStart({ email, password }));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
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
      <h2 className='sign-in-form__title'>Already have an account?</h2>
      <span className='sign-in-form__subtitle'>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <div className='sign-in-form__field'>
          <FormInput
            label='Email'
            type='email'
            onChange={handleChange}
            name='email'
            value={email}
          />
          {errors.email && (
            <p className='sign-in-form__error'>{errors.email}</p>
          )}
        </div>

        <div className='sign-in-form__field'>
          <FormInput
            label='Password'
            type='password'
            onChange={handleChange}
            name='password'
            value={password}
          />
          {errors.password && (
            <p className='sign-in-form__error'>{errors.password}</p>
          )}
        </div>

        {/* ✅ only show server error after user tried to sign in */}
        {submitAttempted && serverError && (
          <p className='sign-in-form__server-error'>{serverError}</p>
        )}

        <div className='sign-in-form__buttons'>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;