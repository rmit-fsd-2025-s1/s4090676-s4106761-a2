// AI gen 6/6/25
export type OmitDeep<T, K extends string> = T extends readonly (infer U)[]
  ? OmitDeep<U, K>[]
  : T extends object
    ? {
        [P in keyof T as P extends K ? never : P]: OmitDeep<T[P], K>
      }
    : T
