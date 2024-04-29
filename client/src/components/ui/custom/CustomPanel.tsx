import { svgPaths } from "@/constants";
import React from "react";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {}

const CustomPanel = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={"gradientPanel text-white " + className}
        style={{ backgroundImage: `url('${svgPaths.panel.path}')` }}
        {...props}
      ></div>
    );
  },
);

export default CustomPanel;
