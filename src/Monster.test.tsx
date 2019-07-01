import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Monster, { MonsterState, MonsterProps } from './Monster';
import XP from './XP';

describe("<Monster />", function() {
    const id = "THX1128";
    const xp = 0;
    const count = 1;
    let stub = {
        onChangeMonster: function() {},
        onRemoveMonster: function() {},
    }
    let subject: ShallowWrapper<MonsterProps,MonsterState,Monster>;

    beforeEach(function() {
        spyOn(stub, 'onChangeMonster');
        spyOn(stub, 'onRemoveMonster');
        subject = shallow(<Monster id={id}
                                   xp={xp}
                                   count={count}
                                   onChangeMonster={stub.onChangeMonster}
                                   onRemoveMonster={stub.onRemoveMonster}
        />);

    });

    it("should show XP", function() {
        expect(subject.find(XP).prop('xp')).toEqual(0);
    });


    it("should call onChangeMonster when count changes", function() {
        subject.find(".count")
               .simulate("change", {target: {value: "2"}});

        expect(stub.onChangeMonster).toHaveBeenCalledWith(id, 20, 2);
    });

    it("should call onChangeMonster when XP changes", function() {
        subject.find(".cr-select")
               .simulate("change", {target: {value: "1/2"}});

        subject.find(".count")
               .simulate("change", {target: {value: "2"}});

        expect(stub.onChangeMonster).toHaveBeenCalledWith(id, 200, 2);
    });

    it("should treat negative count as zero", function() {
        subject.find(".count")
               .simulate("change", {target: {value: "-1"}});

        expect(stub.onChangeMonster).toHaveBeenCalledWith(id, 0, 0);
    });

    it("should remove monster when deleted", function() {
        subject.find(".delete-monster")
               .simulate("click");

        expect(stub.onRemoveMonster).toHaveBeenCalledWith(id);
    });
});
