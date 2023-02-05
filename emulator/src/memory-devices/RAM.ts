import { CheckDataSizes, MaxSize } from "../utils/MaxSizeDecorator";
import { MAX_ADDRESS_SIZE, MAX_MEMORY_SIZE, WorkMode } from "../constants";
import { Device } from "../Device";
import { getMaxDataRowSize } from "../utils/getMaxDataRowSize";
import { WorkStatusError, WorkModeError } from "../errors";

export class RAM extends Device implements IMemoryDevice {
    private data: number[] = [];

    constructor () {
        super();
        this.initData();
    }
    
    @CheckDataSizes
    public setData(
        @MaxSize(getMaxDataRowSize()) data: number, 
        @MaxSize(MAX_ADDRESS_SIZE) address: number
    ): void {
        super.actionGuard(WorkMode.WRITE);

        this.data[address] = data;
    }

    @CheckDataSizes
    public getData(@MaxSize(MAX_ADDRESS_SIZE) address: number): number {
        super.actionGuard(WorkMode.READ);

        return this.data[address];
    }

    private initData() {
        this.data = new Array(MAX_MEMORY_SIZE).fill(0);
    }
}