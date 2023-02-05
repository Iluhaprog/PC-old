import { MaxBitsLimitError, WorkStatusError } from "../errors";
import { MAX_ADDRESS_SIZE, WorkMode } from "../constants";
import { Device } from "../Device";
import { getBitsNumber } from "../utils/getBitsNumber";

export class CommandsCounter extends Device implements ICounterDevice {
    protected value: number = 0;
    private maxBitsNumber: number;

    constructor(maxBitsNumber = MAX_ADDRESS_SIZE) {
        super();
        this.maxBitsNumber = maxBitsNumber;
    }

    public handleTick(): void {
        if (!this.enabled) throw new WorkStatusError();

        const nextValue = this.value + 1;
        const valueSize = getBitsNumber(nextValue);

        if (valueSize > this.maxBitsNumber) {
            this.value = 0;
            return;
        }

        this.value = nextValue;
    }

    public setValue(value: number): void {
        if (this.enabled) throw new WorkStatusError('Device is enabled.');

        const valueSize = getBitsNumber(value);
        if (valueSize > this.maxBitsNumber) throw new MaxBitsLimitError(this.maxBitsNumber);

        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }

    public getMaxBitsNumber(): number {
        return this.maxBitsNumber;
    }
}