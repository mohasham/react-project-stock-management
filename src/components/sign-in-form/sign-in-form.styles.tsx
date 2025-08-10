import styled from 'styled-components';
//bcz we have only 1 h2 in the SignInContainer we put the h2 inside it 
//we do not have many h2 with diff styles
export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

//before using ts
// import styled from 'styled-components';
// //bcz we have only 1 h2 in the SignInContainer we put the h2 inside it 
// //we do not have many h2 with diff styles
// export const SignInContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 380px;

//   h2 {
//     margin: 10px 0;
//   }
// `;

// export const ButtonsContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;
//before using styled component 
// .sign-up-container{
//     display: flex;
//     flex-direction: column;
//     width: 380px;

//     h2{
//         //this means that margin top and buttom to 10 px and left, right 0
//         margin: 10px 0;
//     }

//     .buttons-container{
//         display: flex;
//         justify-content: space-between;
//     }
// }