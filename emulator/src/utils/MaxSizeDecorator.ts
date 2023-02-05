import "reflect-metadata"
import { MaxBitsLimitError } from "../errors";
import { getBitsNumber } from "./getBitsNumber";

const MAX_SIZE_KEY = Symbol('max-size');

type ParamIndex = number;
type MaxSize = number;

export function MaxSize(maxSize: number) {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const valuesForMaxSizeCheck: Map<ParamIndex, MaxSize> = Reflect.getOwnMetadata(MAX_SIZE_KEY, target, propertyKey) || new Map<ParamIndex, MaxSize>();
        valuesForMaxSizeCheck.set(parameterIndex, maxSize);
        Reflect.defineMetadata(MAX_SIZE_KEY, valuesForMaxSizeCheck, target, propertyKey);
    }
}


export function CheckDataSizes(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(...values: number[]) => any>) {
    let method = descriptor.value!;
    
    descriptor.value = function () {
        const valuesForMaxSizeCheck: Map<ParamIndex, MaxSize> = Reflect.getOwnMetadata(MAX_SIZE_KEY, target, propertyName);

        if (valuesForMaxSizeCheck) {
            for(const [paramIndex, maxSize] of valuesForMaxSizeCheck) {
                const currentValue = arguments[paramIndex];

                const valueSize = getBitsNumber(currentValue);

                if (valueSize > maxSize) {
                    throw new MaxBitsLimitError(maxSize);
                }
            }
        }
        
        return method.apply(this, [...arguments]);
    };
}