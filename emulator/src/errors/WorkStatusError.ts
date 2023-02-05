export class WorkStatusError extends Error {
    constructor(msg?: string) {
        super(msg || `Device is disabled.`);
    }
}