declare global {
    interface IDevice<Mode = WorkMode> {
        setWorkStatus(status: boolean): void;
        getWorkStatus(): boolean;
        setMode(mode: Mode): void;
        getMode(): Mode | undefined;
        enable(): void;
        disable(): void;
    }

    interface IMemoryDevice extends IDevice {
        setData(data: number, address: number): void;
        getData(address: number): number;
    }

    interface IRegisterDevice extends IDevice {
        setData(data: number);
        getData(): number;
        setSerialNumber(serialNumber: number): void;
        getSerialNumber(): number;
    }

    interface IALU extends IDevice<ALUMode> {
        getResult(a: number, b: number): number;
        getFlags(a: number, b: number, result: number): number;
    }

    interface ICounterDevice {
        handleTick(): void;
        setValue(value: number): void;
        getValue(): number;
        getMaxBitsNumber(): number;
    }
}

export {}