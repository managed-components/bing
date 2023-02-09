export const omitOne = (obj: Record<string, any>, key: string) => {
  const { [key]: omitted, ...rest } = obj
  return rest
}
