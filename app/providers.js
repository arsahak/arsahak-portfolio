"use client";

import { NextUIProvider } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import GlobalToast from "../components/shared/GlobalToast";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      {children}
      <GlobalToast />
    </NextUIProvider>
  );
}
