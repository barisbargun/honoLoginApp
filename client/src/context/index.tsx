import React, { createContext, useContext, useState } from "react";

type ContextProviderProps = {
  children: React.ReactNode;
};

interface IContext {
  isLogin: boolean | undefined;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const INITIAL_STATE = {
  isLogin: false,
  setIsLogin: () => null,
};

const DataContext = createContext<IContext>(INITIAL_STATE);

export const DataProvider = ({ children, ...props }: ContextProviderProps) => {
  const [isLogin, setIsLogin] = useState(INITIAL_STATE.isLogin);

  const value = {
    isLogin,
    setIsLogin,
  };

  return (
    <DataContext.Provider {...props} value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const _useContext = () => useContext(DataContext);
