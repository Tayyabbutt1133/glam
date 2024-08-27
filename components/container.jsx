export default function Container({ children, className = "" }) {
  return <div className={`container w-[92%] mx-auto ${className} `}>{children}</div>;
}
