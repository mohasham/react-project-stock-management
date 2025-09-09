import react from 'react';
import './spinner.styles.scss';

 const Spinner = () => (
  <div className='spinner-overlay' data-testid='spinner'>
    <div className='spinner-container'></div>
  </div>
);

export default Spinner;
