import Carousel from "../common/Carousel";
import travelLists from "constants/travelLists";

export default function MakeStoryCarousel() {
  const sliderContents = travelLists.map(item => (
    <div key={item.city}>
      <img src={`./images/story/${item.city}.jpg`} alt={item.city} />
      <h6>{item.description}</h6>
    </div>
  ));

  return <Carousel sliderContents={sliderContents} />;
}
