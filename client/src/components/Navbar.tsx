import { logo } from "@/constants";
import { CustomButton } from "./ui";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="flex w-full items-center justify-between">
        <div className="flex-center gap-4">
          <img
            src={logo.src}
            alt="logo"
            width={40}
            height={56}
            className="logoImgSize"
          />
          <h2 className="fonts-logo">{logo.name}</h2>
        </div>
        <CustomButton
        svg="news"
      >
        News
      </CustomButton>
      </nav>
    </header>
  );
};

export default Navbar;
