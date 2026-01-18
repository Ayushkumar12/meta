"use client";

import { useLenis } from "@/lib/lenis";
import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
