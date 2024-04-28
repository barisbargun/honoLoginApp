import { SvgTypes, svgPaths } from "@/constants";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  svg: SvgTypes;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, svg, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const _class = 
    `defaultButton ${className || ""}  after:${svgPaths[svg].glow || ""}`
    
    return (
      <Comp
        className={_class}
        style={{
          backgroundImage: `url(${svgPaths[svg].path || ""})`,
          
        }}
        type="submit"
        ref={ref}
        {...props}
      />
    );
  },
);

export default CustomButton;
