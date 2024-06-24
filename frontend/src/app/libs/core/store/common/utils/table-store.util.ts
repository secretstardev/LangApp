import { TableSelectionState, TableSelectionTotalState } from '../models';

export class TableStoreUtil {
  public static getSelectionEntities<T extends { id: number }>({ entities, selectedAll, includedIds, excludedIds }: TableSelectionState<T>): T[] {
    return selectedAll ? entities.filter((el) => !excludedIds.includes(el.id)) : (includedIds.map((id) => entities.find((el) => el.id === id)) as T[]);
  }

  public static getSelectionIds<T extends { id: number }>(params: TableSelectionState<T>): number[] {
    return TableStoreUtil.getSelectionEntities(params).map((el) => el.id);
  }

  public static selectionTotal({ selectedAll, includedIds, excludedIds, total }: TableSelectionTotalState): number {
    return selectedAll ? total - excludedIds?.length || 0 : includedIds.length || 0;
  }
}
