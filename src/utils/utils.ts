export const randomInt = (min = 1000000, max = null) => {
    if (max == null)
        return Math.floor(Math.random() * min) + min;
    return Math.floor(Math.random() * (max - min)) + min;
}

export const roundTo = function (num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
};

export const getValueEnum = (dataEnum: any) => {
    return Object.values(dataEnum).map((value) => value)
}

export const cloneObj = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};