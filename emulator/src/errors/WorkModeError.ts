export class WorkModeError<T> extends Error {
    constructor(currentMode: T, expectedMode: T) {
        super(`Expected ${(+expectedMode).toString(2)} mode of operation, but the current is ${(+currentMode).toString(2)}`);
    }
}