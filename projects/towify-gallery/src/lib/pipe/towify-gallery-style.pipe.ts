/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { Pipe, PipeTransform } from '@angular/core';
import { Component } from '@towify-types/dsl';
import GalleryType = Component.Property.GalleryType;
import { TowifyGalleryUtil } from '../towify-gallery.util';

@Pipe({
  name: 'towifyGalleryStyle'
})
export class TowifyGalleryStylePipe implements PipeTransform {

  transform(galleryInfo?: GalleryType): {} {
    if (!galleryInfo || galleryInfo.type !== 'thumb' || !galleryInfo.style.thumb) return {};
    const sizeValue = TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.thumb.size);
    let templateRows = `auto ${sizeValue}`;
    let templateColumns = '100%'
    switch (galleryInfo.style.thumb.position) {
      case 'top':
        templateRows = `${sizeValue} auto`;
        break;
      case 'right':
        templateColumns = `auto ${sizeValue}`;
        templateRows = '100%';
        break;
      case 'left':
        templateColumns = `${sizeValue} auto`;
        templateRows = '100%';
        break
      default:
        break;
    }
    return {
      'grid-gap': TowifyGalleryUtil.getUISizeValueString(galleryInfo.style.gap),
      'grid-template-rows': templateRows,
      'grid-template-columns': templateColumns
    };
  }

}
