import { heroBackground } from "@/constants";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useEffect, useState } from "react";

const HeroBackground = () => {
  const [img, setImg] = useState<string | null>(null);
  const isBreakpoint = useBreakpoint();

  useEffect(() => {
    if (isBreakpoint && isBreakpoint > 2) {
      setImg(
        heroBackground.baseImg.replace("hero1.avif",`hero${isBreakpoint}.avif`)
      );
    }
  }, [isBreakpoint]);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 -z-50 h-full w-full bg-cover bg-center bg-no-repeat object-cover"
      style={img ? { backgroundImage: `url('${img}')` } : {}}
    >
      {[1, 2].includes(isBreakpoint || 0) && (
        <video
          className="min-h-full min-w-full object-cover"
          autoPlay
          muted
          loop
        >
          <source src={heroBackground.baseVideo} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default HeroBackground;
