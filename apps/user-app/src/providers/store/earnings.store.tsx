"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import {
  type EarningsStore,
  createEarningsStore,
} from "@/store/earnings.store";

export const EarningsStoreContext =
  createContext<StoreApi<EarningsStore> | null>(null);

export interface EarningsStoreProviderProps {
  children: ReactNode;
}

export const EarningsStoreProvider = ({
  children,
}: EarningsStoreProviderProps) => {
  const storeRef = useRef<StoreApi<EarningsStore>>();
  if (!storeRef.current) {
    storeRef.current = createEarningsStore();
  }

  return (
    <EarningsStoreContext.Provider value={storeRef.current}>
      {children}
    </EarningsStoreContext.Provider>
  );
};

export const useEarningsStore = <T,>(
  selector: (store: EarningsStore) => T,
): T => {
  const earningsStoreContext = useContext(EarningsStoreContext);

  if (!earningsStoreContext) {
    throw new Error(
      `useEarningsStore must be used within EarningsStoreProvider`,
    );
  }

  return useStore(earningsStoreContext, selector);
};
