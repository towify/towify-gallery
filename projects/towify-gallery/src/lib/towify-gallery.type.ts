/*
 * @Author: allen
 * @Date: 2023/3/13
*/

type GalleryType = {
  type: 'thumb' | 'slider' | 'column' | 'row' | 'grid';
  style: {
    thumb?: {
      position: 'top' | 'left' | 'right' | 'bottom';
      size: UISize;
    };
    autoPlay?: boolean;
    gap: UISize;
    ratio: '16:9' | '4:3' | '1:1' | '3:4' | '9:16';
    paginator?: {
      display: boolean;
      theme: 'dark' | 'light';
    };
    objectFit: 'contain' | 'cover';
  };
  resources: string[];
};

type UISize = {
  value: number;
  unit: SizeUnit;
  locked?: boolean;
  dynamic?: string;
  isSafeArea?: boolean;
};

enum SizeUnit {
  PX = "px",
  Percent = "%",
  Unset = "unset",
  Auto = "auto",
  Fit = "fit-content",
  VW = "vw",
  VH = "vh",
  CQW = "cqw"
}

export { UISize, SizeUnit, GalleryType };
