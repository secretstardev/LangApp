export interface TableSelectionState<T> {
  includedIds: number[];
  excludedIds: number[];
  selectedAll: boolean;
  entities: T[];
}

export interface TableSelectionTotalState {
  includedIds: number[];
  excludedIds: number[];
  selectedAll: boolean;
  total: number;
}
