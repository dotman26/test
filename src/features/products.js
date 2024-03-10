export const removeDuplicates = (array, key = false) => {
    return array.reduce((accumulator, current) => {
        if (!accumulator.find((t) => key ? t[key] === current[key] : t === current)) {
        accumulator.push(current);
        }
        return accumulator;
    }, []);
};

