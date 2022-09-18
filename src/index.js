export function capitalize(string) {
    if (typeof string !== 'string') {
        return 'This is not a string';
    } else {
        const firstLetter = string.slice(0, 1);
        const restOfString = string.slice(1);
        return firstLetter.toUpperCase() + restOfString.toLowerCase();
    }
}

export function reverseString(string) {
    if (typeof string !== 'string') {
        return 'This is not a string';
    } else {
        return string.split('').reverse().join('');
    }
}