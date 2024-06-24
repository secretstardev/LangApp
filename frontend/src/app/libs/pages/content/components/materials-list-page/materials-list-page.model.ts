export interface MaterialsListCard {
  type: MaterialsListCardTypes;
  customClass?: string;
  text?: string;
  mobileText?: string;
  actionName?: string;
}

export type MaterialsListCardTypes = 'button';
