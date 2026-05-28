import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import SignUpIcon from '../icons/sign-up-icon.component';
import './sign-up-form.styles.scss';
import { signUpStart } from '../../store/user/user.reducer';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errors, setErrors] = useState({});
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      dispatch(signUpStart({ displayName, email, password }));
      resetFormFields();
    } catch (error) {
      console.log("user creation encountered an error", error);
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
    <div className='sign-up-form'>
      <h2 className='sign-up-form__title'>Don't have an account?</h2>
      <span className='sign-up-form__subtitle'>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <div className='sign-up-form__field'>
          <FormInput
            label='Display Name'
            type='text'
            onChange={handleChange}
            name='displayName'
            value={displayName}
          />
          {errors.displayName && <p className='sign-up-form__error'>{errors.displayName}</p>}
        </div>

        <div className='sign-up-form__field'>
          <FormInput
            label='Email'
            type='email'
            onChange={handleChange}
            name='email'
            value={email}
          />
          {errors.email && <p className='sign-up-form__error'>{errors.email}</p>}
        </div>

        <div className='sign-up-form__field'>
          <FormInput
            label='Password'
            type='password'
            onChange={handleChange}
            name='password'
            value={password}
          />
          {errors.password && <p className='sign-up-form__error'>{errors.password}</p>}
        </div>

        <div className='sign-up-form__field'>
          <FormInput
            label='Confirm Password'
            type='password'
            onChange={handleChange}
            name='confirmPassword'
            value={confirmPassword}
          />
          {errors.confirmPassword && <p className='sign-up-form__error'>{errors.confirmPassword}</p>}
        </div>

        <div className='sign-up-form__submit'>
          <Button type='submit'>
            <SignUpIcon /> Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;