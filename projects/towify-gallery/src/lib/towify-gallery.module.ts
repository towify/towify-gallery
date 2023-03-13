/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { NgModule } from '@angular/core';
import { TowifyGalleryComponent } from './towify-gallery.component';
import { TowifyGalleryStylePipe } from './pipe/towify-gallery-style.pipe';
import { TowifyGalleryThumbStylePipe } from './pipe/towify-gallery-thumb-style.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TowifyGalleryImageSourcePipe } from './pipe/towify-gallery-image-source.pipe';
import { TowifyGalleryDisplayItemStylePipe } from './pipe/towify-gallery-display-item-style.pipe';
import { TowifyGalleryDisplayImageStylePipe } from './pipe/towify-gallery-display-image-style.pipe';
import { TowifyGalleryDisplayScrollStylePipe } from './pipe/towify-gallery-display-scroll-style.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    TowifyGalleryComponent,
    TowifyGalleryStylePipe,
    TowifyGalleryThumbStylePipe,
    TowifyGalleryImageSourcePipe,
    TowifyGalleryDisplayItemStylePipe,
    TowifyGalleryDisplayImageStylePipe,
    TowifyGalleryDisplayScrollStylePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
    NgOptimizedImage,
  ],
  exports: [TowifyGalleryComponent]
})
export class TowifyGalleryModule { }
