import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '..';
import Store from '../../../store';

let initialStoreValue  = {
    cartDetails: []
}

describe('Navbar Component', () => {
    const component = 
    (<Store initialState={initialStoreValue}>
    <BrowserRouter>
    <Navbar />
    </BrowserRouter>
    </Store>)
    
    it('should render cart component',()=> {
        render(component);
    });

    it('should click login', () => {
        const { getByTestId } = render(component);
        fireEvent.click(getByTestId('login'));
        expect(jest.fn()).toBeCalled;
    });

     it('should click signup', () => {
        const { getByTestId } = render(component);
        fireEvent.click(getByTestId('register'));
        expect(jest.fn()).toBeCalled;
    });

    it('should click cart details', () => {
        const { getByTestId } = render(component);
        fireEvent.click(getByTestId('cart-icon'));
        expect(jest.fn()).toBeCalled;
    });
    
});
