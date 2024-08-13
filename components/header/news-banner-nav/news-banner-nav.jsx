"use client";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import Container from "../../container";
import { usePopupStore } from "../../../states/use-popup-store.jsx";
import { useEffect, useState } from "react";

export default function NewsBannerNav() {
    const [mounted, setMounted] = useState(false);
    const onOpen = usePopupStore((state) => state.onOpen);
    const selectedCountry = usePopupStore((state) => state.selectedCountry);

    // Set mounted to true after the component mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full bg-[#F7EBE0]">
            <Container>
                <div className="flex w-full justify-center items-center relative py-2">
                    <p className="text-center">
                        Up to 50% off selected brands + UK next day delivery over £40
                    </p>
                    <div className="flex flex-row gap-1 absolute right-0">
                        <div className="relative flex w-10">
                            <Image 
                                src={selectedCountry.flag} 
                                alt={`${selectedCountry.country} Flag`} 
                                width={31}
                                height={22}
                                objectFit="contain"
                            />
                        </div>
                        <button 
                            className="flex flex-row items-center cursor-pointer"
                            onClick={onOpen}
                        >
                            <span>{`${selectedCountry.countryCode} - ${selectedCountry.code}`}</span>
                            <IoIosArrowDown color="black"/>
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
