export class MaxBitsLimitError extends Error {
    constructor(maxValue: number) {
        super(`The limit on the number of bits in the number has been exceeded. Max number is ${maxValue}`);
    }
}