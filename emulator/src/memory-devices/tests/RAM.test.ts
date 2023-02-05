import { expect } from "chai";
import { WorkMode } from "../../constants";
import { RAM } from "../RAM";

describe("RAM test", function () {
    describe("Work mode is WRITE", function () {
        describe("Success suites", function () {
            let ram: IMemoryDevice;
            const mode = WorkMode.WRITE; 
    
            this.beforeEach(function () {
                ram = new RAM();
                ram.enable();
                ram.setMode(mode);
            });

            it("must set 0b1 by address 0b10", function () {
                const dataRow = 0b1;
                const address = 0b10;    

                expect(() => ram.setData(dataRow, address)).to.not.throw();
            });
    
            it("must set 0b1000000000000100000001 by address 0b100000000001", function () {
                const dataRow = 0b1000000000000100000001;
                const address = 0b100000000001;

                expect(() => ram.setData(dataRow, address)).to.not.throw();
            });

            it("must set 0b1110001000000100000001 by address 0b100010000001", function () {
                const dataRow = 0b1110001000000100000001;
                const address = 0b100010000001;    

                expect(() => ram.setData(dataRow, address)).to.not.throw();
            });
        });

        describe("Failure suites", function () {
            let ram: IMemoryDevice;
            const dataRow = 0b1000000000000100000001;
            const address = 0b100000000001;

            this.beforeEach(function () {
                ram = new RAM();
            });

            it("must throw error with message about disabled device for setting data", function () {
                ram.disable();

                expect(() => ram.setData(dataRow, address)).to.throw('Device is disabled.');
            });

            it("must return error with message about wrong mode for setting data", function () {
                ram.enable();
                ram.setMode(WorkMode.READ);

                expect(() => ram.setData(dataRow, address)).to.throw(`Expected ${(WorkMode.WRITE).toString(2)} mode of operation, but the current is ${(WorkMode.READ).toString(2)}`);
            });
        });
    });

    describe("Getting data by address", function () {
        describe("Success suites", function () {
            let ram: IMemoryDevice;
            const mode = WorkMode.READ; 
            const [
                address1,
                address2,
                address3,
            ] = [
                0b0,
                0b1,
                0b10
            ];
    
            const [
                data1,
                data2,
                data3,
            ] = [
                0b1000000000000100111001,
                0b1000100001100100000001,
                0b1010000100000100000001
            ]
    
            this.beforeAll(function () {
                ram = new RAM();
                ram.enable();
                ram.setMode(WorkMode.WRITE);
    
                ram.setData(data1, address1);
                ram.setData(data2, address2);
                ram.setData(data3, address3);
    
                ram.setMode(mode);
            });
    
            it(`get data by address 0b${address1.toString(2)}`, function () {
                const result = ram.getData(address1);
    
                expect(result).to.be.equal(data1);
            });
    
    
            it(`get data by address 0b${address2.toString(2)}`, function () {
                const result = ram.getData(address2);
    
                expect(result).to.be.equal(data2);
            });
    
    
            it(`get data by address 0b${address3.toString(2)}`, function () {
                const result = ram.getData(address3);
    
                expect(result).to.be.equal(data3);
            });
        });
        
        describe('Failure suites', function () {
            let ram: IMemoryDevice;
            // const dataRow = 0b1000000000000100000001;
            const address = 0b100000000001;

            this.beforeEach(function () {
                ram = new RAM();
            });


            it('must throw error with message about disabled device for getting data', function () {
                ram.disable();

                expect(() => ram.getData(address)).to.throw('Device is disabled.')
            });

            it("must return error with message about wrong mode for getting data", function () {
                ram.enable();
                ram.setMode(WorkMode.WRITE);

                expect(() => ram.getData(address)).to.throw(`Expected ${(WorkMode.READ).toString(2)} mode of operation, but the current is ${(WorkMode.WRITE).toString(2)}`);
            });
        });
    });
});