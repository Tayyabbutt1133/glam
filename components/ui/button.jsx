import { jost } from "./fonts";
export default function Button({ children, className = "" }) {
  return (
    <button
      className={`bg-button hover:bg-hover text-white font-normal text-2xl 
            px-10 py-5 uppercase rounded-lg transition-all ease duration-100 ${jost.className} ${className}`}
    >
      {children}
    </button>
  );
}
