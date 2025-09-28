import { Settings } from "react-slick";
import Carousel from "../common/Carousel";
import type { Portfolio } from "types/portfolio";

export default function MakePortfolioCarousel({
  portfolioData
}: {
  portfolioData: Portfolio[];
}) {
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
