type RoleInfo = { src: string; alt: string; tooltip: string };

export const roleInfo: Record<number, RoleInfo> = {
  1: { src: "../images/UserSetting.svg", alt: "admin", tooltip: "Super Admin" },
  4: {
    src: "../images/UserPen.svg",
    alt: "View & Edit",
    tooltip: "View & Edit",
  },
  5: {
    src: "../images/UserPen-Slash.svg",
    alt: "View Only",
    tooltip: "View Only",
  },
  6: {
    src: "../images/UserShield.svg",
    alt: "View Only",
    tooltip: "View Only",
  },
};
