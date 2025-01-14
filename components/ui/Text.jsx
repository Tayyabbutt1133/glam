import { jost, lexendDeca } from "./fonts";

export default function Text({ children, className = '', style }) {
  switch (style) {
    case "h1":
      style = "lg:font-medium 2xl:font-semibold text-xl lg:text-2xl 2xl:text-4xl " + jost.className;
      return <h1 className={`${style} ${className}`}>{children}</h1>;
    case "h2":
      style = "font-semibold text-[32px] " + jost.className;
      return <h2 className={`${style} ${className}`}>{children}</h2>;
    case "h3":
      style = "font-bold text-[24px] " + jost.className;
      return <h3 className={`${style} ${className}`}>{children}</h3>;
    case "h4":
      style = "xl:font-medium xl:text-[16px] 2xl:text-[20px] " + jost.className;
      return <h4 className={`${style} ${className}`}>{children}</h4>;
    case "xs":
      style = "text-xs font-normal " + lexendDeca.className;
      return <p className={`${style} ${className}`}>{children}</p>;
    case "sm":
      style = "text-base lg:font-normal " + lexendDeca.className;
      return <p className={`${style} ${className}`}>{children}</p>;
    case "large":
      style = "lg:text-base xl:text-lg 2xl:text-xl font-bold " + lexendDeca.className;
      return <p className={`${style} ${className}`}>{children}</p>;
    default:
      style = "text-base font-normal " + lexendDeca.className;
      return <p className={`${style} ${className}`}>{children}</p>;
  }
}
