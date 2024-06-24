export class SortApiUtil {
  public static sortById<T extends { id: number }>(first: T, second: T): number {
    return first.id - second.id;
  }
}
