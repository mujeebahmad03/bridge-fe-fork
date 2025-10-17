import { LayoutConfig } from "@/types/dashboard-widget";

export const DEFAULT_LAYOUT: LayoutConfig = {
  id: "default",
  name: "Default Layout",
  layouts: {
    lg: [
      { i: "email", x: 0, y: 0, w: 6, h: 2, minW: 6, maxW: 12, minH: 2 },
      { i: "linkedin", x: 6, y: 0, w: 6, h: 2, minW: 6, maxW: 12, minH: 2 },
      { i: "calls", x: 0, y: 2, w: 6, h: 2, minW: 6, maxW: 12, minH: 2 },
      { i: "combined", x: 0, y: 4, w: 12, h: 4, minW: 6, maxW: 12, minH: 2 },
    ],
    md: [
      { i: "email", x: 0, y: 0, w: 5, h: 2, minW: 4, maxW: 10, minH: 2 },
      { i: "linkedin", x: 5, y: 0, w: 5, h: 2, minW: 4, maxW: 10, minH: 2 },
      { i: "calls", x: 0, y: 2, w: 5, h: 2, minW: 4, maxW: 6, minH: 2 },
      { i: "combined", x: 0, y: 4, w: 10, h: 4, minW: 4, maxW: 10, minH: 2 },
    ],
    sm: [
      { i: "email", x: 0, y: 0, w: 6, h: 2, minW: 4, maxW: 6, minH: 2 },
      { i: "linkedin", x: 0, y: 2, w: 6, h: 2, minW: 4, maxW: 6, minH: 2 },
      { i: "calls", x: 0, y: 4, w: 6, h: 2, minW: 3, maxW: 6, minH: 2 },
      { i: "combined", x: 0, y: 6, w: 6, h: 4, minW: 4, maxW: 6, minH: 2 },
    ],
    xs: [
      { i: "email", x: 0, y: 0, w: 4, h: 2, minW: 3, maxW: 4, minH: 2 },
      { i: "linkedin", x: 0, y: 2, w: 4, h: 2, minW: 3, maxW: 4, minH: 2 },
      { i: "calls", x: 0, y: 4, w: 4, h: 2, minW: 2, maxW: 4, minH: 2 },
      { i: "combined", x: 0, y: 6, w: 4, h: 8, minW: 3, maxW: 4, minH: 2 },
    ],
  },
};
