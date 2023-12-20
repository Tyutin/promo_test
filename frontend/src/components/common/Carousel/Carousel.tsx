'use client';
import Slider, { Settings } from 'react-slick';
import Image from 'next/image';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.scss';

function SampleNextArrow(props: any) {
  const { style, onClick, isNext } = props;
  return (
    <Image
      quality={100}
      width={30}
      height={40}
      src={
        isNext
          ? '/images/svg/slide-arrow-right.svg'
          : '/images/svg/slide-arrow-left.svg'
      }
      alt=""
      style={{ ...style, display: 'block' }}
      className={isNext ? 'arrow-next' : 'arrow-prev'}
      onClick={onClick}
    />
  );
}

const carouselDefaultSettings: Settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  nextArrow: <SampleNextArrow isNext={true} />,
  prevArrow: <SampleNextArrow />,
  swipe: false,
  lazyLoad: 'progressive',
};

export default function Carousel(props: {
  settings?: Settings;
  children: React.ReactNode[];
}) {
  const { settings, children } = props;
  const settingsToSlider: Settings = {
    ...carouselDefaultSettings,
    ...settings,
    slidesToShow: children.length > 4 ? 4 : children.length,
  };
  return (
    <div className="carousel">
      <Slider {...settingsToSlider}>
        {...children}
        {/* {children.map((child, index) => {
          return (
            <div className="carousel__item" key={index}>
              {child}
            </div>
          );
        })} */}
      </Slider>
    </div>
  );
}
