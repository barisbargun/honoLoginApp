import { useState } from "react";

import { Indicator} from "@/components";
import { CustomPanel } from "@/components/ui";
import { LoginForm, RegisterForm } from "@/components/form";

import AuthButtons from "./AuthButtons";

const AuthPanel = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
      <CustomPanel className="authPanelSize flex flex-col items-center">
        <Indicator direction={isLoginForm ? 1 : 0} />
        <AuthButtons setIsLoginForm={setIsLoginForm} />
        <div className="mt-3 w-full xl:mt-5">
          {isLoginForm ? <LoginForm /> : <RegisterForm />}
        </div>
      </CustomPanel>
  );
};

export default AuthPanel;
