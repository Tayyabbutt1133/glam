"use client";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import Container from "../../container";
import { usePopupStore } from "../../../states/use-popup-store.jsx";
import { useEffect, useState } from "react";

export default function NewsBannerNav() {
    const onOpen = usePopupStore((state) => state.onOpen);
    const selectedCountryFromStore = usePopupStore((state) => state.selectedCountry);
    
    const [selectedCountry, setSelectedCountry] = useState(() => {
        // Check if window is defined to ensure code runs in the browser
        if (typeof window !== "undefined") {
            if (selectedCountryFromStore && selectedCountryFromStore.countryCode) {
                return selectedCountryFromStore;
            }
            const savedCountry = localStorage.getItem('selectedCountry');
            return savedCountry ? JSON.parse(savedCountry) : { countryCode: '', code: '', country: '' };
        } else {
            return { countryCode: '', code: '', country: '' }; // Default value during SSR
        }
    });

    const [flagUrl, setFlagUrl] = useState('');

    const fetchFlag = async (countryCode) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            const data = await response.json();
            setFlagUrl(data[0].flags.svg);
        } catch (error) {
            console.error("Error fetching flag:", error);
        }
    };

    useEffect(() => {
        if (selectedCountry.countryCode) {
            fetchFlag(selectedCountry.countryCode);
        }
    }, [selectedCountry]);

    useEffect(() => {
        // Sync state with the store when the popup selection changes
        const unsubscribe = usePopupStore.subscribe((state) => {
            const updatedCountry = state.selectedCountry;
            if (updatedCountry && updatedCountry.countryCode !== selectedCountry.countryCode) {
                setSelectedCountry(updatedCountry);
                if (typeof window !== "undefined") {
                    localStorage.setItem('selectedCountry', JSON.stringify(updatedCountry));
                }
            }
        });

        return () => unsubscribe();
    }, [selectedCountry]);

    return (
        <div className="w-full bg-[#F7EBE0]">
            <Container>
                <div className="flex w-full justify-center items-center relative py-2">
                    <p className="text-center">
                        Up to 50% off selected brands + UK next day delivery over £40
                    </p>
                    <div className="flex flex-row gap-1 absolute right-0">
                        <div className="relative flex w-10">
                            {flagUrl && (
                                <Image 
                                    src={flagUrl} 
                                    alt={`${selectedCountry.country} Flag`} 
                                    width={31}
                                    height={22}
                                    objectFit="contain"
                                />
                            )}
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
