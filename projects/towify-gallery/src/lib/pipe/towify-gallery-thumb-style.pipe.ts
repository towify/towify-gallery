/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { Pipe, PipeTransform } from '@angular/core';
import { TowifyGalleryUtil } from '../towify-gallery.util';
import { GalleryType } from '../towify-gallery.type';

@Pipe({
  name: 'towifyGalleryThumbStyle'
})
export class TowifyGalleryThumbStylePipe implements PipeTransform {

  transform(imageList: string[], galleryInfo?: GalleryType): {} {
    if (!galleryInfo || galleryInfo.type !== 'thumb' || !galleryInfo.style.thumb) return {};
    let gridArea = '2/1/3/2';
    let overFlowY = 'hidden';
    let overFlowX = 'scroll';
    let templateRows = 'auto';
    const sizeValue = TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.thumb.size);
    let templateColumns = `repeat(${imageList.length ?? 1}, ${sizeValue})`;
    switch (galleryInfo.style.thumb.position) {
      case 'top':
        gridArea = '1/1/2/2';
        break;
      case 'right':
        gridArea = '1/2/2/3';
        overFlowX = 'hidden';
        overFlowY = 'scroll';
        templateRows = `repeat(${imageList.length ?? 1}, ${sizeValue})`;
        templateColumns = 'auto';
        break;
      case 'left':
        gridArea = '1/1/2/2';
        overFlowX = 'hidden';
        overFlowY = 'scroll';
        templateRows = `repeat(${imageList.length ?? 1}, ${sizeValue})`;
        templateColumns = 'auto';
        break
      default:
        break;
    }
    return {
      'grid-gap': TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.gap),
      'grid-area': gridArea,
      'grid-template-rows': templateRows,
      'grid-template-columns': templateColumns,
      'overflow-y': overFlowY,
      'overflow-x': overFlowX
    };
  }

}
