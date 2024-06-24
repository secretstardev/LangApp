export class ObjectUtils {
  public static removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.entries(obj)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .reduce((newObj, [key, value]) => {
        (newObj as any)[key] = value;
        return newObj;
      }, {} as Partial<T>);
  }
}
