//  we do not need this import createContextuseState & useContext bcz we used onAuthStateChanged it will automatically use usercontext
import { useState,FormEvent,ChangeEvent } from 'react';
//we need this import to solve the problem of error 
// import { AuthError,AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


// import { createAuthUserWithEmailAndPassword,
//     createUserDocumentFromAuth 
// } from '../../utils/firebase/firebase.utils';
// we do not need this import bcz we used onAuthStateChanged it will automatically use usercontext
// import { UserContext } from "../../context/user.context";
import './sign-up-form.styles.scss';
//we need this action to dispatch
import { signUpStart } from '../../store/user/user.reducer';
//initilize the state of the form and this used to take the values of the form
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      // dispatch(signUpStart(email, password, displayName));
      dispatch(signUpStart({ displayName, email, password }));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
    return(//bcz there is form input which is used in sign up we think Generalizing the input as a component
    <div className='sign-up-container'>
<h2>Don't have an account?</h2>
<span>Sign up with your email and password</span>
<form onSubmit={handleSubmit}>
    <FormInput
        label='Display Name'
        type='text' 
        required 
        onChange={handleChange} 
        name='displayName' 
        value={displayName}
    />
    
    

    
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

    
    <FormInput
        label='Confirm Password'
        type='password' 
        required
        onChange={handleChange}
        name='confirmPassword'
        value={confirmPassword}
        />
    <Button type='submit'>Sign Up</Button>
</form>
</div>
    );
};
export default SignUpForm;

//nefore using ts 
// //  we do not need this import createContextuseState & useContext bcz we used onAuthStateChanged it will automatically use usercontext
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import FormInput from '../form-input/form-input.component';
// import Button from '../button/button.component';


// import { createAuthUserWithEmailAndPassword,
//     createUserDocumentFromAuth 
// } from '../../utils/firebase/firebase.utils';
// // we do not need this import bcz we used onAuthStateChanged it will automatically use usercontext
// // import { UserContext } from "../../context/user.context";
// import './sign-up-form.styles';
// import { SignUpContainer } from './sign-up-form.styles';
// //we need this action to dispatch
// import { signUpStart } from '../../store/user/user.action';
// //initilize the state of the form and this used to take the values of the form
// const defaultformFields={
//     displayName:'',
//     email:'',
//     password:'',
//     confirmPassword:''
// }

// const SignUpForm=()=>{
//     //this defaultformFields is passed to useState as initial state formFields is some kind of object
//     const[formFields,setFormFields]=useState(defaultformFields);
//     //set them as contants if we need them instead of everytime write this.
//     const{displayName,email,password,confirmPassword}=formFields;
//     const dispatch=useDispatch();
//     //storing usercontext after sign up 
//     // we do not need this this bcz we used onAuthStateChanged it will automatically use usercontext
//     // const{setCurrentUser}=useContext(UserContext);
//     console.log(formFields);
//     const resetFormFields=()=>{
//         //this defaultformFields are the empty states after signing up to clr the fields
//         setFormFields(defaultformFields);
//     }
//     const handleSubmit=async(event)=>{
//         //Note password and email are filled from handleChange function and set into formFields
//         event.preventDefault();
//         if(password!==confirmPassword) 
//         {
//             alert("passwords do not match");
//             return;
//         }

//         try{//------------NOTE----------
//             //when there is any  change sate of UserContext the code in sign up will rerender eventhogh we did not write
//             //there is any changes in the sign up form 
//             //so if there is many lines of code they will will be useless so we should think about optimization our code
//             //this was before using saga
//         //    const {user}=await createAuthUserWithEmailAndPassword(
//         //     email,
//         //     password
//         //     );

//             //setting the usercontext after signing up
//             //setCurrentUser(user);
//             ////we are passing this additionalInformation bcz when we sign up the displayName some times is taken 
//             //& some times is null

//         //    ------------------------  NOTE   --------------
//            // we still creating doc here bcz we still need the displayName bcz when we sign up it sometimes store its as null 
//            // in the doc bcz in some cases it was store it null before  we solved this problem 
//            //we can do it in the context using a listner if we want

//             ////this was before using saga
//             // await createUserDocumentFromAuth(user,{displayName})
//             //after creating the user we want to clear or reset the form
//             //--------------------------------------------------------------------------
//             //Note related to firebase when we sign up our new user may not appear in console 
//             //so we need to refresh it is a problem related to firebase
//             //------------------------------------------------------------------------------
//             dispatch(signUpStart(email,password,displayName));
//             resetFormFields();
            


//         }catch(error){
//             //this is the error msg given by firebase incase email is already used before
//             if(error.code==='auth/email-already-in-use')
//             {
//                 alert('Cannot create user, email already in use');
//             }
//             else
//             {
//                 console.log('user creation encountered an error',error);
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
//         <SignUpContainer>
//             <h2>Don't have an account?</h2>
//             <span>Sign up with your email and password</span>
//             <form onSubmit={handleSubmit}>
//                 <FormInput
//                     label='Diplay Name'
//                     type='text' 
//                     required 
//                     onChange={handleChange} 
//                     name='displayName' 
//                     value={displayName}
//                 />
                
                

                
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

                
//                 <FormInput
//                     label='Confirm Password'
//                     type='password' 
//                     required
//                     onChange={handleChange}
//                     name='confirmPassword'
//                     value={confirmPassword}
//                     />
//                 <Button type='submit'>Sign Up</Button>
//             </form>
//         </SignUpContainer>
//     );
// };
// export default SignUpForm;
// //before using styled components
// {/* <div className='sign-up-container'>
// <h2>Don't have an account?</h2>
// <span>Sign up with your email and password</span>
// <form onSubmit={handleSubmit}>
//     <FormInput
//         label='Diplay Name'
//         type='text' 
//         required 
//         onChange={handleChange} 
//         name='displayName' 
//         value={displayName}
//     />
    
    

    
//     <FormInput
//         label='Email'
//         type='email' 
//         required 
//         onChange={handleChange} 
//         name="email" 
//         value={email}
//     />

//     <FormInput
//         label='Password' 
//         type='password'
//         required
//         onChange={handleChange}
//         name='password'
//         value={password}
//     />

    
//     <FormInput
//         label='Confirm Password'
//         type='password' 
//         required
//         onChange={handleChange}
//         name='confirmPassword'
//         value={confirmPassword}
//         />
//     <Button type='submit'>Sign Up</Button>
// </form>
// </div>
// );
// };
// export default SignUpForm; */}
// //before using styled components
// {/* <div className='sign-up-container'>
// <h2>Don't have an account?</h2>
// <span>Sign up with your email and password</span>
// <form onSubmit={handleSubmit}>
//     <FormInput
//         label='Diplay Name'
//         type='text' 
//         required 
//         onChange={handleChange} 
//         name='displayName' 
//         value={displayName}
//     />
    
    

    
//     <FormInput
//         label='Email'
//         type='email' 
//         required 
//         onChange={handleChange} 
//         name="email" 
//         value={email}
//     />

//     <FormInput
//         label='Password' 
//         type='password'
//         required
//         onChange={handleChange}
//         name='password'
//         value={password}
//     />

    
//     <FormInput
//         label='Confirm Password'
//         type='password' 
//         required
//         onChange={handleChange}
//         name='confirmPassword'
//         value={confirmPassword}
//         />
//     <Button type='submit'>Sign Up</Button>
// </form>
// </div>
// );
// };
// export default SignUpForm; */}