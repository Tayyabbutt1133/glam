import Text from "@/components/ui/Text";
import { FaStar } from "react-icons/fa";

export default function Rating({ratingCount, averageRating}) {
  return (
    <section className="inline-flex items-center gap-3 mb-3">
      <div className="flex flex-row items-center">
        { //give black stars based on average rating and slate-200 for the rest
          Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} size={18} className={index < averageRating ? "text-black" : "text-slate-200"} />
          ))
        }
          
        
          
      </div>
      <Text style={"sm"} className="text-light text-end">
        {ratingCount || 0} Reviews{" "}
      </Text>
    </section>
  );
}
