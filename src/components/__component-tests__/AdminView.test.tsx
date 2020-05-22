import * as React from 'react';
import { User } from '../../dtos/user';

import { shallow, mount, ReactWrapper } from 'enzyme';
import AdminView, { AdminProps } from '../AdminView/AdminView';
import { BrowserRouter } from 'react-router-dom';


const props: AdminProps = {
    //@ts-ignore
    authUser: null as User,
    //@ts-ignore
    logoutAction: null
}

describe('Adminview renders', () => {
    const wrapper: ReactWrapper = mount(<BrowserRouter><AdminView {...props} /></BrowserRouter>);
    test('renders form', () => {
        expect(wrapper.find("AdminView")).toHaveLength(1);
    });
});