import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Monster, { MonsterState, MonsterProps } from './Monster';
import XP from './XP';

describe("<Monster />", function() {
    const id = "THX1128";
    let stub = {
        updateMonster: function() {},
        removeMonster: function() {},
    }
    let subject: ShallowWrapper<MonsterProps,MonsterState,Monster>;

    beforeEach(function() {
        spyOn(stub, 'updateMonster');
        spyOn(stub, 'removeMonster');
        subject = shallow(<Monster id={id}
                                   updateMonster={stub.updateMonster}
                                   removeMonster={stub.removeMonster}
        />);

    });

    it("should show 0 XP by default ", function() {
        expect(subject.find(XP).prop('xp')).toEqual(0);
    });

    it("should update XP for count", function() {
        subject.find(".count")
                .simulate("change", {target: {value: "2"}});

        expect(subject.find(XP).prop('xp')).toEqual(20);
    });

    it("should call updateMonster when count changes", function() {
        subject.find(".count")
               .simulate("change", {target: {value: "2"}});

        expect(subject.find(XP).prop('xp')).toEqual(20);
        expect(stub.updateMonster).toHaveBeenCalledWith(id, 20, 2);
    });

    it("should update XP for CR and count", function() {
        subject.find(".cr-select")
               .simulate("change", {target: {value: "1/2"}});

        subject.find(".count")
               .simulate("change", {target: {value: "2"}});

        expect(subject.find(XP).prop('xp')).toEqual(200);
    });

    it("should call updateMonster when XP changes", function() {
        subject.find(".cr-select")
               .simulate("change", {target: {value: "1/2"}});

        subject.find(".count")
               .simulate("change", {target: {value: "2"}});


        expect(subject.find(XP).prop('xp')).toEqual(200);
        expect(stub.updateMonster).toHaveBeenCalledWith(id, 200, 2);
    });

    it("should not update count when it is negative", function() {
        subject.find(".count")
               .simulate("change", {target: {value: "-1"}});

        expect(subject.state('count')).toEqual(0);
    });

    it("should remove monster when deleted", function() {
        subject.find(".delete-monster")
               .simulate("click");

        expect(stub.removeMonster).toHaveBeenCalledWith(id);
    });
});
