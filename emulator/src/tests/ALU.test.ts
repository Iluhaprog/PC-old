import { assert } from "chai";
import { ALUMode, Flags } from "../constants";
import { ALU } from "../ALU";

describe("ALU test", function () {
    let aluInstance: ALU;

    this.beforeEach(function () {
        aluInstance = new ALU();
        aluInstance.enable();
    });

    this.afterEach(function () {
        aluInstance.disable();
    });

    describe("Math functions", function () {
        it("(R = A + B) ALU must return sum of values A nad B", function () {
            const A = 0b00000001;
            const B = 0b00000011;
            const mode = ALUMode.SUM;

            aluInstance.setMode(mode);

            const result = aluInstance.getResult(A, B);
            const expected = 0b00000100;

            assert.equal(result, expected);
        });

        it("(R = B - A) ALU must return diff of values A and B", function () {
            const A = 0b00000001;
            const B = 0b00000011;
            const mode = ALUMode.DIFF;

            aluInstance.setMode(mode);

            const result = aluInstance.getResult(A, B);
            const expected = 0b00000010;

            assert.equal(result, expected);
        });

        it("(R = A & B) ALU must return conjunction of values A and B", function () {
            const A = 0b10100101;
            const B = 0b10000111;
            const mode = ALUMode.CON;

            aluInstance.setMode(mode);

            const result = aluInstance.getResult(A, B);

            const expected = 0b10000101;

            assert.equal(result, expected);
        });

        it("(R = A | B) ALU must return disjunction of values A and B", function () {
            const A = 0b10100101;
            const B = 0b10010111;
            const mode = ALUMode.DIS;

            aluInstance.setMode(mode);

            const result = aluInstance.getResult(A, B);

            const expected = 0b10110111;

            assert.equal(result, expected);
        });


        it("(~A) ALU must return negation of value A", function () {
            const A = 0b10100101;
            const mode = ALUMode.NEG;

            aluInstance.setMode(mode);

            const result = aluInstance.getResult(A, 0);

            // in js numbers have sign,
            // thus for check using next expression A & ~A = 0
            const testResult = result & A;

            assert.equal(testResult, 0);
        });

        it ("(R = A >> 1) ALU must return value that shifted right", function () {
            const A = 0b00000010;
            const mode = ALUMode.RSH;

            aluInstance.setMode(mode);

            const result = aluInstance.getResult(A, 0);

            const expected = 0b00000001;
            assert.equal(result, expected);
        });

        it ("(R = A << 1) ALU must return value that shifted left", function () {
            const A = 0b00000010;
            const mode = ALUMode.LSH;

            aluInstance.setMode(mode);

            const result = aluInstance.getResult(A, 0);

            const expected = 0b00000100;
            assert.equal(result, expected);
        });
    });

    describe("Flags after comparison", function () {
        describe("When result is null", function () {
            const RESULT = 0;

            it ("(A = B) ALU must return that A = B", function () {
                const A = 0b00000001;
                const B = 0b00000001;
                
                const result = aluInstance.getFlags(A, B, RESULT);
                const expected = Flags.A_EQUAL_B | Flags.RESULT_IS_NULL;

                assert.equal(result, expected);
            });
            
            it ("(A > B) ALU must return that A > B", function () {
                const A = 0b10000010;
                const B = 0b01000001;
                
                const result = aluInstance.getFlags(A, B, RESULT);
                const expected = Flags.A_MORE_B | Flags.RESULT_IS_NULL;

                assert.equal(result, expected);
            });
            
            it ("(A < B) ALU must return that A < B", function () {
                const A = 0b01000001;
                const B = 0b10000010;
                
                const result = aluInstance.getFlags(A, B, RESULT);
                const expected = Flags.A_LESS_B | Flags.RESULT_IS_NULL;

                assert.equal(result, expected);
            });
        });

        describe("When result not null", function () {
            const RESULT = 0b1;

            it ("(A = B) ALU must return that A = B", function () {
                const A = 0b00000001;
                const B = 0b00000001;
                
                const result = aluInstance.getFlags(A, B, RESULT);
                const expected = Flags.A_EQUAL_B;

                assert.equal(result, expected);
            });
            
            it ("(A > B) ALU must return that A > B", function () {
                const A = 0b10000010;
                const B = 0b01000001;
                
                const result = aluInstance.getFlags(A, B, RESULT);
                const expected = Flags.A_MORE_B;

                assert.equal(result, expected);
            });
            
            it ("(A < B) ALU must return that A < B", function () {
                const A = 0b01000001;
                const B = 0b10000010;
                
                const result = aluInstance.getFlags(A, B, RESULT);
                const expected = Flags.A_LESS_B;

                assert.equal(result, expected);
            });
        });
    });
});