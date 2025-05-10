// return the type in Array<type>, or if it is not an array return the type
export type ItemOfArray<T> = T extends (infer U)[] ? U : T;
