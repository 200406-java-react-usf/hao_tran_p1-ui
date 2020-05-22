import * as React from 'react';
import { User } from '../../dtos/user';

import { shallow, mount, ReactWrapper } from 'enzyme';
import EmployeeView, { EmployeeProps } from '../EmployeeView/EmployeeView';
import { BrowserRouter } from 'react-router-dom';


const props: EmployeeProps = {
    //@ts-ignore
    authUser: null as User,
    //@ts-ignore
    logoutAction: null,
}

describe('Employeeview renders', () => {
    const wrapper: ReactWrapper = mount(<BrowserRouter><EmployeeView {...props} /></BrowserRouter>);
    test('renders form', () => {
        expect(wrapper.find("EmployeeView")).toHaveLength(1);
    });
});