import { createContext, useContext, useState } from 'react';
import type { LocalStoreItem } from '../../services/localStores.services';
import { localStoreService } from '../../services/localStores.services';

interface DataContextType {
  data: LocalStoreItem[];
  setData: (value: LocalStoreItem[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<LocalStoreItem[]>(() => localStoreService.getAll('favorites'));

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
};