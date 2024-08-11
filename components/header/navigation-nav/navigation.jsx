import Container from "../../container";
import Link from "next/link";

let links = [
  "Sale",
  "New In",
  "Brands",
  "Makeup",
  "Skincare",
  "Hair",
  "Nails",
  "Fragrance",
  "Bath & Body",
  "Home",
  "Wellness",
];

export default function Navigation() {
  return (
    <>
      <div className="bg-white">
        <Container>
          <nav className="flex flex-row w-full justify-center items-center py-3 gap-6">
            {links.map((link, index) => (
              <Link
                className={`uppercase ${index === 0 ? "text-red-600" : ""}`}
                key={index}
                href={"#"}
              >
                {link}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </>
  );
}
