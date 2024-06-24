import { ContentAttribute } from '@app/libs/core/models';
import { ContentAttributeUpdate } from '@app/libs/core/models/features/content/content-attribute-update.model';

export class AttributeHelper {
  public static getNewAttributeValues(modifyAttribute: ContentAttributeUpdate, oldAttributes: ContentAttribute): ContentAttribute {
    switch (modifyAttribute.attribute) {
      case 'isStudied':
        return {
          ...oldAttributes,
          isStudied: modifyAttribute.value,
        };
      case 'isHidden':
        return {
          ...oldAttributes,
          isHidden: modifyAttribute.value,
        };
    }
  }
}
