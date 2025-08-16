//react will import this shop-data.json' & store it inside SHOP_DATA if we press ctrl click on SHOP_DATA 
//it will show us shop-data.json'
// import SHOP_DATA from '../../shop-data.json';

//we no lonnger need to import useContext instead we need useSelector
import {  useContext, Fragment} from 'react';

//we use selector instead of categories.context
//Note if we want to use data from redux inside a component we have to use selectors
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
//improting the context
//he deleted this  import bcz we used redux
//import { CategoriesContext } from '../../contexts/categories.context';
//we replaced this with CategoryPreview 
// import ProductCard from '../../components/product-card/product-card.component';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
//he deleted this file

// import './categories-preview.styles.scss';

const CategoriesPreview = () => {

    const categoriesMap=useSelector(selectCategoriesMap);
    const isLoading=useSelector(selectCategoriesIsLoading);
    //give me the products passing in the products context
    //he deleted this  bcz we used redux we no longer using useContext
    //const { categoriesMap } = useContext(CategoriesContext);
    return (
        //this products are got from firestore
        //Note <></> means a framgment without need to write a fragment tag & import it
        //but for consistancy he wrote Fragment
        <Fragment>
            {isLoading? <Spinner/> : (
            
                //this will return us the keys of an obj as an array
                //in categories collection every title/doc is a key for an array value that contains the products
                Object.keys(categoriesMap).map((title) => {
                        const products=categoriesMap[title];
                        //every title is an array of vals here we are passing each the title & the products of 
                        //each title to CategoryPreview
                        //Note we made this preview bcz we do not want to display all products under each title 
                        //in the shp page we only want 4 products under each title
                        //if the user clciks on a title then he should see all products
                        return (
                        <CategoryPreview key={title} title={title} products={products}/>
                    );
                    
                }
                )
            )}
        </Fragment>
    );
};

export default CategoriesPreview;
//before using ts 
//react will import this shop-data.json' & store it inside SHOP_DATA if we press ctrl click on SHOP_DATA 
//it will show us shop-data.json'
// import SHOP_DATA from '../../shop-data.json';

//we no lonnger need to import useContext instead we need useSelector
// import {  useContext, Fragment} from 'react';

// //we use selector instead of categories.context
// //Note if we want to use data from redux inside a component we have to use selectors
// import { useSelector } from 'react-redux';
// import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
// //improting the context
// //he deleted this  import bcz we used redux
// //import { CategoriesContext } from '../../contexts/categories.context';
// //we replaced this with CategoryPreview 
// // import ProductCard from '../../components/product-card/product-card.component';

// import CategoryPreview from '../../components/category-preview/category-preview.component';
// import Spinner from '../../components/spinner/spinner.component';
// //he deleted this file

// // import './categories-preview.styles.scss';

// const CategoriesPreview = () => {

//     const categoriesMap=useSelector(selectCategoriesMap);
//     const isLoading=useSelector(selectCategoriesIsLoading);
//     //give me the products passing in the products context
//     //he deleted this  bcz we used redux we no longer using useContext
//     //const { categoriesMap } = useContext(CategoriesContext);
//     return (
//         //this products are got from firestore
//         //Note <></> means a framgment without need to write a fragment tag & import it
//         //but for consistancy he wrote Fragment
//         <Fragment>
//             {isLoading? <Spinner/> : (
            
//                 //this will return us the keys of an obj as an array
//                 //in categories collection every title/doc is a key for an array value that contains the products
//                 Object.keys(categoriesMap).map((title) => {
//                         const products=categoriesMap[title];
//                         //every title is an array of vals here we are passing each the title & the products of 
//                         //each title to CategoryPreview
//                         //Note we made this preview bcz we do not want to display all products under each title 
//                         //in the shp page we only want 4 products under each title
//                         //if the user clciks on a title then he should see all products
//                         return (
//                         <CategoryPreview key={title} title={title} products={products}/>
//                     );
                    
//                 }
//                 )
//             )}
//         </Fragment>
//     );
// };

// export default CategoriesPreview;