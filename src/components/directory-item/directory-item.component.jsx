import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({ category, isDisabled }) => {
  const { id, imageUrl, title, route, large } = category;

  const navigate = useNavigate();

  const onNavigateHandler = () => {
    if (isDisabled) return; // ✅ prevent navigation when disabled
    navigate(route);
  };

  return (
    <div
      key={id}
      className={`directory-item ${large ? 'directory-item--large' : ''} ${
        isDisabled ? 'directory-item--disabled' : ''
      }`}
      onClick={onNavigateHandler}
    >
      <div
        className='directory-item__background'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className='directory-item__body'>
        <h2 className='directory-item__title'>{title}</h2>
        {/* ✅ show different subtitle when disabled */}
        <p className='directory-item__subtitle'>
          {isDisabled ? 'Currently Unavailable' : 'Shop Now'}
        </p>
      </div>
    </div>
  );
};

export default DirectoryItem;