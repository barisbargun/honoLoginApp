export const hasEnumList = <T>(value: number, list: any) => {
  return Object.values(list).includes(value as typeof list);
}