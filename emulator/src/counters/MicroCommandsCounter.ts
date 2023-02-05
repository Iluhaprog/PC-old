import { WorkStatusError } from "../errors";
import { MAX_MICRO_COMMANDS_SIZE } from "../constants";
import { CommandsCounter } from "./CommandsCounter";

export class MicroCommandsCounter extends CommandsCounter implements ICounterDevice {
    constructor() {
        super(MAX_MICRO_COMMANDS_SIZE)
    }

    handleTick(): void {
        if (!this.enabled) throw new WorkStatusError();

        const prevValue = this.getValue();
        const nextValue = prevValue + 1;

        if (nextValue >= this.getMaxBitsNumber()) {
            this.value = 0;
            return;
        }

        this.value = nextValue;
    }

    public setValue(value: number): void {
        throw new Error('Not available');
    }
}