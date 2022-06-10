import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Products from '..';
import Store from '../../../store';

let initialStoreValue  = {
    cartDetails: []
}

beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([{
      "name": "Fresho Kiwi - Green, 3 pcs",
      "imageURL": "/images/products/fruit-n-veg/kiwi-green.jpg",
      "description": "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
      "price": 87,
      "stock": 50,
      "category": "5b6899953d1a866534f516e2",
      "sku": "fnw-kiwi-3",
      "id": "5b6c6a7f01a7c38429530883"
    },
    {
      "name": "Apple - Washington, Regular, 4 pcs",
      "imageURL": "/images/products/fruit-n-veg/apple.jpg",
      "description": "The bright red coloured and heart shaped Washington apples are crunchy, juicy and slightly sweet. Washington Apples are a natural source of fibre and are fat free.",
      "price": 187,
      "stock": 50,
      "category": "5b6899953d1a866534f516e2",
      "sku": "fnw-apple-4",
      "id": "5b6c6aeb01a7c38429530884"
    },])
        })
    });

    afterEach(() => {
     jest.restoreAllMocks();
    });

describe('Products listing Component', () => {
    const component = 
    (
    <Store initialState={initialStoreValue}>
    <BrowserRouter>
    <Products />
    </BrowserRouter>
    </Store>
 )
    it('should render Products listing component',()=> {
        render(component);
    });

    it('should render error',()=> {
         jest.spyOn(global, 'fetch').mockRejectedValue({
        })
        render(component);
    });

    // it('should add item to cart',()=> {
    //   const getByTestId = act(()=> {const { getByTestId } = render(component); return getByTestId});
    //     fireEvent.click(getByTestId('add-to-cart'));
    //     expect(jest.fn()).toBeCalled;
    // });
});
