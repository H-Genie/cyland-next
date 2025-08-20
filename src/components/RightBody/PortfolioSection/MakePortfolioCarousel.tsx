import { Settings } from "react-slick";
import { portfolio } from "constants/portfolios";
import Carousel from "../common/Carousel";

export default function MakePortfolioCarousel() {
  const sliderContents = portfolio.map(item => (
    <div key={item.name}>
      <img src={item.thumbnail} alt={item.name} />
    </div>
  ));
  const setting: Settings = {
    dots: true
  };

  return <Carousel sliderContents={sliderContents} setting={setting} />;
}
