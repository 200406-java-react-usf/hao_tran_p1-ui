import * as React from 'react';
import { User } from '../../dtos/user';

import { shallow, mount, ReactWrapper } from 'enzyme';
import ManagerView, { ManagerProps } from '../ManagerView/ManagerView';
import { BrowserRouter } from 'react-router-dom';


const props: ManagerProps = {
    //@ts-ignore
    authUser: null as User,
    //@ts-ignore
    logoutAction: null,
}

describe('Managerview renders', () => {
    const wrapper: ReactWrapper = mount(<BrowserRouter><ManagerView {...props} /></BrowserRouter>);
    test('renders form', () => {
        expect(wrapper.find("ManagerView")).toHaveLength(1);
    });
});