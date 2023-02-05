import { MAX_ADDRESS_SIZE } from "../constants";
import { Register } from "./Register";

export class RCARegister extends Register {
    /**
     * Register of custom address
     * Register that can store custom address. 
     * This address used for JMP, CJM, RD, WT commands.
     */
    constructor() {
        super(Number.NaN, MAX_ADDRESS_SIZE);
    }
}