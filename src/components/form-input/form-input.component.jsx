import'./form-input.styles.scss';

 const FormInput = ({ label, className = '', ...otherProps }) => {
  return (
    <div className={`group ${className}`}>
      <input className={`form-input ${className}`} {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;