import { useState,useContext,FormEvent,ChangeEvent} from 'react';

import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import { googleSignInStart,emailSignInStart } from '../../store/user/user.action';
// we do not need this import bcz we used onAuthStateChanged it will automatically use usercontext

// import { UserContext } from "../../context/user.context";


// import {signInWithGooglePopup,
//     createUserDocumentFromAuth,
//     signInAuthUserWithEmailAndPassword

// } from '../../utils/firebase/firebase.utils';
import  './sign-in-form.styles.scss';
//we imported this BUTTON_TYPE_CLASSES bcz it's a json obj outside the button Component 
//we need it to pass the buttonType
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component';
//initilize the state of the form and this used to take the values of the form
const defaultformFields={
    email:'',
    password:'',
}



export const SignInForm=()=>{
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultformFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultformFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
    return(//bcz there is form input which is used in sign up we think Generalizing the input as a component
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput
                    label='Password' 
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    {/* Note the button is by default of type submit in the form so if we hit signin
                    with google the alert no user asociated with this email to solve this
                    we should add type button */}
                    <Button 
                      type='button'
                     buttonType={BUTTON_TYPE_CLASSES.google} 
                     onClick={signInWithGoogle}
                     >
                        Google sign in
                    </Button>
                </ButtonsContainer>
                
            </form>
        </SignInContainer>
    );
};

export default SignInForm;

//before using ts import { useState,useContext } from 'react';

// import { useDispatch } from 'react-redux';

// import FormInput from '../form-input/form-input.component';

// import { googleSignInStart,emailSignInStart } from '../../store/user/user.action';
// // we do not need this import bcz we used onAuthStateChanged it will automatically use usercontext

// // import { UserContext } from "../../context/user.context";


// import {signInWithGooglePopup,
//     createUserDocumentFromAuth,
//     signInAuthUserWithEmailAndPassword

// } from '../../utils/firebase/firebase.utils';
// import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
// //we imported this BUTTON_TYPE_CLASSES bcz it's a json obj outside the button Component 
// //we need it to pass the buttonType
// import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component';
// //initilize the state of the form and this used to take the values of the form
// const defaultformFields={
//     email:'',
//     password:'',
// }

// const SignInForm=()=>{
//     const dispatch=useDispatch();
//     //this defaultformFields is passed to useState as initial state formFields is some kind of object
//     const[formFields,setFormFields]=useState(defaultformFields);
//     //set them as contants if we need them instead of everytime write this.
//     const{email,password}=formFields;
//    // console.log(formFields);
// // we do not need setCurrentUser bcz we used onAuthStateChanged 
//     //const{setCurrentUser}=useContext(UserContext);
//     const resetFormFields=()=>{
//         //this defaultformFields are the empty states after signing up to clr the fields
//         setFormFields(defaultformFields);
//     };
// //this method is used to sign in with google 
// const signInWithGoogle=async()=>{
//     //this open sign in with google
//     // we commented this & bcz we moved it to usercontext
//     //const {user}=await signInWithGooglePopup();
//     //Note to trigger signInWithGooglePopup in users saga we need to dispatch the action here
//     await signInWithGooglePopup();
//     //so instead of signInWithGooglePopup manually we use disptach 
//     //& we need to  import action creator
//     //this was used with saga & redux thunk
//     //dispatch(googleSignInStart());


//     //when the user login with google he provides us with _tokenResponse which we need for CRUD operations
//     //here we remove var userDoc ref bcz we have taken it before
//     //const userDocRef=await createUserDocumentFromAuth(user);
//     //we are creating userDocAuth


//    // await createUserDocumentFromAuth(user);
// }
//     const logGoogleUser=async()=>{
//         //this open sign in with google
//         const {user}=await signInWithGooglePopup();
//         //set the usercontext for the user that logs in with google account
//         //setCurrentUser(user);
//         //when the user login with google he provides us with _tokenResponse which we need for CRUD operations
//         const userDocRef=await createUserDocumentFromAuth(user);

//     }
//     const handleSubmit=async(event)=>{
//         //Note password and email are filled from handleChange function and set into formFields
//         event.preventDefault();

//         try{
//              //-------------------------------------------------------------------------------------
//              await signInAuthUserWithEmailAndPassword(
//                 email,
//                 password
//             );
//             //know we are dispatching to trigger emailSignInStart
//             //this was before using saga
//             // const {user}=await signInAuthUserWithEmailAndPassword(
//             //     email,
//             //     password
//             // );
//             //when the user ssigns in we want to take the user obj & store it inside context 
//             //to do this we need 2 thing first we need to import UseContext Hook then we need to import the 
//             //Conetxt obj it self that we created in utils this context object 
//             //this context obj is going to give us back the obj value passed to the provider
//             //Note the CurrentUser is imported from ../../context/user.context
//             //so the use state & it's set is defined in there
//             //setCurrentUser(user);
//             //-------------------------------------------------------------------------------------
//             //this was used with redux saga
//             //dispatch(emailSignInStart(email,password))
//             resetFormFields();
//         }catch(error){
//             //Note this code appears in his he has auth/wrong password code but 
//             //I have another error auth/invalid-login-credentials I think it is due to firebase update
//             //also 'auth/invalid-login-credentials' is for email & pass due to anu update to firebase I think
//             switch(error.code){
//                 case 'auth/invalid-login-credentials':
//                    alert('incorrect password for email');
//                     break;
//                     case 'auth/user-not-found':
//                       alert('no user associated with this email');
//                       break;
//                     default:
//                         console.log(error)

//             }
            
//         }
//     };
// //this function is used to trigger changes on inputs
// //it is a genaric function
//     const handleChange=(event)=>{
//         //to know the change occure to which input we give it a name in the form
//         //we are taking name and value from the event
//         const {name,value}=event.target;
//         //since this function is called on change for every input 
//         //this ... means spread the fields of formFields
//         //modifying one value of this object
//         //we use this bcz all formFields are essentailly deplucated versions of the same state
//         setFormFields({...formFields,[name]:value});

//         //----------------NOTE FOR Button -----------------------
//         //we genrilized the button component bcz  in the code we have many 
//         //he said  3 buttons that share some common style so we should generalize the component

//     };
//     return(//bcz there is form input which is used in sign up we think Generalizing the input as a component
//         <SignInContainer>
//             <h2>Already have an account?</h2>
//             <span>Sign in with your email and password</span>
//             <form onSubmit={handleSubmit}>
//                 <FormInput
//                     label='Email'
//                     type='email' 
//                     required 
//                     onChange={handleChange} 
//                     name="email" 
//                     value={email}
//                 />

//                 <FormInput
//                     label='Password' 
//                     type='password'
//                     required
//                     onChange={handleChange}
//                     name='password'
//                     value={password}
//                 />
//                 <ButtonsContainer>
//                     <Button type='submit'>Sign In</Button>
//                     {/* Note the button is by default of type submit in the form so if we hit signin
//                     with google the alert no user asociated with this email to solve this
//                     we should add type button */}
//                     <Button 
//                       type='button'
//                      buttonType={BUTTON_TYPE_CLASSES.google} 
//                      onClick={signInWithGoogle}
//                      >
//                         Google sign in
//                     </Button>
//                 </ButtonsContainer>
                
//             </form>
//         </SignInContainer>
//     );
// };
// export default SignInForm;

// // before using styled components

// //     return(//bcz there is form input which is used in sign up we think Generalizing the input as a component
// //         <div className='sign-up-container'>
// //             <h2>Already have an account?</h2>
// //             <span>Sign in with your email and password</span>
// //             <form onSubmit={handleSubmit}>
// //                 <FormInput
// //                     label='Email'
// //                     type='email' 
// //                     required 
// //                     onChange={handleChange} 
// //                     name="email" 
// //                     value={email}
// //                 />

// //                 <FormInput
// //                     label='Password' 
// //                     type='password'
// //                     required
// //                     onChange={handleChange}
// //                     name='password'
// //                     value={password}
// //                 />
// //                 <div className='buttons-container'>
// //                     <Button type='submit'>Sign In</Button>
// //                     {/* Note the button is by default of type submit in the form so if we hit signin
// //                     with google the alert no user asociated with this email to solve this
// //                     we should add type button */}
// //                     <Button 
// //                       type='button'
// //                      buttonType={BUTTON_TYPE_CLASSES.google} 
// //                      onClick={signInWithGoogle}
// //                      >
// //                         Google sign in
// //                     </Button>
// //                 </div>
                
// //             </form>
// //         </div>
// //     );
// // };
// // export default SignInForm;

// before using styled components

//     return(//bcz there is form input which is used in sign up we think Generalizing the input as a component
//         <div className='sign-up-container'>
//             <h2>Already have an account?</h2>
//             <span>Sign in with your email and password</span>
//             <form onSubmit={handleSubmit}>
//                 <FormInput
//                     label='Email'
//                     type='email' 
//                     required 
//                     onChange={handleChange} 
//                     name="email" 
//                     value={email}
//                 />

//                 <FormInput
//                     label='Password' 
//                     type='password'
//                     required
//                     onChange={handleChange}
//                     name='password'
//                     value={password}
//                 />
//                 <div className='buttons-container'>
//                     <Button type='submit'>Sign In</Button>
//                     {/* Note the button is by default of type submit in the form so if we hit signin
//                     with google the alert no user asociated with this email to solve this
//                     we should add type button */}
//                     <Button 
//                       type='button'
//                      buttonType={BUTTON_TYPE_CLASSES.google} 
//                      onClick={signInWithGoogle}
//                      >
//                         Google sign in
//                     </Button>
//                 </div>
                
//             </form>
//         </div>
//     );
// };
// export default SignInForm;