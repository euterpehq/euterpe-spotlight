import { EarningsStoreProvider } from "./earnings.store";
import { TokenStoreProvider } from "./token.store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <EarningsStoreProvider>
      <TokenStoreProvider>{children}</TokenStoreProvider>
    </EarningsStoreProvider>
  );
}
