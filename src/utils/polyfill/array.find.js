Object.defineProperty(Array.prototype, 'find', {
  value: function (predicate) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    const o = Object(this);
    const len = o.length >>> 0;
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const thisArg = arguments[1];
    let k = 0;
    while (k < len) {
      const kValue = o[k];
      if (predicate.call(thisArg, kValue, k, o)) {
        return kValue;
      }
      k++;
    }
    return undefined;
  },
});
