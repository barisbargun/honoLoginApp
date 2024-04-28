import { svgPaths } from "@/constants";

type Props = {
  direction: 0 | 1;
};

const Indicator = ({ direction = 0 }: Props) => {
  return (
    <div className="flex-center mb-3 w-full">
      <div
        className="defaultSvg after:glowButtonAuth 
        indicatorSize transition-all ease-in-out duration-300"
        style={{ 
          backgroundImage: `url('${svgPaths.indicator.path}')`,
          rotate: `${direction === 0 ? 0 : 90}deg`
         }}
      />
    </div>
  );
};

export default Indicator;
