export const onlyNumberMask = (value) => {
    if (!value) {
        return "";
    }
    return value.replace(/\D/g, "");
};