/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { Pipe, PipeTransform } from '@angular/core';
import { Component } from '@towify-types/dsl';
import GalleryType = Component.Property.GalleryType;

@Pipe({
  name: 'towifyGalleryDisplayImageStyle'
})
export class TowifyGalleryDisplayImageStylePipe implements PipeTransform {

  transform(galleryInfo?: GalleryType): {} {
    if (!galleryInfo) return {};
    let ratio;
    if (galleryInfo.type === 'grid' || galleryInfo.type === 'column' || galleryInfo.type === 'row') {
      switch (galleryInfo.style.ratio) {
        case '1:1':
          ratio = '1';
          break;
        case '3:4':
          ratio = ' 3 / 4';
          break;
        case '4:3':
          ratio = '4 / 3';
          break;
        case '9:16':
          ratio = '9 / 16';
          break;
        case '16:9':
          ratio = '16 / 9';
          break;
        default:
          ratio = undefined;
      }
    }
    if (ratio) {
      return {
        width: galleryInfo.type === 'column' ? 'unset' : '100%',
        height: galleryInfo.type === 'column' ? '100%' : 'unset',
        'pointer-events': 'none',
        'aspect-ratio': ratio,
        'object-fit': galleryInfo.style.objectFit
      };
    }
    return {
      width: '100%',
      height: '100%',
      'pointer-events': 'none',
      'object-fit': galleryInfo.style.objectFit
    }
  }

}
