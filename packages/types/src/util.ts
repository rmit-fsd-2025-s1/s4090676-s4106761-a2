// AI gen 25/5/25
export type OmitDeep<T, K extends string> = T extends object
  ? {
      [P in keyof T as P extends K ? never : P]: T[P] extends object
        ? OmitDeep<T[P], K>
        : T[P]
    }
  : T
