import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "",
    path: "/private/dashboard",
    icon: <Icon icon="lucide:home" width="24" height="24" color="white" />,
  },
  {
    title: "",
    path: "/private/sels",
    icon: <Icon icon="lucide:star" width="24" height="24" color="white" />,
  },
  {
    title: "",
    path: "/private/messages",
    icon: <Icon icon="lucide:mail" width="24" height="24" color="white" />,
  },

  {
    title: "",
    path: "/private/settings",
    icon: <Icon icon="lucide:settings" width="24" height="24" color="white" />,
  },
  {
    title: "",
    path: "/private/help",
    icon: (
      <Icon icon="lucide:help-circle" width="24" height="24" color="white" />
    ),
  },
];
