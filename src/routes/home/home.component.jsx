

import Directory from '../../components/directory/directory.component';
import HeroSection from '../../components/hero-section/hero-section.component';
import FeedbackSection from '../../components/feedback-section/feedback-section.component';
import { Outlet } from 'react-router-dom';


const Home=()=> {

  return(
    <div>
      
      <HeroSection/>
      <FeedbackSection/>
     <Directory/>
     <Outlet/>
    </div>
    
  );
   
};

export default Home;