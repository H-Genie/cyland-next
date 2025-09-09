import { Settings } from "react-slick";
import Carousel from "../common/Carousel";

interface MakePortfolioCarouselProps {
  portfolioData: any[];
}

export default function MakePortfolioCarousel({
  portfolioData
}: MakePortfolioCarouselProps) {
  const sliderContents = portfolioData.map(item => (
    <div key={item.name}>
      <img src={item.thumbnail} alt={item.name} />
    </div>
  ));
  const setting: Settings = {
    dots: true
  };

  return <Carousel sliderContents={sliderContents} setting={setting} />;
}
