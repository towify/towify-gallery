/*
 * @Author: allen
 * @Date: 2023/3/9
*/


import { SizeUnit, UISize } from '@towify/common-values';

export class TowifyGalleryUtil {
  static getUISizeValueString(size: UISize) {
    if (size.unit === SizeUnit.Fit || size.unit === SizeUnit.Unset || size.unit === SizeUnit.Auto) {
      return '0px';
    }
    return `${size.value}${size.unit}`;
  }
}
