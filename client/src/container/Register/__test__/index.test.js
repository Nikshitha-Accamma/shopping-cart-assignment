import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '..';

describe('Register Component', () => {
    const component = 
    (
    <BrowserRouter>
    <Register />
    </BrowserRouter>
 )
    it('should render Register component',()=> {
        render(component);
    });

    it('should submit form without entering value', () => {
         const { getByTestId, getAllByText } = render(component);
         fireEvent.click(getByTestId('register-btn'));
         expect(getAllByText('Signup')).toHaveLength(2);
    });

    it('should test input values', () => {
         const { getByTestId } = render(component);
         fireEvent.change(getByTestId('first-name'), {target: {value:'Nikshitha'}});
         expect(getByTestId('first-name')).toHaveValue('Nikshitha');
         fireEvent.change(getByTestId('last-name'), {target: {value:'Accamma B J'}});
         expect(getByTestId('last-name')).toHaveValue('Accamma B J');
         fireEvent.change(getByTestId('email'), {target: {value:'nikshitha.accamma@gmail.com'}});
         expect(getByTestId('email')).toHaveValue('nikshitha.accamma@gmail.com');
         fireEvent.change(getByTestId('password'), {target: {value:'qwerty1'}});
         expect(getByTestId('password')).toHaveValue('qwerty1');
         fireEvent.click(getByTestId('register-btn'));
         expect(jest.fn()).toBeCalled;
    });
});
