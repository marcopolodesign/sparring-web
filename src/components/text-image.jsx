import React from 'react';
import SparringMin from '../assets/icons/sparring-min';

const TextImage = ({ title, mainHeading, description, features, image, reverse }) => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`mx-auto max-w-2xl grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:flex ${
            reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          {/* Text Section */}
          <div className="lg:max-w-lg flex flex-col gap-6 lg:pr-8 lg:pt-4">
            <div className="text-black text-base font-medium font-body leading-none">
              {title}
            </div>
            <div className="text-[#163300] text-7xl font-bold font-display uppercase leading-none">
              {mainHeading}
            </div>
            <div className="text-[#707070] text-lg font-normal font-body leading-7 sm:-mt-4">
              {description}
            </div>
            {features &&
              features.map((feature, index) => (
                <div
                  key={index}
                  className="self-stretch justify-start items-center gap-5 inline-flex"
                >
                  <div className="w-8 h-8 relative">
                    <SparringMin />
                  </div>
                  <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div className="text-black text-lg font-semibold font-body leading-7">
                      {feature.title}
                    </div>
                    <div className="self-stretch text-black text-lg font-normal font-body leading-tight">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Image Section */}
          <div
            className={`max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 ${
              reverse ? 'order-first lg:order-last' : ''
            }`}
          >
            <img
              alt={image.alt}
              src={image.src}
              width={image.width}
              height={image.height}
              className="rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImage;
