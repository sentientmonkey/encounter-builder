export { }

declare global {
    interface Array<T> {
        first(): T;
    }
}

if (!Array.prototype.first) {
    // eslint-disable-next-line
    Array.prototype.first = function() { return this[0] };
}
