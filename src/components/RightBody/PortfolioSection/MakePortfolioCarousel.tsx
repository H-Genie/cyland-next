import { Settings } from "react-slick";
import Carousel from "../common/Carousel";
import type { Portfolio } from "types/portfolio";
import Image from "next/image";

export default function MakePortfolioCarousel({
  portfolioData
}: {
  portfolioData: Portfolio[];
}) {
  const sliderContents = portfolioData.map(item => (
    <div key={item.name}>
      <Image src={item.thumbnail} alt={item.name} width={400} height={225} />
    </div>
  ));
  const setting: Settings = {
    dots: true
  };

  return <Carousel sliderContents={sliderContents} setting={setting} />;
}
