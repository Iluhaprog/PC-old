import { expect } from "chai";
import { MAX_MICRO_COMMANDS_SIZE } from "../../constants";
import { MicroCommandsCounter } from "../MicroCommandsCounter";

describe("MicroCommandsCounter test", function () {
    it("setValue must be not available", function () {
        const microCommandsCounter = new MicroCommandsCounter();

        expect(() => microCommandsCounter.setValue(0b0)).to.be.throw('Not available');
    });

    it("must return max value", function () {
        const microCommandsCounter = new MicroCommandsCounter();
        
        microCommandsCounter.enable();

        for(let i = 0; i < MAX_MICRO_COMMANDS_SIZE - 1; i++) {
            microCommandsCounter.handleTick();
        }

        const value = microCommandsCounter.getValue();

        expect(value).to.be.equal(MAX_MICRO_COMMANDS_SIZE - 1);
    });

    it(`must return to initial state for ${MAX_MICRO_COMMANDS_SIZE} ticks`, function () {
        const microCommandsCounter = new MicroCommandsCounter();
        
        microCommandsCounter.enable();

        for(let i = 0; i < MAX_MICRO_COMMANDS_SIZE; i++) {
            microCommandsCounter.handleTick();
        }

        const value = microCommandsCounter.getValue();

        expect(value).to.be.equal(0);
    });

    it("must throw error when device is disabled and we call handleTick", function () {
        const microCommandsCounter = new MicroCommandsCounter();
        
        microCommandsCounter.disable();

        expect(() => microCommandsCounter.handleTick()).to.be.throw('Device is disabled.')
    });
});