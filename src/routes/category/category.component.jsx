import react from 'react';
import { useContext, useState, useEffect, Fragment } from 'react';
//we use selector instead of categories.context
//Note if we want to use data from redux inside a component we have to use selectors
import { useSelector } from 'react-redux';
//we need this import to access the parameter & get it's value that is passed to the route URL
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
//we need to import this to use it in useSelector as a paramter
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import './category.styles.scss';

//he removed this import bcz we want to use redux
//import { CategoriesContext } from '../../contexts/categories.context';

const Category = () => {
    //this Category component is used to show the full list of categories for each title
    //params give us an object of parameters but bcz we know there is one catgory 
    //we are going to destructure
    const { category } = useParams();

    //getting categoriesMap from CategoriesContext
    //const {categoriesMap}=useContext(CategoriesContext);

    //we used this redux instead of useContext
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    //this was const [products,setProducts]=useState([]); 
    //but we changed it bcz the first time the categoriesMap render it is empty initially 
    //so it will give us an error when mapping on empty obj
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            {/* we added this h2 to show the title of the selected category 
            we did not put the h2 in the div category-container and added a fragment bcz this div is a grid */}

            <h2 className='category__title'>
                {category.toLocaleUpperCase()}
            </h2>

            <div className='category__container'>
                {
                    products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </Fragment>
    );
};

export default Category;