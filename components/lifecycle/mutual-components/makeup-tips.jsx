import Image from "next/image";
import Container from "../../container";
import Text from "../../ui/Text";

import tip1 from "/public/lifecycle/makeup tips/tip1.png";
import tip2 from "/public/lifecycle/makeup tips/tip2.png";
import tip3 from "/public/lifecycle/makeup tips/tip3.png";
import tip4 from "/public/lifecycle/makeup tips/tip4.png";
import tip5 from "/public/lifecycle/makeup tips/tip5.png";

const tips = [
  {
    title: "Learn the minimalist eye make up look",
    image: tip1,
  },
  {
    title: "How to do no makeup look at home?",
    image: tip2,
  },
  {
    title: "Learn how to clean your makeup brushes",
    image: tip3,
  },
  {
    title: "Buy foundation according to your complexion",
    image: tip4,
  },
  {
    title: "Great eyebrows? 3 step method to do it",
    image: tip5,
  },
];

const Tips = ({ data }) => {
  return (
    <div className="relative">
      <div className="relative">
        <Image
          src={data.image}
          alt={data.title}
          style={{ width: "100%" }}
          className="object-cover"
        />
        <div className="tips-overlay"></div>
      </div>

      <Text style={"sm"} className="absolute bottom-4 px-3 text-white">
        {data.title}
      </Text>
    </div>
  );
};

export default function MakeupTips() {
  return (
    <Container className="my-28">
      <Text style={"h1"} className="uppercase">
        makeup tips for you
      </Text>
      <div>
        {/* Makeup tips */}
        <div className="grid grid-cols-5 gap-4 mt-8">
          {tips.map((tip, index) => (
            <Tips key={index} data={tip} />
          ))}
        </div>
      </div>
    </Container>
  );
}
