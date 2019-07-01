import { } from './ArrayExt';

describe('ArrayExt', function() {
    it('should find the first element', function() {
        const subject = [1, 2, 3];
        expect(subject.first()).toEqual(1);
        subject.shift();
        expect(subject.first()).toEqual(2);
        subject.shift();
        expect(subject.first()).toEqual(3);
        subject.shift();
        expect(subject.first()).toBeUndefined();
    });
});
