
import * as React from 'react';
import { User } from '../../dtos/user';
import { authenticate } from '../../remote/auth-service';
import { Redirect } from 'react-router-dom';

import { shallow, mount, ReactWrapper } from 'enzyme';
import LoginForm, { ILoginProps } from '../LoginForm/LoginForm';
import { BrowserRouter } from 'react-router-dom';


const props: ILoginProps = {
    //@ts-ignore
    authUser: null as User,
    //@ts-ignore
    errorMessage: null as String,
    //@ts-ignore
    loginAction: null,
    //@ts-ignore
    resetFunction: null,
    //@ts-ignore
    transitFunction: null,
}

describe('Login renders renders', () => {
    const wrapper: ReactWrapper = mount(<BrowserRouter><LoginForm {...props} /></BrowserRouter>);
    test('Renders the component', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});