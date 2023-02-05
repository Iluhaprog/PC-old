import { MAX_FLAG_SIZE } from "../constants";
import { Register } from "./Register";

export class FlagsRegister extends Register {
    constructor() {
        super(Number.NaN, MAX_FLAG_SIZE);
    }
}