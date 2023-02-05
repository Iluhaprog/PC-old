import { CheckDataSizes, MaxSize } from "../utils/MaxSizeDecorator";
import { MAX_IMMEDIATE_SIZE, MAX_REGISTER_SERIAL_NUMBER_SIZE, WorkMode } from "../constants";
import { Device } from "../Device";
import { MaxBitsLimitError } from "../errors";
import { getBitsNumber } from "../utils/getBitsNumber";

export class Register extends Device implements IRegisterDevice {
    private data: number = 0;
    private serialNumber: number;
    private serialNumberSize: number;

    /**
     * Create instance of register
     * @param serialNumber number - needed for using this register with commands that require register
     * @param serialNumberSize  - registers may be have different sizes depending on the role
     */
    constructor(serialNumber: number, serialNumberSize = MAX_REGISTER_SERIAL_NUMBER_SIZE) {
        super();
        this.serialNumberSize = serialNumberSize;
        this.serialNumber = NaN;
        this.setSerialNumber(serialNumber);
    }

    @CheckDataSizes
    public setData(@MaxSize(MAX_IMMEDIATE_SIZE) data: number): void {
        super.actionGuard(WorkMode.WRITE);

        this.data = data;
    }

    public getData(): number {
        super.actionGuard(WorkMode.READ);

        return this.data;
    }
    
    public setSerialNumber(serialNumber: number): void {
        const serialNumberSize = getBitsNumber(serialNumber);
        if (serialNumberSize > this.serialNumberSize) {
            throw new MaxBitsLimitError(this.serialNumberSize);
        }

        this.serialNumber = serialNumber;
    }

    public getSerialNumber(): number {
        return this.serialNumber;
    }

}