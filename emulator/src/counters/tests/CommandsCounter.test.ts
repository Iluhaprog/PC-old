import { expect } from "chai";
import { CommandsCounter } from "../CommandsCounter";

describe("CommandsCounter test", function () {
    it ("must change counter on tick without errors", function () {
        const commandsCounter = new CommandsCounter();

        commandsCounter.enable();

        expect(() => commandsCounter.handleTick()).to.not.throw();
    });

    it ("must throw error on tick because counter is disabled", function () {
        const commandsCounter = new CommandsCounter();

        commandsCounter.disable();

        expect(() => commandsCounter.handleTick()).to.throw('Device is disabled.');
    });

    it("must set counter through setValue method", function () {
        const commandsCounter = new CommandsCounter();

        commandsCounter.disable();

        expect(() => commandsCounter.setValue(0b1)).to.not.throw();
    });

    it("must throw error when set counter through setValue method [MaxBitLimitError]", function () {
        const maxBitsNumber = 2;
        const commandsCounter = new CommandsCounter(maxBitsNumber);

        commandsCounter.disable();

        expect(() => commandsCounter.setValue(0b111)).to.throw(`The limit on the number of bits in the number has been exceeded. Max number is ${maxBitsNumber}`);
    });

    it("must throw error when set counter through setValue method [WorkStatusError]", function () {
        const maxBitsNumber = 2;
        const commandsCounter = new CommandsCounter(maxBitsNumber);

        commandsCounter.enable();

        expect(() => commandsCounter.setValue(0b111)).to.throw('Device is enabled.');
    });

    it("must return max value", function () {
        const maxBitsNumber = 3;
        const commandsCounter = new CommandsCounter(maxBitsNumber);

        commandsCounter.enable();

        for (let i = 0; i < 2 ** maxBitsNumber - 1; i++) {
            commandsCounter.handleTick();
        }

        const value = commandsCounter.getValue();
        const expected = 0b111;

        expect(value).to.be.equal(expected);
    });

    it("must return to initial state for 3 ticks", function () {
        const maxBitsNumber = 2;
        const commandsCounter = new CommandsCounter(maxBitsNumber);

        commandsCounter.enable();

        for (let i = 0; i < 2 ** maxBitsNumber; i++) {
            commandsCounter.handleTick();
        }

        const value = commandsCounter.getValue();
        const expected = 0;

        expect(value).to.be.equal(expected);
    });
});