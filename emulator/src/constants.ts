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

export enum Commands {
    SET = 0b000000,
    MOV = 0b000001,
    RD  = 0b000010,
    WT  = 0b000011,
    ADD = 0b000100,
    SUB = 0b000101,
    CON = 0b000110,
    DIS = 0b000111,
    NEG = 0b001000,
    COM = 0b001001,
    JMP = 0b001010,
    CJM = 0b001011,
    END = 0b001100,
    IN  = 0b001101,
    OUT = 0b001110,
}