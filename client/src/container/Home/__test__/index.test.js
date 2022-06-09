import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '..';

describe('Home Component', () => {
    const component = 
    (
    <BrowserRouter>
    <Home />
    </BrowserRouter>
 )

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([{
            "name": "Beverages",
            "key": "beverages",
            "description": "Our beverage department will ensure your fridge is always fully stocked. Shop for soda, juice, beer and more. ",
            "enabled": true,
            "order": 3,
            "imageUrl": "/images/category/beverages.png",
            "id": "5b675e5e5936635728f9fc30"
            },
            {
            "name": "Bakery Cakes and Dairy",
            "key": "bakery-cakes-dairy",
            "description": "The best cupcakes, cookies, cakes, pies, cheesecakes, fresh bread, biscotti, muffins, bagels, fresh coffee, milk and more.",
            "enabled": true,
            "order": 2,
            "imageUrl": "/images/category/bakery.png",
            "id": "5b6899123d1a866534f516de"
            }])
        })
    });

    afterEach(() => {
     jest.restoreAllMocks();
    });
    
    it('should home component',()=> {
        render(component);
    });

    it('should reject the promise', () => {
          jest.spyOn(global, 'fetch').mockRejectedValue({
        })
         render(component);
    })
});
