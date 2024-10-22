"use client"


import { useEffect } from "react";
import Container from "./container";

export default function Newsletter() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=WTTcQC";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-bg-01 h-[140px] sm:h-[238px] grid place-items-center">
      <Container>
        <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-6">
          <div className="sm:px-3 lg:px-0 min-w-fit w-full lg:w-auto">
            <h2
              className={`text-center lg:text-right text-[16px] mx-2 sm:mx-0 sm:text-2xl md:text-[24px] capitalize text-black `}
            >
              <span className="text-[#CF8562] font-medium">SIGN UP</span> TO
              RECEIVE OFFERS AND UPDATES
            </h2>
          </div>
          <div className="klaviyo-form-XCK98T"></div>
        </div>
      </Container>
    </section>
  );
}
