import styled from 'styled-components';
import {
  BaseButton,
  GoogleSignInButton,InvertedButton
 } from '../button/button.styles'
//in the below code we are saying if any of these 3 buttons is nested in the CartDropdownCobtainer styled component
//we want to apply these styles margin-top:auto
//we do not want this additional syle to be applied in all buttons just yhe button inside CartDropdownCobtainer
//if we want this style to be applied on all button we can add it in the button styled component instead of this method
//Note if we want a component to have additional style inside other component we should write the 
//style of other component & inside it the additional styles we want to add
export const CartDropdownCobtainer=styled.div`
  position: absolute;
  //I increased the width from 240px to 260
  width: 260px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton}{
    margin-top:auto;
  }
`;

export const EmptyMessage=styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems=styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
// `;
// if we want to add a nested style for a compnent /add additional style for a compnent the syntax is
//in this example we are adding a nested style for the CartDropdownCobtainer here we are changing position
//Note we need to imprt the style of the component
//${CartDropdownCobtainer}{
//   position
// }


  //before using styled components
  // .cart-dropdown-container {
  //   position: absolute;
  //   //I increased the width from 240px to 260
  //   width: 260px;
  //   height: 340px;
  //   display: flex;
  //   flex-direction: column;
  //   padding: 20px;
  //   border: 1px solid black;
  //   background-color: white;
  //   top: 90px;
  //   right: 40px;
  //   z-index: 5;
  
  //   .empty-message {
  //     font-size: 18px;
  //     margin: 50px auto;
  //   }
  
  //   .cart-items {
  //     height: 240px;
  //     display: flex;
  //     flex-direction: column;
  //     overflow: scroll;
  //   }
  
  //   button {
  //     margin-top: auto;
  //   }
  // }
  