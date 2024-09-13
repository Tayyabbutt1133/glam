import Text from "@/components/ui/Text";
import { FaStar } from "react-icons/fa";

export default function Rating() {
  return (
    <section className="inline-flex items-center gap-3 mb-3">
      <div className="flex flex-row items-center">
        <FaStar size={18} />
        <FaStar size={18} />
        <FaStar size={18} />
        <FaStar size={18} />
        <FaStar size={18} />
        <FaStar size={18} />
      </div>
      <Text style={"sm"} className="text-light text-end">
        65 Reviews{" "}
      </Text>
    </section>
  );
}

