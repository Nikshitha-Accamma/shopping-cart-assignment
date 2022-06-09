import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '..';

describe('Login Component', () => {
    const component = 
    (
    <BrowserRouter>
    <Login />
    </BrowserRouter>
 )
    it('should render Login component',()=> {
        render(component);
    });

    it('should submit form without entering value', () => {
         const { getByTestId, getAllByText } = render(component);
         fireEvent.click(getByTestId('login-btn'));
         expect(getAllByText('Login')).toHaveLength(2);
    });

    it('should test input values', () => {
         const { getByTestId } = render(component);
         fireEvent.change(getByTestId('email'), {target: {value:'nikshitha.accamma@gmail.com'}});
         expect(getByTestId('email')).toHaveValue('nikshitha.accamma@gmail.com');
         fireEvent.change(getByTestId('password'), {target: {value:'qwerty1'}});
         expect(getByTestId('password')).toHaveValue('qwerty1');
         fireEvent.click(getByTestId('login-btn'));
         expect(jest.fn()).toBeCalled;
    });
});
