import { jost } from "./fonts";
export default function Button({ children, className = "" }) {
  return (
    <button
      className={`
        bg-button 
        hover:bg-hover 
        text-white 
        text-[10px]
        px-6
        py-2
        font-normal 
        xs:px-6
        xs:py-1
        sm:px-8
        sm:py-2
        lg:text-xl 
        lg:px-6 
        lg:py-2 
        xl:px-8 
        xl:py-3 
        2xl:text-2xl 
        2xl:px-10 
        2xl:py-4 
        uppercase 
        rounded-lg 
        transition-all 
        ease 
        duration-100 
        ${jost.className} ${className}
      `}
    >
      {children}
    </button>
  );
}
