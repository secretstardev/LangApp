import { MaterialsListCard } from '@app/libs/pages/content/components/materials-list-page/materials-list-page.model';
import { FiltersConfig } from '@app/libs/features/materials/filters/filters.model';

export const materialsCardPageConfig: MaterialsListCard[] = [
  {
    type: 'button',
    text: 'Watch video',
    customClass: 'materials-list-item-button flex-1 lg:flex-none py-3 px-8',
    actionName: 'goToVideo'
  },
  {
    type: 'button',
    text: 'Remove from feed',
    mobileText: 'Remove',
    customClass: 'materials-list-item-button p-button-secondary flex-1 lg:flex-none py-3 px-8',
    actionName: 'removeFromFeed'
  },
];


export const materialsListPageFilterConfig: FiltersConfig = {
  defaults: {
    defaultPerPage: 20,
  },
  fields: [
    {
      type: 'multiSelect',
      filterKey: 'categoryId',
    },
    {
      filterKey: 'level',
    },
    {
      filterKey: 'length',
    },
    {
      filterKey: 'sort',
    },
    {
      filterKey: 'titleLang',
    },
    {
      filterKey: 'isStudied',
    },
  ]
};
