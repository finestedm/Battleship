import { capitalize, reverseString } from "./index.js";

test('capitalize string', () => {
    expect(capitalize('pies')).toBe('Pies');
})

test('capitalize if not a string', () => {
    expect(capitalize(123)).toBe('This is not a string');
})

test('reverse string', () => {
    expect(reverseString('pies')).toBe('seip');
})

test('reverse if not a string', () => {
    expect(reverseString(123)).toBe('This is not a string');
})

test('reverse if object', () => {
    expect(reverseString({ 'pies': 'pies' })).toBe('This is not a string');
})   