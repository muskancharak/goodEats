import { createContext, useState, type ReactNode } from "react";

interface AccountType {
  name: string;
  role: "USER" | "SELLER" | "ADMIN";
}

interface DataContextType {
  account: AccountType | null;
  setAccount: React.Dispatch<React.SetStateAction<AccountType | null>>;
}

export const DataContext = createContext<DataContextType | null>(null);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<AccountType | null>(null);

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
