import React from 'react';
import { shallow } from 'enzyme';
import { spyOn } from 'jasmine';

import Monster from './Monster';
import XP from './XP';

describe("<Monster />", function() {
    const id = "THX1128";
    let stub = {
        updateMonster: function() {}
    }
    let subject;

    beforeEach(function() {
        spyOn(stub, 'updateMonster');
        subject = shallow(<Monster id={id}
                                 updateMonster={stub.updateMonster} />);

    });

    it("should show 0 XP by default ", function() {
        expect(subject.find(XP).prop('xp')).toEqual(0);
    });

    it("should update XP for count", function() {
        subject.find("#count")
                .simulate("change", {target: {value: "2"}});

        expect(subject.find(XP).prop('xp')).toEqual(20);
    });

    it("should call updateMonster when count changes", function() {
        subject.find("#count")
               .simulate("change", {target: {value: "2"}});

        expect(subject.find(XP).prop('xp')).toEqual(20);
        expect(stub.updateMonster).toHaveBeenCalledWith(id, 20, 2);
    });

    it("should update XP for CR and count", function() {
        subject.find("#cr-select")
               .simulate("change", {target: {value: "1/2"}});

        subject.find("#count")
               .simulate("change", {target: {value: "2"}});

        expect(subject.find(XP).prop('xp')).toEqual(200);
    });

    it("should call updateMonster when XP changes", function() {
        subject.find("#cr-select")
               .simulate("change", {target: {value: "1/2"}});

        subject.find("#count")
               .simulate("change", {target: {value: "2"}});


        expect(subject.find(XP).prop('xp')).toEqual(200);
        expect(stub.updateMonster).toHaveBeenCalledWith(id, 200, 2);
    });
});
