/*
 * @Author: allen
 * @Date: 2023/3/9
 */

import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { GalleryType } from './towify-gallery.type';

@Component({
  selector: 'towify-gallery',
  templateUrl: './towify-gallery.component.html',
  styleUrls: ['./towify-gallery.component.scss'],
})
export class TowifyGalleryComponent implements OnChanges {
  @ViewChild('contentContainer', { read: ElementRef, static: true })
  displayContainer!: ElementRef;

  @Input()
  data: string[] = [];

  @Input()
  config?: GalleryType;

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
  viewIndex = 2;
  isCurrentView = false;
  viewTransition?: string;
  viewTranslateX = 0;
  #isDragMove = false;

  computeDragRenderPos = () => {
    return { x: this.#containerRect.x, y: this.#containerRect.y };
  };

  constructor() {
    this.#containerRect = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    };
    this.#startX = 0;
    this.#translateXBackup = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    const { config, imageList } = changes;
    if (config) {
      if (!this.data.length) {
        this.data = this.config!.resources;
      }
      this.currentIndex = 0;
    }
    if (imageList) {
      this.currentIndex = 0;
    }
  }

  layout() {
    this.#updateTranslateX(
      (this.displayContainer.nativeElement as HTMLElement).clientWidth,
      this.currentIndex
    );
  }

  dragStart(data: CdkDragStart) {
    const swiperContainerRect = (
      this.displayContainer.nativeElement as HTMLElement
    ).getBoundingClientRect();
    this.#containerRect = {
      x: swiperContainerRect.x,
      y: swiperContainerRect.y,
      width: swiperContainerRect.width,
      height: swiperContainerRect.height,
    };
    if (this.config?.type !== 'thumb' && this.config?.type !== 'slider') {
      return;
    }
    if (data.event.type === 'mousemove') {
      this.#startX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      this.#startX = (<TouchEvent>data.event).touches[0].clientX;
    }
    this.#translateXBackup = this.translateX;
    this.animationTransition = undefined;
    this.isDragging = true;
    this.#isDragMove = true;
  }

  dragMove(data: CdkDragMove) {
    if (this.config?.type !== 'thumb' && this.config?.type !== 'slider') {
      return;
    }
    let moveX = -1;
    if (data.event.type === 'mousemove') {
      moveX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      moveX = (<TouchEvent>data.event).touches[0].clientX;
    }
    if (this.#startX === -1 || moveX === -1) {
      return;
    }
    if (this.currentIndex === 0 && moveX > this.#startX) {
      return;
    }
    if (this.currentIndex === this.data.length - 1 && moveX < this.#startX) {
      return;
    }
    if (Math.abs(moveX - this.#startX) > this.#containerRect.width) {
      return;
    }
    this.translateX = this.#translateXBackup + moveX - this.#startX;
  }

  dragEnd() {
    if (this.config?.type !== 'thumb' && this.config?.type !== 'slider') {
      this.#startX = -1;
      this.isDragging = false;
      return;
    }
    if (Math.abs(this.translateX - this.#translateXBackup) > 5) {
      this.moveScrollViewByIndex(
        this.translateX - this.#translateXBackup < 0
          ? this.currentIndex + 1
          : this.currentIndex - 1
      );
    } else {
      this.translateX = this.#translateXBackup;
    }
    this.#startX = -1;
    this.isDragging = false;
  }

  moveScrollViewByIndex(index: number) {
    if (index < 0 || index > this.data.length - 1) {
      return;
    }
    this.#updateTranslateX(
      (this.displayContainer.nativeElement as HTMLElement).clientWidth,
      index
    );
    this.animationTransition = 'all 0.5s';
    this.#prepareIndex = index;
  }

  transitionend() {
    this.currentIndex = this.#prepareIndex;
    this.animationTransition = undefined;
  }

  onContentViewByIndex(index: number) {
    if (this.#isDragMove) {
      this.#isDragMove = false;
      return
    }
    this.viewIndex = index;
    this.isCurrentView = true;
  }

  closeContentContainerView() {
    if (this.#isDragMove) {
      this.#isDragMove = false;
      return
    }
    this.isCurrentView = false;
  }

  onLightBoxTransitionEnd() {
    this.viewIndex = this.#prepareIndex;
    this.viewTransition = undefined;
    this.viewTranslateX = 0;
  }

  onLightBoxDragStart(data: CdkDragStart) {
    this.#containerRect = {
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    if (data.event.type === 'mousemove') {
      this.#startX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      this.#startX = (<TouchEvent>data.event).touches[0].clientX;
    }
    this.viewTransition = undefined;
    this.viewTranslateX = 0;
    this.isDragging = true;
    this.#isDragMove = true;
  }

  onLightBoxDragMove(data: CdkDragMove) {
    let moveX = -1;
    if (data.event.type === 'mousemove') {
      moveX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      moveX = (<TouchEvent>data.event).touches[0].clientX;
    }
    if (this.#startX === -1 || moveX === -1) {
      return;
    }
    if (this.viewIndex === 0 && moveX > this.#startX) {
      return;
    }
    if (this.viewIndex === this.data.length - 1 && moveX < this.#startX) {
      return;
    }
    if (Math.abs(moveX - this.#startX) > this.#containerRect.width) {
      return;
    }
    this.viewTranslateX = moveX - this.#startX;
  }

  onLightBoxDragEnd() {
    if (Math.abs(this.viewTranslateX) > 5) {
      if (this.viewTranslateX > 0) {
        this.#prepareIndex = this.viewIndex - 1;
        this.viewTranslateX = this.#containerRect.width + 20;
      } else {
        this.#prepareIndex = this.viewIndex + 1;
        this.viewTranslateX = 0 - this.#containerRect.width - 20;
      }
      this.viewTransition = 'all 0.5s';
    } else {
      this.viewTranslateX = 0;
      this.#prepareIndex = this.viewIndex;
      this.viewTransition = undefined;
    }
    this.#startX = -1;
    this.isDragging = false;
  }

  #updateTranslateX(containerWidth: number, index: number) {
    const gap =
      (this.config?.style.gap.unit === 'unset'
        ? 0
        : this.config?.style.gap.value) ?? 0;
    this.translateX = 0 - (containerWidth + gap) * index;
  }
}
