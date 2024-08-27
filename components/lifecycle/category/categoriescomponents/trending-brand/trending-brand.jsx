import Brand from "./brand";
import bourjois from "/public/lifecycle/trending brands/bourjois.png";
import bourjoisLogo from "/public/lifecycle/trending brands/bourjois.svg";
import kerastase from "/public/lifecycle/trending brands/kerastase.png";
import kerastaseLogo from "/public/lifecycle/trending brands/kerastase.svg";
import maxfactor from "/public/lifecycle/trending brands/maxfactor.png";
import maxfactorLogo from "/public/lifecycle/trending brands/maxfactor.svg";
import rimmle from "/public/lifecycle/trending brands/rimmel.png";
import rimmleLogo from "/public/lifecycle/trending brands/rimmel.svg";
import Container from "../../../../container";
import Text from "../../../../ui/Text";

const brands = [
  {
    img: bourjois,
    logo: bourjoisLogo,
  },
  {
    img: kerastase,
    logo: kerastaseLogo,
  },
  {
    img: maxfactor,
    logo: maxfactorLogo,
  },
  {
    img: rimmle,
    logo: rimmleLogo,
  },
];

export default function TrendingBrand() {
  return (
    <>
      <Container className="flex flex-col gap-10 my-24">
        <Text style={"h1"} className="uppercase">
          trending brands
        </Text>
        <div className="flex flex-row space-x-6 overflow-x-auto">
          {brands.map((brand, index) => (
            <Brand key={index} img={brand.img} logo={brand.logo} />
          ))}
        </div>
      </Container>
    </>
  );
}
