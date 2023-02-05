import { ALUMode, Flags } from "./constants";
import { Device } from "./Device";

export class ALU extends Device<ALUMode> implements IALU {

    constructor() {
        super();
    }

    public getResult(a: number, b: number): number {
        if (this.enabled) {
            switch(this.getMode()){
                case ALUMode.SUM:
                    return this.getSum(a, b);
                case ALUMode.DIFF:
                    return this.getDiff(a, b);
                case ALUMode.RSH:
                    return this.getRSH(a, b);
                case ALUMode.LSH:
                    return this.getLSH(a, b);
                case ALUMode.CON:
                    return this.getCON(a, b);
                case ALUMode.DIS:
                    return this.getDIS(a, b);
                case ALUMode.NEG:
                    return this.getNEG(a);
                default:
                    return 0;
            }
        }

        return 0;
    }

    public getFlags(a: number, b: number, result: number): number {
        if (this.enabled) {
            let resultFlags = 0b0000;

            if (a === b)        resultFlags |= Flags.A_EQUAL_B;
            if (a > b)          resultFlags |= Flags.A_MORE_B;
            if (a < b)          resultFlags |= Flags.A_LESS_B;
            if (result === 0)   resultFlags |= Flags.RESULT_IS_NULL;

            return resultFlags;
        }

        return 0;
    }

    private getSum(a: number, b: number): number {
        return a + b;
    }

    private getDiff(a: number, b: number): number {
        return b - a;
    }

    private getLSH(a: number, b: number): number {
        return a << 1;
    }


    private getRSH(a: number, b: number): number {
        return a >> 1;
    }

    private getCON(a: number, b: number): number {
        return a & b;
    }

    private getDIS(a: number, b: number): number {
        return a | b;
    }

    private getNEG(a: number): number {
        return ~a;
    }
}