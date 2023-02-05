import { expect } from "chai";
import { WorkMode } from "../../constants";
import { Register } from "../Register";

describe("Register test", function () {
    describe("Serial number", function () {
        it("must create register with valid serialNumber", function () {
            expect(() => new Register(0b1001)).to.not.throw();
        });

        it("must set valid serialNumber with setSerialNumber method", function() {
            const register = new Register(0b0000);

            expect(() => register.setSerialNumber(0b1111)).to.not.throw();
        });

        it("must get serialNumber of register", function () {
            const serialNumber = 0b1111;
            const register = new Register(serialNumber);

            expect(register.getSerialNumber()).to.be.equal(serialNumber);
        });

        it("must throw error with message about invalid serialNumber on constructor", function () {
            const maxSerialNumberSize = 3;
            const serialNumber = 0b11001;
            expect(() => new Register(serialNumber, maxSerialNumberSize)).to.throw(`The limit on the number of bits in the number has been exceeded. Max number is ${maxSerialNumberSize}`);
        });

        it("must throw error with message about invalid serialNumber on setSerialNumber method", function () {
            const maxSerialNumberSize = 3;
            const prevSerialNumber = 0b111;
            const register = new Register(prevSerialNumber, maxSerialNumberSize);

            const newSerialNumber = 0b1000;

            expect(() => register.setSerialNumber(newSerialNumber)).to.throw(`The limit on the number of bits in the number has been exceeded. Max number is ${maxSerialNumberSize}`);
        });
    });

    describe("Setting data", function () {
        let register: Register;
        const serialNumber = 0b0000;
        describe("Success suites", function () {
            const mode = WorkMode.WRITE;

            this.beforeEach(function () {
                register = new Register(serialNumber);
                register.enable();
                register.setMode(mode);
            });

            it ("must set 0b10000001 into register", function() {
                const data = 0b10000001;

                expect(() => register.setData(data)).to.not.throw();
            });

            it ("must set 0b111 into register", function() {
                const data = 0b111;

                expect(() => register.setData(data)).to.not.throw();
            });

            it ("must set 0b0 into register", function() {
                const data = 0b0;

                expect(() => register.setData(data)).to.not.throw();
            });
        });

        describe("Failure suites", function () {
            const data = 0b10000001;

            this.beforeEach(function () {
                register = new Register(serialNumber);
            });

            it("must throw error with message about disabled device for setting data", function () {

                register.disable();

                expect(() => register.setData(data)).to.throw('Device is disabled.');
            });

            it("must throw error with message about wrong mode for setting data", function () {
                register.enable();
                register.setMode(WorkMode.READ);

                expect(() => register.setData(data)).to.throw(`Expected ${(WorkMode.WRITE).toString(2)} mode of operation, but the current is ${(WorkMode.READ).toString(2)}`);
            });
        });
    });

    describe("Getting data", function () {
        let register: Register;
        const serialNumber = 0b0000;
        const data = 0b10000001;

        describe("Success suites", function () {
            const mode = WorkMode.READ;

            this.beforeAll(function () {
                register = new Register(serialNumber);
                register.enable();
                register.setMode(WorkMode.WRITE);

                register.setData(data);

                register.setMode(mode);
            });

            it ("must get data from register", function() {

                expect(() => register.getData()).to.not.throw();
            });
        });

        describe("Failure suites", function () {
            this.beforeAll(function () {
                register = new Register(serialNumber);
            });

            it("must throw error with message about disabled device for setting data", function () {

                register.disable();

                expect(() => register.getData()).to.throw('Device is disabled.');
            });

            it("must throw error with message about wrong mode for setting data", function () {
                register.enable();
                register.setMode(WorkMode.WRITE);

                expect(() => register.getData()).to.throw(`Expected ${(WorkMode.READ).toString(2)} mode of operation, but the current is ${(WorkMode.WRITE).toString(2)}`);
            });
        });
    });
});