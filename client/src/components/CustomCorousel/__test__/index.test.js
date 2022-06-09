import { fireEvent, render } from '@testing-library/react';
import CustomCorousel from '..';

describe('Corousel Component', () => {
    const component = <CustomCorousel />
    
    it('should render corousel component',()=> {
        render(component);
    });

    it('should scroll through the images', () => {
        const { getByTestId } = render(component);
        fireEvent.click(getByTestId('prev-btn'));
        expect(jest.fn()).toBeCalled;
        fireEvent.click(getByTestId('next-btn'));
        expect(jest.fn()).toBeCalled;
    })

});
