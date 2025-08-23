
import DirectoryItem from "../directory-item/directory-item.component";
import './directory.styles.scss';

    const categories=[
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
      //we need this route when the user clicks on SHOP NOW
      "route":"shop/hats"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
      "route":"shop/jackets"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
      "route":"shop/sneakers"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
      "route":"shop/womens"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
      "route":"shop/mens"
    }
  ];
const Directory=()=>{
    return (//the first main div contains all categories we want to display
    //Here the className was categories-container
    <div className='directory-container'>
      {/* //display all categories array elements */}
      {categories.map((category)=>(
        <DirectoryItem key={category.id} category={category}/>
   

      ))}
      
    </div>
  );
}

export  default Directory