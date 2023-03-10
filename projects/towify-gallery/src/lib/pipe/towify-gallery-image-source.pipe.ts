/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'towifyGalleryImageSource'
})
export class TowifyGalleryImageSourcePipe implements PipeTransform {

  constructor(private readonly sanitized: DomSanitizer) {
  }

  transform(image: string, isThumb?: boolean, imageSize = 120) {
    let src = image;
    if (isThumb) {
      if (!(src.includes('file://') || src.includes('localhost'))) {
        if (src.includes('?image')) {
          src = src.split('?image')[0];
        }
        if (src.includes('q-sign')) {
          src = `${src}&imageMogr2/crop/${imageSize}x${imageSize}`;
        } else {
          src = `${src}?imageMogr2/crop/${imageSize}x${imageSize}`;
        }
      }
    }
    return this.sanitized.bypassSecurityTrustResourceUrl(src);
  }

}
