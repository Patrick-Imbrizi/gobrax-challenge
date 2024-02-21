// export const plateMask = (value) => {
//     value = value.replace(/\W/g, "");
//     return value
//         .replace(/^(\w{3})(\w{4})$/, "$1-$2")
//         .replace(/^(\w{3})(\w)(\w{2})$/, "$1-$2$3");
// };

export const plateMask = (value) => {
    value = value.replace(/\W/g, "");
    value = value.toUpperCase();
    if (value.length > 7) {
        return value.substring(0, 7);
    }
    return value.replace(/^(\w{3})(\w{1,4})$/, (match, p1, p2) => `${p1.toUpperCase()}-${p2.toUpperCase()}`);
};