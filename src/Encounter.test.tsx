import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Encounter, { EncounterProps, EncounterState } from './Encounter';
import Monster from './Monster';
import XP from './XP';

describe("<Encounter />", function() {
    let subject: ShallowWrapper<EncounterProps,EncounterState,Encounter>;

    beforeEach(function(){
        subject = shallow(<Encounter />);
    })

    it("should add a monster when add is clicked", function() {
        expect(subject.find(Monster).length).toEqual(0);
        subject.find(".add-monster")
               .simulate("click");

        expect(subject.find(Monster).length).toEqual(1);
    });

    it("should update XP when monster is updated", function() {
        subject.find(".add-monster")
               .simulate("click");

        const monster = subject.state("monsters")[0];
        subject.instance().updateMonster(monster.id, 200, 2);

        expect(subject.contains(<XP key={"total"} xp={200} />)).toBe(true);
        expect(subject.contains(<XP key={"adjusted"} xp={300} />)).toBe(true);
    });

    it("should handle removing a monster", function() {
        subject.find(".add-monster")
               .simulate("click");

        const monster = subject.state("monsters")[0];
        subject.instance().updateMonster(monster.id, 200, 2);
        subject.instance().removeMonster(monster.id);

        expect(subject.find(Monster).length).toEqual(0);
        expect(subject.contains(<XP key={"total"} xp={0} />)).toBe(true);
        expect(subject.contains(<XP key={"adjusted"} xp={0} />)).toBe(true);
    });
});
