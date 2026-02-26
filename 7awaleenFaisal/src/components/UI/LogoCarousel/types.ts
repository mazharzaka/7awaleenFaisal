export interface LogoItem {
  image: string;
  title: string;
  width?: number;
  height?: number;
  length?: number;
}

export interface LogoCarouselProps {
  logos: LogoItem[];
  className?: string;
  autoplayDelay?: number;
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  speed?: number;
  breakpoints?: {
    [width: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
  pauseOnHover?: boolean;
}
