/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { UISize } from './towify-gallery.type';

export class TowifyGalleryUtil {
  static getUISizeValueString(size: UISize) {
    if (size.unit === 'fit-content' || size.unit === 'unset' || size.unit === 'auto') {
      return '0px';
    }
    return `${size.value}${size.unit}`;
  }
}
