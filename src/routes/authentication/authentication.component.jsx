import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles';
// import { useEffect } from "react";//we need this with redirect 
// import { getRedirectResult } from "firebase/auth"; //we need this with redirect also we need to import auth 
// //because it is what this method will get
// import { auth,signInWithGooglePopup,
//     createUserDocumentFromAuth,
//     signInWithGoogleRedirect,
//  } from "../../utils/firebase/firebase.utils";


/*This component was named sign in not authentication */
const Authentication=()=>{
    //we use useEffect bcz we want to run this when the app mount
    //useEffect(()=>{},[]);
    //when we pass an empty array it means run this function once 
    //when the SignIn component mounts for the first time
    //this the method used in code not working for me
    // useEffect(async()=>{
    //     //Note bcz getRedirectResult(auth); is async we have to use async & response
    //  const response=await getRedirectResult(auth);
    //  console.log(response);
    //  //---------NOTE What will happen--
    //  //when we sign in and redirect Sign In will remount so this use Effect will run the callback once 
    //  //so it will say get the respobse for the redirect that just happend based on auth
    //  //auth is Sibgwlton it is a auth bank authentication memory for website & for firebase instance
    // },[]);

    //get from chat gpt
    // useEffect(() => {
    //     const handleRedirectResult = async () => {
    //         try {
    //             const response = await getRedirectResult(auth);
    //             if(response)
    //             {//if resonse is not null create user ref
    //                 const userDocRef=await createUserDocumentFromAuth(response.user);
    //             }
    //             // Handle response or redirect logic here
    //         } catch (error) {
    //             // Handle errors if any
    //             console.error(error);
    //         }
    //     };
    
    //     handleRedirectResult(); // Call the async function
    // }, []);
    
    //here we are making a fumction to signin with google after we set up provider of firebase
    // const logGoogleUser=async()=>{
    //     //this open sign in with google
    //     const {user}=await signInWithGooglePopup();
    //     //when the user login with google he provides us with _tokenResponse which we need for CRUD operations
    //     const userDocRef=await createUserDocumentFromAuth(user);

    // }
    //we commented this because it is doing nothing and we want to use what we imported directly
    // const logGoogleRedirectUser=async()=>{
    //     //this open sign in with google
    //     const {user}=await signInWithGoogleRedirect();
        //Note the diff btw signInWithGooglePopup & is that other than redirect signInWithGoogleRedirect works same as prop
        //but it opens in a seperate page
        //Note without using useEffetct & getRedirect result when we redirect to our page we will not see any console.log
        //because we will start our entire app from start from scratch discarding the old state
        //console.log(user);
        //when the user login with google he provides us with _tokenResponse which we need for CRUD operations
        

       return(
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        </div>
    );
}



export default Authentication;
//before adding styled component
// import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
// import SignInForm from '../../components/sign-in-form/sign-in-form.component';

    
//     return(
//         <div className='authentication-container'>
//             <SignInForm/>
//             <SignUpForm/>
//             {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
//         </div>
//     );
// }



//export default Authentication;