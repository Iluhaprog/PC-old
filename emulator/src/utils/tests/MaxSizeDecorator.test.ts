import { expect } from "chai";
import { CheckDataSizes, MaxSize } from "../MaxSizeDecorator";

class TestClass {
    @CheckDataSizes
    someMethod(@MaxSize(2) a1: number, @MaxSize(5) a2: number ) {
        return;
    }
}

describe("MaxSizeDecorator test", function () {
    const testClass = new TestClass();
    describe("success suites", function () {

        it("Pass 3 for a1 and 8 for a2", function () {
            const [A1, A2] = [3, 5];
            expect(() => testClass.someMethod(A1, A2)).to.not.throw();
        });

        it("Pass 1 for a1 and 15 for a2", function () {
            const [A1, A2] = [1, 15];
            expect(() => testClass.someMethod(A1, A2)).to.not.throw();
        });

        it("Pass 2 for a1 and 22 for a2", function () {
            const [A1, A2] = [2, 22];
            expect(() => testClass.someMethod(A1, A2)).to.not.throw();
        });
    });

    describe("failure suites", function () {
        it("Pass 4 for a1 and 100 for a2", function () {
            const [A1, A2] = [4, 100];
            expect(() => testClass.someMethod(A1, A2)).to.throw();
        });

        it("Pass 1 for a1 and 64 for a2", function () {
            const [A1, A2] = [1, 64];
            expect(() => testClass.someMethod(A1, A2)).to.throw();
        });

        it("Pass 44 for a1 and 2 for a2", function () {
            const [A1, A2] = [44, 2];
            expect(() => testClass.someMethod(A1, A2)).to.throw();
        });
    });
});