import { FiSearch } from "react-icons/fi";
import { UserIcon } from "../../../public/icons/user";
import { CartIcon } from "../../../public/icons/cart";


import Link from "next/link";

import SearchBarWithDropdown from "./searchbar";
import Container from "../../container";
import Image from "next/image";

export default function MiddleBarNav() {
  return (
    <>
      <div className="flex w-full border-b-2 border-gray-100">
        <Container>
          <div className="flex flex-row w-full justify-between items-center py-4">

            {/* Logo */}
            <Link href="/">
              <Image 
                src="/logo.png"
                alt="Glam Beauty Logo"
                width={120}
                height={40}
              />
            </Link>

            {/* Search bar */}
            <SearchBarWithDropdown />

            {/* Account and Cart */}
            <section className="flex flex-row justify-between items-center gap-6">
              <Link href="/user">
                <div className="flex flex-row justify-center items-center gap-2">
                  <UserIcon className={"w-4"} />
                  <span className="capitalize">my account</span>
                </div>
              </Link>

              <div>
                <div className="flex flex-row justify-center items-center gap-2">
                  <CartIcon className={"w-7"} />
                  <span className="capitalize">cart</span>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
