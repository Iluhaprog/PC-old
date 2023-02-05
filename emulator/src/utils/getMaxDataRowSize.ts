import { MAX_IMMEDIATE_SIZE, MAX_OPCODE_SIZE, MAX_REGISTER_SERIAL_NUMBER_SIZE } from "../constants";

/**
 * This function return size of max data row bits number (size) that calculated from next sizes:
 * 1. opcode size
 * 2. register size
 * 3. register size
 * 4. immediate size
 * @returns number
 */
export function getMaxDataRowSize (): number {
    return MAX_OPCODE_SIZE + MAX_REGISTER_SERIAL_NUMBER_SIZE + MAX_REGISTER_SERIAL_NUMBER_SIZE + MAX_IMMEDIATE_SIZE;
}