function isEmpty(str) {
    str = typeof str == 'string' ? str.replace(/\s/g, '') : str; //If it's a string remove all empty spaces
    str = typeof str == 'number' ? str.toString() : str; //If it's a number make it string
    str = isJsonObj(str) && Object.keys(str).length === 0 ? '' : str; // if object is empty {}, []
    str = isJsonStr(str) && Object.keys(JSON.parse(str)).length === 0 ? '' : str; // if object string is empty {}, []
    return typeof str == 'undefined' || !str || str.length == 0 || str == '' || str == '0000-00-00 00:00:00' || str == null || str == 'null';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isJsonObj(obj) {
    // Call if u want to check if an object is a JSON
    if (typeof obj !== 'object') return false;
    try {
        const type = Object.prototype.toString.call(obj).toLowerCase();
        return type === '[object object]' || type === '[object array]';
    } catch (err) {
        return false;
    }
}
function isJsonStr(str) {
    // Call if u want to check if an string is a JSON So JSON.parse(str) can be called
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result).toLowerCase();
        return type === '[object object]' || type === '[object array]';
    } catch (err) {
        return false;
    }
}
module.exports = {
    isEmpty,
    getRandomInt,
    isJsonObj,
    isJsonStr,
};