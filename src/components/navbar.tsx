"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data/nav-items";

export function Navbar() {
  return <FloatingNav navItems={navItems} />;
}
