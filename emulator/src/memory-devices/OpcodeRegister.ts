import { MAX_OPCODE_SIZE } from "../constants";
import { Register } from "./Register";

export class OpcodeRegister extends Register {
    constructor() {
        super(Number.NaN, MAX_OPCODE_SIZE);
    }
}