import React from 'react'

export default function Feature({...props}) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
        <div className={`p-5 sm:p-10 rounded-lg overflow-hidden bg-${props.bgColor} gap-14 mx-auto max-w-2xl grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:flex ${props.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <div className="lg:max-w-lg flex flex-col gap-6 lg:pr-8 lg:pt-4">
                {props.icon && props.icon}
                <div className="text-lightGreen text-6xl font-bold font-display uppercase leading-none mt-6">
                    {props.mainHeading}
                </div>

                <div className="text-white text-lg font-normal font-body leading-7 sm:-mt-4">
                    {props.description}
                </div>

            </div>

            <div
            className={`max-w-none rounded-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 ${
              props.reverse ? 'order-first lg:order-last' : ''
            }`}
          >
            <img
              alt={props.image?.alt}
              src={props.image?.src}
              width={props.image?.width}
              height={props.image?.height}
              className="rounded-lg overflow-hidden"
            />
          </div>
        </div>
    </div>
  )
}
