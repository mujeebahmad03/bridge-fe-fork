import Image from "next/image";

import { CTA } from "./cta";

export const AnimatedRing = () => {
  return (
    <div className="ring-container pt-16">
      <div className="hero-circle">
        <div className="inner-img animate-pulse">
          <div className="stroke" />
          <div className="stroke" />
          <div className="stroke" />
        </div>

        <div className="hero-rotate">
          <div className="planet">
            <Image
              src="/dread-sticker.png"
              width={130}
              height={130}
              alt="sticker"
            />
          </div>
          <div className="planet">
            <Image
              src="/lady-sticker.png"
              width={80}
              height={80}
              alt="sticker-2"
            />
          </div>
          <div className="planet">
            <Image
              src="/tech-girl-sticker.png"
              width={70}
              height={70}
              alt="sticker-3"
            />
          </div>
          <div className="circle circle1" />
          <div className="circle circle2" />
          <div className="circle circle3" />
          <div className="circle circle4" />
          <div className="circle circle5" />
        </div>
      </div>

      <CTA />
    </div>
  );
};
