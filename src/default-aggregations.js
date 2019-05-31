
export default {
    Count: (label) => ({
        Accumulate: (accumulator = 0) => ++accumulator,
        GetResult: (accumulator) => accumulator,
        label
    }),
    Sum: (label) => ({
        Accumulate: (accumulator = 0, currentValue) => accumulator + (currentValue || 0),
        GetResult: (accumulator) => accumulator,
        label
    }),
    Avg: (label) => ({
        Accumulate: (accumulator = { sum: 0, count: 0 }, currentValue) => ({ sum: accumulator.sum + (currentValue || 0), count: accumulator.count + 1 }),
        GetResult: (accumulator) => accumulator.sum / accumulator.count,
        label
    }),
    Min: (label) => ({
        Accumulate: (accumulator = undefined, currentValue) => accumulator ? Math.min(accumulator, currentValue) : currentValue,
        GetResult: (accumulator) => accumulator,
        label
    }),
    Min: (label) => ({
        Accumulate: (accumulator = undefined, currentValue) => accumulator ? Math.max(accumulator, currentValue) : currentValue,
        GetResult: (accumulator) => accumulator,
        label
    }),
};
