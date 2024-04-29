import {
  HeroBackground,
  Navbar,
} from "./components";
import { AuthPanel, AuthDescription } from "./components/authPanel";
import { Employees } from "./components/employee";
import { Toaster } from "./components/ui";

import { _useContext } from "./context";

const App = () => {
  const { isLogin } = _useContext();

  return (
    <>
      <div className="min-h-screen px-5 py-5 sm:px-10 sm:py-7 2xl:px-14">
        <Navbar />
        <main className="max-lg:flex-center mt-5 h-full flex-col sm:mt-24 lg:mt-2 lg:pl-16 xl:mt-12 2xl:mt-16">
          <div className="flex w-full max-xl:flex-col gap-10 xl:gap-4 max-lg:items-center">
            <AuthPanel />
            {isLogin && <Employees />}
          </div>
          <AuthDescription />
        </main>
      </div>
      <HeroBackground />
      <Toaster />
    </>
  );
};

export default App;
