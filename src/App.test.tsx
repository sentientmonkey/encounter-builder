import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import Encounter from './Encounter';

describe("<App />", function() {
    it("loads an encounter", function() {
        const subject = shallow(<App />);
        expect(subject.find(Encounter).length).toEqual(1);
    });
});
