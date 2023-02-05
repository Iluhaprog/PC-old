import { assert } from "chai";
import { WorkMode } from "../constants";
import { Device } from "../Device";

describe("Device test", function () {
    let device: IDevice;
    
    this.beforeEach(function () {
        device = new Device();
    });

    describe("Check work status", function () {
        it("may be enabled (with setWorkStatus method)", function () {
            device.setWorkStatus(true);
    
            assert.isTrue(device.getWorkStatus());
        });
    
        it("may be disabled (with setWorkStatus method)", function () {
            device.setWorkStatus(false);
    
            assert.isFalse(device.getWorkStatus());
        });
    
    
        it("may be enabled (with enable method)", function () {
            device.enable();
    
            assert.isTrue(device.getWorkStatus());
        });
        it("may be disabled (with disable method)", function () {
            device.disable();
    
            assert.isFalse(device.getWorkStatus());
        });
    });

    describe("Check work modes", function () {
        describe("With default mode set (WorkMode)", function () {
            it ("must set READ mode", function () {
                device.setMode(WorkMode.READ);

                const mode = device.getMode();
                const expected = WorkMode.READ;

                assert.equal(mode, expected);
            });

            it ("must set WRITE mode", function () {
                device.setMode(WorkMode.WRITE);

                const mode = device.getMode();
                const expected = WorkMode.WRITE;

                assert.equal(mode, expected);
            });
        });

        describe("With custom mode set", function () {
            enum CustomMode {
                MODE_1,
                MODE_2,
            };

            let device: IDevice<CustomMode>;
    
            this.beforeEach(function () {
                device = new Device<CustomMode>();
            });

            it ("must set MODE_1 mode", function () {
                device.setMode(CustomMode.MODE_1);

                const mode = device.getMode();
                const expected = CustomMode.MODE_1;

                assert.equal(mode, expected);
            });

            it ("must set MODE_2 mode", function () {
                device.setMode(CustomMode.MODE_2);

                const mode = device.getMode();
                const expected = CustomMode.MODE_2;

                assert.equal(mode, expected);
            });
        });
    });

});