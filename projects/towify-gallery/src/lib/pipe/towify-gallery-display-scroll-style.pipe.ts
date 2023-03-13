/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { Pipe, PipeTransform } from '@angular/core';
import { GalleryType  } from '../towify-gallery.type';
import { TowifyGalleryUtil } from '../towify-gallery.util';

@Pipe({
  name: 'towifyGalleryDisplayScrollStyle'
})
export class TowifyGalleryDisplayScrollStylePipe implements PipeTransform {

  transform(imageList: string[], galleryInfo?: GalleryType): {} {
    if (!galleryInfo) return {};
    switch (galleryInfo.type) {
      case 'thumb':
        return {
          gap: TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.gap),
          'grid-template-rows': '100%',
          'grid-template-columns': `repeat(${imageList.length ?? 1}, 100%)`,
          'overflow': 'visible',
          alignItems: 'center'
        }
      case 'slider':
        return {
          gap: TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.gap),
          'grid-template-rows': '100%',
          'grid-template-columns': `repeat(${imageList.length ?? 1}, 100%)`,
          'overflow': 'visible',
          alignItems: 'center'
        }
      case 'grid':
        const gapNumber =
          galleryInfo.style.gap.unit === 'fit-content' ||
          galleryInfo.style.gap.unit === 'unset' ||
          galleryInfo.style.gap.unit === 'auto'
            ? 0
            : galleryInfo.style.gap.value;
        return {
          gap: TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.gap),
          'grid-template-columns': `calc(50% - ${gapNumber / 2}px) calc(50% - ${gapNumber / 2}px)`,
          'grid-auto-rows': 'max-content',
          'overflow-y': 'auto',
          'overflow-x': 'hidden'
        }
      case 'column':
        return {
          gap: TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.gap),
          'grid-template-rows': '100%',
          'grid-auto-columns': 'max-content',
          'overflow-y': 'hidden',
          'overflow-x': 'auto',
          'grid-auto-flow': 'column'
        }
      case 'row':
        return {
          gap: TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.gap),
          'grid-template-columns': '100%',
          'grid-auto-rows': 'max-content',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
          'grid-auto-flow': 'unset'
        }
      default:
        break;
    }
    return {};
  }

}
