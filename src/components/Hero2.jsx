import React from 'react';
import banner2 from "/src/assets/bannerr/mainn.png";
import { CheckCircle2 } from 'lucide-react';

const Hero2 = () => {
  const banner = {
   id: 1,
image: banner2,
title: "How to Set Up a",
highlight: "Printer",
steps: [
  "Unpack the printer and remove all protective materials",
  "Plug in the power cable and switch on the printer",
  "Insert the ink or toner cartridges properly",
  "Load paper into the input tray",
  "Install the printer driver on your computer",
  "Print a test page to confirm everything is working"
]
  };

  return (
    <section className="w-full bg-white font-urbanist">
      <div className="w-full">
        <div className="relative w-full h-[600px] md:h-[950px] overflow-hidden">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />

          {/* Right Side Data Card */}
          <div className="absolute inset-0 flex items-center justify-end px-4 md:px-10 lg:px-60">
            <div className="w-full max-w-[720px] bg-black/35 backdrop-blur-md p-6 md:p-8 text-white">
              <h2 className="text-3xl md:text-5xl font-black leading-tight capitalize">
                {banner.title}{" "}
                <span className="text-amber-400">{banner.highlight}</span>
              </h2>

              <ul className="mt-6 space-y-3">
                {banner.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <span className="text-sm md:text-lg font-medium leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;