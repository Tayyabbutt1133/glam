import Container from "../../../container";
import Text from "../../../ui/Text";
import Image from "next/image";
import { jost } from "../../../ui/fonts";

import bourjois from "/public/lifecycle/makeup picks/bourjois.png";
import clinique from "/public/lifecycle/makeup picks/clinique.png";
import bobbi_brown from "/public/lifecycle/makeup picks/bobbi brown.png";
import mac from "/public/lifecycle/makeup picks/mac.png";
// import Button from "../../../../ui/button";

const NewPicks = [
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

const SingleNewPick = ({ data }) => {
  const { title, description, image } = data;
  return (
    <div className="flex flex-col items-start gap-5 h-full">
      <div className="w-full flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={390}
          height={390}
          className="w-[390px]"
        />
      </div>

      <div className="flex-grow flex flex-col gap-3 items-start justify-start">
        <Text style="h3" className="font-semibold">
          {title}
        </Text>
        <Text style="sm" className="line-clamp-3">
          {description}
        </Text>
      </div>

      <div className="mt-auto">
        <button
          className={`text-base font-medium uppercase text-white px-[15px] py-[13px] bg-button hover:bg-hover rounded-lg ${jost.className} `}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default function Newin() {
  return (
    <Container className="space-y-10 mb-14 mt-16">
      <h1 className={`font-semibold uppercase text-2xl ${jost.className}`}>New In</h1>
      {/* makeup items */}

      <div className="grid grid-cols-4 justify-between gap-6">
        {NewPicks.map((makeupPick, index) => (
          <SingleNewPick key={index} data={makeupPick} />
        ))}
      </div>
    </Container>
  );
}
