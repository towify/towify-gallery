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
    return this.sanitized.bypassSecurityTrustResourceUrl(image);
  }

}
