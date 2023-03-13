import { Component, HostListener, ViewChild } from '@angular/core';
import { GalleryType, TowifyGalleryComponent } from '../../../towify-gallery/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'staff';

  galleryInfo: GalleryType = {
    type: 'thumb',
    style: {
      thumb: {
        position: 'bottom',
        size: {
          value: 100,
          unit: 'px'
        }
      },
      autoPlay: false,
      gap: {
        value: 10,
        unit: 'px'
      },
      ratio: '1:1',
      paginator: {
        display: true,
        theme: 'light'
      },
      objectFit: 'cover'
    },
    resources: [
      'https://resource-official.towify.com/9f733a70-aa4f-11ec-bf61-09d4b11921f8',
      'https://resource-official.towify.com/8a7403c0-aa4f-11ec-bf61-09d4b11921f8',
      'https://resource-official.towify.com/78e821e0-aa4f-11ec-bf61-09d4b11921f8',
      'https://resource-official.towify.com/376e3330-aa4f-11ec-a6c5-5501aac2a00f',
      'https://resource-official.towify.com/2296a8c0-aa4f-11ec-bf61-09d4b11921f8'
    ]
  }

  imageList = [
    'https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img2.baidu.com/it/u=1003272215,1878948666&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    'https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img2.baidu.com/it/u=1003272215,1878948666&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    'https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
  ]

  @ViewChild('galleryComponent', { read: TowifyGalleryComponent, static: true })
  galleryComponent!: TowifyGalleryComponent;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.galleryComponent.layout();
  }
}
