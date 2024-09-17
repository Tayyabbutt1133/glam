import Container from "../../../../container";
import Text from "../../../../ui/Text";
import Image from "next/image";
import { jost } from "../../../../ui/fonts";

import bourjois from "/public/lifecycle/makeup picks/bourjois.png";
import clinique from "/public/lifecycle/makeup picks/clinique.png";
import bobbi_brown from "/public/lifecycle/makeup picks/bobbi brown.png";
import mac from "/public/lifecycle/makeup picks/mac.png";
import Button from "../../../../ui/button";

const makeupPicks = [
  {
    title: "Bourjois",
    description: "Bourjois 123 Perfect Liquid Foundation 30ml",
    image: bourjois,
  },
  {
    title: "Clinique",
    description: "Clinique Chubby Stick Moisturising Lip Colour Balm 3g",
    image: clinique,
  },
  {
    title: "Bobbi Brown",
    description: "Bobbi Brown Vitamin Enriched Eye Base 15ml",
    image: bobbi_brown,
  },
  {
    title: "MAC",
    description: "MAC Prep + Prime Fix+ Finishing Mist Lavender 100ml",
    image: mac,
  },
];

const SingleMakeupPick = ({ data }) => {
  const { title, description, image } = data;
  return (
    <div className="flex flex-col items-start gap-5 h-full">
      <div className=" aspect-square w-full flex items-center justify-center relative">
        <Image
          src={image}
          alt={title}
          fill
          className=" brightness-75 md:brightness-100"
        />
        <Text style="h4" className="font-semibold md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          {title}
        </Text>
      </div>

      <div className="flex-grow flex flex-col gap-3 items-start justify-start">
        <Text style="h3" className="font-semibold hidden md:block">
          {title}
        </Text>
        <Text style="sm" className=" line-clamp-2 sm:line-clamp-3">
          {description}
        </Text>
      </div>

      <div className="mt-auto hidden md:block">
        <button
          className={`text-base font-medium uppercase text-white px-[15px] py-[13px] bg-button hover:bg-hover rounded-lg ${jost.className} `}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default function MakeupPicks() {
  return (
    <Container className="space-y-10 mb-14">
      <Text style="h1" className="uppercase">Makeup Picks</Text>
      {/* makeup items */}

      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {makeupPicks.map((makeupPick, index) => (
            <div key={index} className="w-40 sm:w-72 flex-shrink-0">
              <SingleMakeupPick data={makeupPick} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
