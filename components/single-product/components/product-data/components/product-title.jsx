import { jost } from "@/components/ui/fonts";

export default function ProductTitle({title}) {
  return (
    <section className="mb-3">
      <h1
        className={`${jost.className} font-medium text-xl xl:text-2xl 2xl:text-3xl`}
      >
        {title}
      </h1>
    </section>
  );
}
