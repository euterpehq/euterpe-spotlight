import { EarningsStoreProvider } from "./earnings.store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <EarningsStoreProvider>{children}</EarningsStoreProvider>;
}
