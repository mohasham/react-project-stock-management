import "./category-preview.styles.scss";
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';


export const CategoryPreview=({title,products})=>{
 return(
        <div className='category-preview-container'>
            <h2>
                {/* we have a span inside h2 bcz this will become a clickable a nav-link we want it to be 
                clickable on the text not the h2 remeber also the title is small letter in db so we converttoupper
                here title is a route remember we make a route shop/category we made this bcz we want when click the title 
                see all the items of certain catgeory 
                this to={title} will add the title of selected category to be as shop/title and reach the
                route we have made*/}
                <Link className='title' to ={title}>
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className='preview'>
                {    //this dev should contain all the proudcts
                    //the parm _ means I want to ignore it I do not want to use it the 2nd par is the index
                    //idx is the idx of array
                    //keep the idx if it is lesss than 4 bcz we do not to display all the product of the title
                    //we want only want 4 products remeber index starts from 0
                    products.filter((_,idx)=>idx<4)
                    //passing each product to ProductCard Component
                    .map((product)=>
                    <ProductCard key={product.id || product._id} product={product}/>)
                }
            </div>
        </div>
    );
}

export default CategoryPreview;
