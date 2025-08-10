import { screen } from '@testing-library/react';

import Category from '../category.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { useParams } from 'react-router-dom';
import { title } from 'process';


//Note here we want to mock the useParams hook but here we will mock it not as we did in navigation tests 
//bcz in the navigation we spy on the use dispatch but we are not trying to observe the behavior of the fn 
//but here we will mock the library it self
//we pass it  fn that of what we want to replace it which is an obj
jest.mock('react-router-dom',()=>({
    //we want to keep everuthing so we we spread the obj
    //this requireActual gets the react-router dom module
    //Note this object we return from this callback is going to replace the library we want to mock
    ...jest.requireActual('react-router-dom'),
    //the only thing we want to modify is useParams
    useParams:() =>({
        category:'mens'
    }),


})

);

describe('Category tests',() =>{
    test('It should render a spinner if isLoading is true',() =>{
        renderWithProviders(<Category/>,{
            preloadedState:{
                categories:{
                    isLoding:true,
                    categories:[]
                },
            },
        });
        //we put data-test-id in the spinner to see if it is present

        const spinnerElement=screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();

    });
    test('It should render products in if isLoading is false and there are items present',() =>{
        renderWithProviders(<Category/>,{
            preloadedState:{
                categories:{
                    isLoding:false,
                    categories:[{
                        //Note here we put mens bcz in our useParams we used mens
                        title:'mens',
                        items:[
                            {id:1, name:'Product 1'},
                            {id:2, name:'Product 2'}
                        ],

                    }],
                },
            },
        });
        //Note here we use queryByTestId not getBytextId bcz we want to check the null value
        const spinnerElement=screen.queryByTestId('spinner');
        expect(spinnerElement).toBeNull();
        //here we are testing the name of the product that appears under the product image
        const product1Element=screen.getByText(/product 1/i);
        expect(product1Element).toBeInTheDocument();

    });
});