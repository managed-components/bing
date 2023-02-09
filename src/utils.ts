/**
 * Removes properties with null or undefined values
 * @param obj Any object
 */
export const omitNullish = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {}

  for (const prop in obj) {
    const value = obj[prop]
    if (!(value === null || value === undefined)) {
      newObj[prop] = value
    }
  }

  return newObj
}
