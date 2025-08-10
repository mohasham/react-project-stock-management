
import'./directory-item.styles.scss';
//initialize our category item as a functional component
// do not forget to export
//here we are passing category as a prop
//we changed this from CategoryItem to directory Item bcz on directory displayed in home page 
//whe got a problem of getting styles of same className from 2 style pages
const DirectoryItem=({category})=>{
    // we need imageUrl & title
    const{id,imageUrl,title}=category;
    return(
        <div key={id} className='directory-item-container'>
        {/* // Note we can make a custom style to any element in react by using style={{}} */}
        <div className='background-image'
        style={{
          backgroundImage:`url(${imageUrl})`
        }} />
        <div className='body'>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
    );

}

export default DirectoryItem;