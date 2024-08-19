import { jost } from "./fonts";
export default function Button({ children, className = "" }) {
  return (
    <button
      className={`bg-button hover:bg-hover text-white font-normal lg:text-xl lg:px-6 lg:py-3 2xl:text-2xl 
            2xl:px-10 2xl:py-5 uppercase rounded-lg transition-all ease duration-100 ${jost.className} ${className}`}
    >
      {children}
    </button>
  );
}
