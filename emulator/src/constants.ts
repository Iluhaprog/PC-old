export const MAX_MEMORY_SIZE = 4095;

export const MAX_ADDRESS_SIZE = 12;
export const MAX_REGISTER_SERIAL_NUMBER_SIZE = 4;
export const MAX_OPCODE_SIZE = 6;
export const MAX_IMMEDIATE_SIZE = 8;
export const MAX_FLAG_SIZE = 4;
export const MAX_MICRO_COMMANDS_SIZE = 6;

export enum WorkMode {
    READ = 1,
    WRITE = 0
}

export enum ALUMode {
    SUM = 0,
    DIFF = 1,
    RSH = 2, // right shift
    LSH = 3, // left shift
    CON = 4, // conjunction
    DIS = 5, // disjunction
    NEG = 6 // negation
}

export enum Flags {
    A_EQUAL_B = 0b1000,
    A_LESS_B = 0b0100,
    A_MORE_B = 0b0010,
    RESULT_IS_NULL = 0b0001
}