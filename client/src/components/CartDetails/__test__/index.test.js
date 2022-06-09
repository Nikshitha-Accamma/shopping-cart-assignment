import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartDetails from '..';
import Store from '../../../store';

let initialStoreValue  = {
    cartDetails: []
}

let visible = true;

describe('Cart Details Component', () => {
    const component = 
    (<Store initialState={initialStoreValue}>
    <BrowserRouter>
    <CartDetails visible={visible} setVisible={jest.fn()}/>
    </BrowserRouter>
    </Store>)
    
    it('should render cart component',()=> {
        render(component);
    });

    it('should click shop btn, should close the drawer', () => {
       const {getByLabelText, getByTestId} = render(component);
       fireEvent.click(getByTestId('start-shop-btn'));
       expect(jest.fn()).toBeCalled;
       const close = getByLabelText('Close');
       fireEvent.click(close);
       expect(jest.fn()).toBeCalled;
    });

    it('should  render cart items and click pay button', () => {
        let val ={
            cartDetails: [{
                    "name": "Fresho Kiwi - Green, 3 pcs",
                    "imageURL": "/images/products/fruit-n-veg/kiwi-green.jpg",
                    "description": "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
                    "price": 87,
                    "stock": 50,
                    "category": "5b6899953d1a866534f516e2",
                    "sku": "fnw-kiwi-3",
                    "id": "5b6c6a7f01a7c38429530883"
                    }]
                }
       const {getByText, getByTestId} = render(<Store initialState={val}>
                                <BrowserRouter>
                                <CartDetails visible={visible} setVisible={jest.fn()}/>
                                </BrowserRouter>
                                </Store>);
        expect(getByText('Fresho Kiwi - Green, 3 pcs')).toBeInTheDocument();
        fireEvent.click(getByTestId('pay-btn'));
        expect(jest.fn()).toBeCalled;
    });

    it('should increase, decrease quatity', () => {
        let val ={
            cartDetails: [{
                    "name": "Fresho Kiwi - Green, 3 pcs",
                    "imageURL": "/images/products/fruit-n-veg/kiwi-green.jpg",
                    "description": "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
                    "price": 87,
                    "stock": 50,
                    "category": "5b6899953d1a866534f516e2",
                    "sku": "fnw-kiwi-3",
                    "id": "5b6c6a7f01a7c38429530883"
                    }]
                }
       const {getByLabelText, getByTestId} = render(<Store initialState={val}>
                                <BrowserRouter>
                                <CartDetails visible={visible} setVisible={jest.fn()}/>
                                </BrowserRouter>
                                </Store>);
        fireEvent.click(getByLabelText('increase quantity'));
        expect(getByTestId('qty')).toHaveTextContent('2');
        fireEvent.click(getByLabelText('decrease quantity'));
        expect(getByTestId('qty')).toHaveTextContent('1');
    });

    it('should test 0 items', () => {
        let val ={
            cartDetails: [{
                    "name": "Fresho Kiwi - Green, 3 pcs",
                    "imageURL": "/images/products/fruit-n-veg/kiwi-green.jpg",
                    "description": "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
                    "price": 87,
                    "stock": 50,
                    "category": "5b6899953d1a866534f516e2",
                    "sku": "fnw-kiwi-3",
                    "id": "5b6c6a7f01a7c38429530883"
                    }]
                }
       const {getByLabelText, getByTestId} = render(<Store initialState={val}>
                                <BrowserRouter>
                                <CartDetails visible={visible} setVisible={jest.fn()}/>
                                </BrowserRouter>
                                </Store>);
        fireEvent.click(getByLabelText('decrease quantity'));
        expect(getByLabelText('No items in your cart')).toBeInTheDocument();

    });
 
});
