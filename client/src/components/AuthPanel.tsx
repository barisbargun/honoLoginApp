import { useState } from "react";
import { Indicator, LoginForm, RegisterForm } from ".";
import AuthButtons from "./AuthButtons";

const AuthPanel = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
      <div className="gradientPanel authPanelSize flex flex-col items-center">
        <Indicator direction={isLoginForm ? 1 : 0} />
        <AuthButtons setIsLoginForm={setIsLoginForm} />
        <div className="mt-3 w-full xl:mt-5">
          {isLoginForm ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
  );
};

export default AuthPanel;
