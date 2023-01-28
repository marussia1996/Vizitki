export const compare = (value: string, filter: string) => {
  return value.toString().toLowerCase().includes(filter.toString().toLowerCase());
}

export const delay = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
})