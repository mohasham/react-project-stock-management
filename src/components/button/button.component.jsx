import react from 'react';
import './button.styles.scss';
export const BUTTON_TYPE_CLASSES={
     base:'base',
    google:'google-sign-in',
    inverted:'inverted'

}
//we are passing button type as sec pa  it is just a parameter it is not necessary to be same 
//name as var BUTTON_TYPE_CLASSES here
//this otherProps are other details like we use in input for type and value 

export const Button=({children,buttonType,...otherProps})=>{//Note every word in the component name should start with capital
    return(//make sure to have a space before  ${BUTTON_TYPE_CLASSES[buttonType] writing in cocatenation below
        <button className= {`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}//here otherProps something like onClick or disabled ... and Children is the text inside button
        >
            {children}
        </button>
    )
};

export default Button;
//before using ts 
// //importing the styled button component to use it 
// import {BaseButton,GoogleSignInButton,InvertedButton,ButtonSpinner}from './button.styles';
// /* 
// types of buttons that we have:

// default

// inverted

// google sign in
// */
// //this is obj to know the button type to apply the css of the button

// export const BUTTON_TYPE_CLASSES={
//     base:'base',
//     google:'google-sign-in',
//     inverted:'inverted'

// }



// //Note we use the new method of custom button 
// //we are directly using BUTTON_TYPE_CLASSES. which helps us from mistype error pf people writing code when passing a string to the button type
// //creating a new fn 
// //here if the buttonType is the default value if the buttonType is not 
// const getButton=(buttonType=BUTTON_TYPE_CLASSES.base)=>(
//     //we are returning back from a special map obj
//     {//this means if we get the base we want to return the base button
//         [BUTTON_TYPE_CLASSES.base]:BaseButton,
//         [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
//         [BUTTON_TYPE_CLASSES.inverted]:InvertedButton,
//     }[buttonType]
// )

// //we are passing button type as sec pa  it is just a parameter it is not necessary to be same 
// //name as var BUTTON_TYPE_CLASSES here
// //this otherProps are other details like we use in input for type and value 
// //we added isLoading prop that we can conditionally pass it
// //we used this isLoading to disable the pay Now button
// //Note if we want to disable the button for other condition otherProps will override this isLoading

// const Button=({children,buttonType, isLoading, ...otherProps})=>{//Note every word in the component name should start with capital
//     const CustomButton=getButton(buttonType);
//     return(//make sure to have a space before  ${BUTTON_TYPE_CLASSES[buttonType] writing in cocatenation below
//            //here otherProps something like onClick or disabled ... and Children is the text inside button
//       <CustomButton disabled={isLoading} {...otherProps} >
//         {/* here if isLoading is true we want to show the ButtpnSpinner else we want to show the 
//         text inside the button if isLoading is not passed it is going to be undifned which is false */}
//         {isLoading ?<ButtonSpinner/> :children} 
//       </CustomButton>
//     )
// };

// export default Button;

// //before adding styled component
// //importing the styled button component to use it 
// import BaseButton,GoogleSignInButton,InvertedButton from './button.styles.scss';
// /* 
// types of buttons that we have:

// default

// inverted

// google sign in
// */
// //this is obj to know the button type to apply the css of the button

// const BUTTON_TYPE_CLASSES={
//     google:'google-sign-in',
//     inverted:'inverted'

// }
// //we are passing button type as sec pa  it is just a parameter it is not necessary to be same 
// //name as var BUTTON_TYPE_CLASSES here
// //this otherProps are other details like we use in input for type and value 

// const Button=({children,buttonType,...otherProps})=>{//Note every word in the component name should start with capital
//     return(//make sure to have a space before  ${BUTTON_TYPE_CLASSES[buttonType] writing in cocatenation below
//         <button className= {`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
//         {...otherProps}//here otherProps something like onClick or disabled ... and Children is the text inside button
//         >
//             {children}
//         </button>
//     )
// };

// export default Button;