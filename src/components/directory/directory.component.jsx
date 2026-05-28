import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesStart } from '../../store/categories/category.reducer';
import { selectCategories, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import DirectoryItem from '../directory-item/directory-item.component';
import './directory.styles.scss';

const Directory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  console.log('categories from DB:', categories);
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <DirectoryItem
          key={category._id}
          category={{
            ...category,
            route: `shop/${category.title.toLowerCase()}`, // ✅ generate route from title
          }}
        />
      ))}
    </div>
  );
};

export default Directory;