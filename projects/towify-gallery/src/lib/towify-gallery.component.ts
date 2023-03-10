/*
 * @Author: allen
 * @Date: 2023/3/9
*/

import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Towify from '@towify-types/dsl';
import { SizeUnit } from '@towify/common-values';
import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'towify-gallery',
  templateUrl: './towify-gallery.component.html',
  styleUrls: ['./towify-gallery.component.scss']
})
export class TowifyGalleryComponent implements OnInit, OnChanges {

  @ViewChild('displayContainer', { read: ElementRef, static: true })
  displayContainer!: ElementRef;

  @Input()
  imageList: string[] = [];

  @Input()
  galleryType?: Towify.Component.Property.GalleryType

  #prepareIndex = 0;
  currentIndex = 0;
  animationTransition?: string;
  translateX = 0;
  isDragging = false;

  #containerRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  #startX;
  #translateXBackup;


  displayIndex = 2;
  isDisplayView = false;
  displayTransition?: string
  displayTranslateX = 0;


  computeDragRenderPos = () => {
    return { x: this.#containerRect.x, y: this.#containerRect.y };
  };

  constructor() {
    this.#containerRect = {
      x: 0,
      y: 0,
      width: 1,
      height: 1
    };
    this.#startX = 0;
    this.#translateXBackup = 0;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { galleryType, imageList } = changes;
    if (galleryType) {
      if (!this.imageList.length) {
        this.imageList = this.galleryType!.resources;
      }
      this.currentIndex = 0;
    }
    if (imageList) {
      this.currentIndex = 0;
    }
  }

  dragStart(data: CdkDragStart) {
    const swiperContainerRect = (
      this.displayContainer.nativeElement as HTMLElement
    ).getBoundingClientRect();
    this.#containerRect = {
      x: swiperContainerRect.x,
      y: swiperContainerRect.y,
      width: swiperContainerRect.width,
      height: swiperContainerRect.height
    };
    if (this.galleryType?.type !== 'thumb' && this.galleryType?.type !== 'slider') return;
    if (data.event.type === 'mousemove') {
      this.#startX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      this.#startX = (<TouchEvent>data.event).touches[0].clientX;
    }
    this.#translateXBackup = this.translateX;
    this.animationTransition = undefined;
    this.isDragging = true;
  }

  dragMove(data: CdkDragMove) {
    if (this.galleryType?.type !== 'thumb' && this.galleryType?.type !== 'slider') return;
    let moveX = -1;
    if (data.event.type === 'mousemove') {
      moveX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      moveX = (<TouchEvent>data.event).touches[0].clientX;
    }
    if (this.#startX === -1 || moveX === -1) return;
    if (this.currentIndex === 0 && moveX > this.#startX) return;
    if (this.currentIndex === this.imageList.length - 1 && moveX < this.#startX) return;
    if (Math.abs(moveX- this.#startX) > this.#containerRect.width) return;
    this.translateX = this.#translateXBackup + moveX- this.#startX;
  }

  dragEnd() {
    if (this.galleryType?.type !== 'thumb' && this.galleryType?.type !== 'slider') {
      this.#startX = -1;
      this.isDragging = false;
      return;
    }
    if (Math.abs(this.translateX - this.#translateXBackup) > 5) {
      this.moveScrollViewByIndex(this.translateX - this.#translateXBackup < 0 ? this.currentIndex + 1 : this.currentIndex - 1);
    } else {
      this.translateX = this.#translateXBackup;
    }
    this.#startX = -1;
    this.isDragging = false;
  }

  moveScrollViewByIndex(index: number) {
    if (index < 0 || index > this.imageList.length - 1) return;
    const containerWidth = this.displayContainer.nativeElement.getBoundingClientRect().width;
    const gap =
      (this.galleryType?.style.gap.unit === SizeUnit.Unset
        ? 0
        : this.galleryType?.style.gap.value) ?? 0;
    this.translateX = 0 - (containerWidth + gap) * index;
    this.animationTransition = 'all 0.5s';
    this.#prepareIndex = index;
  }

  transitionend() {
    this.currentIndex = this.#prepareIndex;
    this.animationTransition = undefined;
  }

  displayViewByIndex(index: number) {
    if (this.animationTransition) return;
    this.displayIndex = index;
    this.isDisplayView = true;
  }


  closeDisplayView() {
    if (this.displayTransition) return;
    this.isDisplayView = false;
  }

  displayTransitionEnd() {
    this.displayIndex = this.#prepareIndex;
    this.displayTransition = undefined;
    this.displayTranslateX = 0;
  }

  displayDragStart(data: CdkDragStart) {
    this.#containerRect = {
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
    if (data.event.type === 'mousemove') {
      this.#startX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      this.#startX = (<TouchEvent>data.event).touches[0].clientX;
    }
    this.displayTransition = undefined;
    this.displayTranslateX = 0;
    this.isDragging = true;
  }

  displayDragMove(data: CdkDragMove) {
    let moveX = -1;
    if (data.event.type === 'mousemove') {
      moveX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      moveX = (<TouchEvent>data.event).touches[0].clientX;
    }
    console.log('drag move', this.#startX, moveX);
    if (this.#startX === -1 || moveX === -1) return;
    if (this.displayIndex === 0 && moveX > this.#startX) return;
    if (this.displayIndex === this.imageList.length - 1 && moveX < this.#startX) return;
    if (Math.abs(moveX- this.#startX) > this.#containerRect.width) return;
    this.displayTranslateX =  moveX- this.#startX;
    console.log('drag move 2', this.displayTranslateX);
  }

  displayDragEnd() {
    if (Math.abs(this.displayTranslateX) > 5) {
      if (this.displayTranslateX > 0) {
        this.#prepareIndex = this.displayIndex - 1;
        this.displayTranslateX = this.#containerRect.width + 20;
      } else {
        this.#prepareIndex = this.displayIndex + 1;
        this.displayTranslateX = 0 - this.#containerRect.width - 20;
      }
    } else {
      this.displayTranslateX = 0;
      this.#prepareIndex = this.displayIndex;
    }
    this.displayTransition = 'all 0.5s';
    this.#startX = -1;
    this.isDragging = false;
  }
}
