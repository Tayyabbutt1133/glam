"use client";
import Image from "next/image"
import { IoIosArrowDown } from "react-icons/io";

import Container from "../../container"
import { usePopupStore } from "../../../states/use-popup-store.jsx";


export default function NewsBannerNav() {

    const onOpen = usePopupStore(state => state.onOpen)

    return (
        <>
            <div className="w-full bg-[#F7EBE0]">
                <Container>
                    <div className="flex w-full justify-center items-center relative py-2">
                        <p className="text-center">
                            Up to 50% off selected brands + UK next day delivery over £40
                        </p>
                        {/* Make a currency selector button. When it is clikcked, It should trigger a pop-up menu where language and currency is selected */}
                        <div className="flex flex-row gap-2 absolute right-0">
                            <div className="relative flex w-10">
                                <Image 
                                    src='/UK Flag.png' 
                                    alt="UK flag" 
                                    sizes="50px"
                                    fill
                                    objectFit="contain"
                                />
                            </div>
                            <button 
                                className="flex flex-row items-center cursor-pointer"
                                onClick={onOpen}
                            >
                                <span>en - GBP</span>
                                <IoIosArrowDown color="black"/>
                            </button>
                        </div>

                    </div>
                </Container>
            </div>
        </>
    )

}