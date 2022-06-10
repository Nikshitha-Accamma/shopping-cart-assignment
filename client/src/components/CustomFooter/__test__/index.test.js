import { render } from '@testing-library/react';
import CustomFooter from '..';

describe('Footer Component', () => {
    const component = <CustomFooter />
    
    it('should render Footer component',()=> {
        const { getByText } = render(component);
        expect(getByText('Copyright © 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd')).toBeInTheDocument();
    });

});
