/**
 * This function return number of bits in value
 * @param value number 
 * @returns number
 */
export function getBitsNumber(value: number): number {
    return value.toString(2).length;
}