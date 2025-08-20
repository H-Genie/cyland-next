import { ReactElement, JSXElementConstructor } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

type SliderContentsProps = {
  sliderContents:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | JSX.Element[];
  setting?: object | null;
};

export default function Carousel({
  sliderContents,
  setting
}: SliderContentsProps) {
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    ...setting
  };

  return <StyledSlider {...settings}>{sliderContents}</StyledSlider>;
}

const StyledSlider = styled(Slider)`
  width: 400px;

  .slick-prev,
  .slick-next {
    z-index: 1;
  }

  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #f1f1f1;
  }

  img {
    width: 100%;
  }
  h6 {
    text-align: center;
  }
`;
