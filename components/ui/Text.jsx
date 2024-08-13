import { jost, lexendDeca } from "./fonts";

export default function Text({ children, className, style }) {
  
    switch (style){
        case "h1": 
            style = "font-semibold text-3xl"
    }
  return <p className={` ${style} ${className}`}>{children}</p>;
}