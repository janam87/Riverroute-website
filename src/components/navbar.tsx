"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data/nav-items";
import {
  IconHome,
  IconBuildingFactory,
  IconRocket,
  IconUsers,
  IconUserCircle,
  IconBriefcase,
} from "@tabler/icons-react";

const icons = [
  <IconHome key="home" className="h-4 w-4" />,
  <IconBuildingFactory key="industry" className="h-4 w-4" />,
  <IconRocket key="building" className="h-4 w-4" />,
  <IconUsers key="serve" className="h-4 w-4" />,
  <IconUserCircle key="founders" className="h-4 w-4" />,
  <IconBriefcase key="careers" className="h-4 w-4" />,
];

const navItemsWithIcons = navItems.map((item, i) => ({
  ...item,
  icon: icons[i],
}));

export function Navbar() {
  return <FloatingNav navItems={navItemsWithIcons} />;
}
