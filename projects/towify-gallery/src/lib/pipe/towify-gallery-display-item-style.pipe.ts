/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { Pipe, PipeTransform } from '@angular/core';
import { Component } from '@towify-types/dsl';
import GalleryType = Component.Property.GalleryType;

@Pipe({
  name: 'towifyGalleryDisplayItemStyle'
})
export class TowifyGalleryDisplayItemStylePipe implements PipeTransform {

  transform(galleryInfo?: GalleryType): {} {
    if (!galleryInfo) return {};
    if (galleryInfo.type === 'grid' || galleryInfo.type === 'column' || galleryInfo.type === 'row') {
      if (galleryInfo.type === 'column') return {
        height: '100%'
      }
      return {
        width: '100%',
        display: 'grid',
        'grid-template-columns': '100%'
      };
    }
    return {
      height: '100%',
      width: '100%',
      display: 'grid',
      'grid-template-columns': '100%',
      'grid-template-rows': '100%'
    }
  }

}
