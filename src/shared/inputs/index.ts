export type TInputChange<T> = {
  target: {
    name: string,
    value?: T
  }
}

export const createInputChange = <T>(name: string | undefined, value: T): TInputChange<T> => {
  return {
    target: {name: name || '', value}
  }
}