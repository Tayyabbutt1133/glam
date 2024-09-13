import { lexendDeca } from "@/components/ui/fonts";
import Text from "@/components/ui/Text";

export default function Price() {
  return (
    <section className="flex flex-col gap-2 mb-5">
      <Text style={"large"} className="text-2xl text-sale">
        £9.99
      </Text>
      <div className="flex items-center space-x-4">
        <Text style={"sm"} className="text-light line-through text-xl">
          £19.99
        </Text>
        <span
          className={`${lexendDeca.className} text-black font-medium text-base rounded-md bg-bg-01 px-2 py-1`}
        >
          SAVE £10.00
        </span>
      </div>
    </section>
  );
}
