//react will import this shop-data.json' & store it inside SHOP_DATA if we press ctrl click on SHOP_DATA 
//it will show us shop-data.json'
// import SHOP_DATA from '../../shop-data.json';
//he said we do not need this imoprt any more 
// import { useContext} from "react";
// //improting the context
// import { CategoriesContext } from "../../context/categories.context";
// //we replaced this with CategoryPreview 
// // import ProductCard from '../../components/product-card/product-card.component';

// import CategoryPreview from "../../components/category-preview/category-preview.component";

//Note we imoprt Route & Routes bcz we can't use a Route Component without it's iemmediate parent Routes

import { useEffect } from 'react';

import { Routes,Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';

import Category from '../category/category.component';

//import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStart } from '../../store/categories/category.reducer';
//this import was used with saga
//import { fetchCategoriesAsync, fetchCategoriesStart } from '../../store/categories/category.action';
//this import was needed before using redu thunk
// import{setCategories} from'../../store/categories/category.action';
//import { CategoriesProvider } from '../../context/categories.context';
//he removed this file
//import './shop.styles.scss';
// -----Note--------
//the valyues of </CategoriesProvider> is only accessable only for the two routes inside it
//if we try to aceess this </CategoriesProvider> from another place example cart component
//we only see the initial value of </CategoriesProvider> which is null but any other rerender vals 
//update will not be accessed
//with the above steps we are managing the access
//but in the course we keep everything as did before
const Shop = () => {
    //we need dispatch to send action to the reducer fn
    const dispatch=useDispatch();
    //both CategoriesPreview & Category needs the categoryMap so we moved this useEffect from categoriesMap
    //we want to work with the context of redux instead of cartegories context of API
    useEffect(()=>{
        dispatch(fetchCategoriesStart());
        //Note when we use an asyn fn in a useEffect we do not pass async word to it as para 
        //we need to make the asyn fn inside it
        //the we call the method inside the asyn fn we have created
        //after using thunk this fn is not async anymore
    //    const getCategoriesMap=async()=>{
    //   //  --------------------------------------NOTE------------------------------------
    //     // through thunk the shop component do not have to balance any async wahy
    //     // all of that is know driven by an event only we dispatch an event 
    //     // whether succesed or failed is not govern by the component any more
    //     // all of this is done through the thunk
    //     // the component know is only responsible for fetching data & choose data
    //     // Note we use thunk in the large projects when we have alot of async behaviors happen
    //     // in app
    //     //-----------------------------------------------------------------------------
    //         // this const categoryMap was a map before we semplify getCategoriesAndDocuments to return an array
    //         // instead of returning a map
    //         // we used this when we using saga
    //         // dispatch(fetchCategoriesStart());  //we used this when we using saga
    //         // this was used when we used thunk
    //        //dispatch(fetchCategoriesAsync());
    //        // const categoryMap=await getCategoriesAndDocuments('categories');
    //        //-----------------------------------------------------------------------------
    //        const categoriesArray=await getCategoriesAndDocuments('categories');
    //        // console.log(categoryMap);
    //       // console.log(categoriesArray);
    //         //setting the values we get to our categorymap
    //         //before using redux-thunk
    //         dispatch(setCategories(categoriesArray));
    //     };
    //     // //here we are calling the fn we have created 
    //     // //Note when the 2nd par of useEffect is empty that means we we want this to run one time only when the provider mounts
    //      getCategoriesMap();
    },[]);
    return(
        //  <CategoriesProvider>
            <Routes>
                {/* Note this Categories preview contains all the titles & 4 products under each title
                if the user clicks a specific title then he should see all products */}
                <Route index element={ <CategoriesPreview/>}/>
                {/* this Category component is used to show the full list of categories for each title */}
                {/* here we are passing the category as a paramter in the route  syntax is : followed by name of var*/}
                <Route path=':category' element={ <Category/>}/>
            </Routes>
        //  </CategoriesProvider> 
    );
};

export default Shop;

//this code was in the shop component before
 // //NOTE in routes folder we made a folder called categories-preview similar to this shop component
    // //give me the products passing in the products context
    // const { categoriesMap } = useContext(CategoriesContext);
    // return (
    //     //this products are got from firestore
    //     <div className='shop-container'>
    //         {
    //             //this will return us the keys of an obj as an array
    //             //in categories collection every title/doc is a key for an array value that contains the products
    //             Object.keys(categoriesMap).map((title) => {
    //                 const products=categoriesMap[title];
    //                 //every title is an array of vals here we are passing each the title & the products of 
    //                 //each title to CategoryPreview
    //                 //Note we made this preview bcz we do not want to display all products under each title 
    //                 //in the shp page we only want 4 products under each title
    //                 //if the user clciks on a title then he should see all products
    //                 return (
    //                 <CategoryPreview key={title} title={title} products={products}/>
    //             );
                 
    //         })}
    //     </div>
    // );
//before using ts
// //react will import this shop-data.json' & store it inside SHOP_DATA if we press ctrl click on SHOP_DATA 
// //it will show us shop-data.json'
// // import SHOP_DATA from '../../shop-data.json';
// //he said we do not need this imoprt any more 
// // import { useContext} from "react";
// // //improting the context
// // import { CategoriesContext } from "../../context/categories.context";
// // //we replaced this with CategoryPreview 
// // // import ProductCard from '../../components/product-card/product-card.component';

// // import CategoryPreview from "../../components/category-preview/category-preview.component";

// //Note we imoprt Route & Routes bcz we can't use a Route Component without it's iemmediate parent Routes

// import { useEffect } from 'react';

// import { Routes,Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import CategoriesPreview from '../categories-preview/categories-preview.component';

// import Category from '../category/category.component';

// //import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
// import { fetchCategoriesStart } from '../../store/categories/category.action';
// //this import was used with saga
// //import { fetchCategoriesAsync, fetchCategoriesStart } from '../../store/categories/category.action';
// //this import was needed before using redu thunk
// // import{setCategories} from'../../store/categories/category.action';
// //import { CategoriesProvider } from '../../context/categories.context';
// //he removed this file
// //import './shop.styles.scss';
// // -----Note--------
// //the valyues of </CategoriesProvider> is only accessable only for the two routes inside it
// //if we try to aceess this </CategoriesProvider> from another place example cart component
// //we only see the initial value of </CategoriesProvider> which is null but any other rerender vals 
// //update will not be accessed
// //with the above steps we are managing the access
// //but in the course we keep everything as did before
// const Shop = () => {
//     //we need dispatch to send action to the reducer fn
//     const dispatch=useDispatch();
//     //both CategoriesPreview & Category needs the categoryMap so we moved this useEffect from categoriesMap
//     //we want to work with the context of redux instead of cartegories context of API
//     useEffect(()=>{
//         dispatch(fetchCategoriesStart());
//         //Note when we use an asyn fn in a useEffect we do not pass async word to it as para 
//         //we need to make the asyn fn inside it
//         //the we call the method inside the asyn fn we have created
//         //after using thunk this fn is not async anymore
//     //    const getCategoriesMap=async()=>{
//     //   //  --------------------------------------NOTE------------------------------------
//     //     // through thunk the shop component do not have to balance any async wahy
//     //     // all of that is know driven by an event only we dispatch an event 
//     //     // whether succesed or failed is not govern by the component any more
//     //     // all of this is done through the thunk
//     //     // the component know is only responsible for fetching data & choose data
//     //     // Note we use thunk in the large projects when we have alot of async behaviors happen
//     //     // in app
//     //     //-----------------------------------------------------------------------------
//     //         // this const categoryMap was a map before we semplify getCategoriesAndDocuments to return an array
//     //         // instead of returning a map
//     //         // we used this when we using saga
//     //         // dispatch(fetchCategoriesStart());  //we used this when we using saga
//     //         // this was used when we used thunk
//     //        //dispatch(fetchCategoriesAsync());
//     //        // const categoryMap=await getCategoriesAndDocuments('categories');
//     //        //-----------------------------------------------------------------------------
//     //        const categoriesArray=await getCategoriesAndDocuments('categories');
//     //        // console.log(categoryMap);
//     //       // console.log(categoriesArray);
//     //         //setting the values we get to our categorymap
//     //         //before using redux-thunk
//     //         dispatch(setCategories(categoriesArray));
//     //     };
//     //     // //here we are calling the fn we have created 
//     //     // //Note when the 2nd par of useEffect is empty that means we we want this to run one time only when the provider mounts
//     //      getCategoriesMap();
//     },[]);
//     return(
//         //  <CategoriesProvider>
//             <Routes>
//                 {/* Note this Categories preview contains all the titles & 4 products under each title
//                 if the user clicks a specific title then he should see all products */}
//                 <Route index element={ <CategoriesPreview/>}/>
//                 {/* this Category component is used to show the full list of categories for each title */}
//                 {/* here we are passing the category as a paramter in the route  syntax is : followed by name of var*/}
//                 <Route path=':category' element={ <Category/>}/>
//             </Routes>
//         //  </CategoriesProvider> 
//     );
// };

// export default Shop;