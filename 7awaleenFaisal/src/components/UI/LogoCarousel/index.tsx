import { useMemo, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./styles.module.css";
import { LogoCarouselProps } from "./types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";


const breakpoints = {
  0: {
    slidesPerView: 3.5,
    spaceBetween: 0,
  },
  414: {
    slidesPerView: 4.5,
    spaceBetween: 0,
  },
  768: {
    slidesPerView: 5.5,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 6.5,
    spaceBetween: 10,
  },
};

const LogoCarousel: React.FC<LogoCarouselProps> = ({
  logos,
  className = "",
  autoplayDelay = 900,
  slidesPerView = 5,
  spaceBetween = 30,
  loop = true,
  speed = 900,
  pauseOnHover = true,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  // Duplicate logos if needed for smooth looping
  const processedLogos = useMemo(() => {
    if (!logos) return [];
    
    const minSlidesNeeded = slidesPerView * 2; // Better for smooth infinite loop
    if (logos.length < minSlidesNeeded && loop) {
      // Calculate how many times we need to duplicate
      const multiplier = Math.ceil(minSlidesNeeded / logos.length);
      return Array(multiplier).fill(logos).flat();
    }
    return logos;
  }, [logos, slidesPerView, loop]);

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.logoCarouselContainer} ${className}`}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        speed={speed}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: pauseOnHover,
        }}
        breakpoints={breakpoints}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={styles.swiperContainer}
      >
        {processedLogos.map((logo, index) => (
          <SwiperSlide key={`${logo.id || index}-${index}`} className={styles.swiperSlide}>
            <div className={styles.logoWrapper}>
              <Image
                src={logo.image}
                alt={logo.alt || `logo-${index}`}
                className={styles.logoImage}
                priority={index < 3}
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default LogoCarousel