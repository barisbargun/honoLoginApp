import { svgPaths } from "@/constants";
import React from "react";
import { InputProps } from "../input";

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={"relative overflow-hidden rounded-xl shadow-xl formInputSize " + className}>
        <div
          className="defaultSvg absolute left-0 top-0 -z-10 h-full w-full"
          style={{ backgroundImage: `url('${svgPaths.input.path}')` }}
        ></div>
        <input
          className="h-full w-full border-none bg-transparent px-4 outline-none"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

export default CustomInput;
