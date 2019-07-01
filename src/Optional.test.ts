import Optional from './Optional';

describe('Optional', function() {
    const add1 = (i: number) => i + 1;
    const toString = (i: number) => i.toString();
    let some: Optional<number>;
    let none: Optional<number>;

    beforeEach(function() {
        some = Optional.of(1);
        none = Optional.empty();
    });


    it('Should map()', function() {
        expect(some
            .map(add1)
            .map(toString)
            .get()).toEqual("2");

        expect(none
            .map(add1)
            .map(toString)
            .get()).toEqual(null);
    });

    it('Should return if empty', function() {
        expect(some.isEmpty()).toBeFalsy();
        expect(none.isEmpty()).toBeTruthy();
    });
});
