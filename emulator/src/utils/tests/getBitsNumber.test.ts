import { assert } from "chai";
import { getBitsNumber } from "../getBitsNumber";

describe("getBitsNumber test", function () {
    it ("must return 3 bits", function () {
        const testValue = 0b111;

        const result = getBitsNumber(testValue);
        const expected = 3;

        assert.equal(result, expected);
    });

    it ("must return 5 bits", function () {
        const testValue = 0b11111;

        const result = getBitsNumber(testValue);
        const expected = 5;

        assert.equal(result, expected);
    });

    it ("must return 12 bits", function () {
        const testValue = 0b111111111111;

        const result = getBitsNumber(testValue);
        const expected = 12;

        assert.equal(result, expected);
    });
});