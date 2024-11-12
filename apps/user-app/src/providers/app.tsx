import React from "react";
import { ThemeProvider } from "./theme";
import { Web3Provider } from "./web3";
import { StoreProvider } from "./store";
import { Toaster } from "@/components/ui/toaster";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Web3Provider>
        <StoreProvider>{children}
          <Toaster />
        </StoreProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}
