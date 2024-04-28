import { CustomButton } from "./ui";

type Props = {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthButtons = ({ setIsLoginForm }: Props) => {
  return (
    <div className="flex w-full items-center justify-evenly gap-5 sm:gap-11">
      <CustomButton
        onClick={() => setIsLoginForm(true)}
        svg="auth"
      >
        Sign in
      </CustomButton>

      <CustomButton
        onClick={() => setIsLoginForm(false)}
        className="rotate-180" 
        svg="auth"
      >
        <p className="rotate-180">Sign up</p>
      </CustomButton>
    </div>
  );
};

export default AuthButtons;
