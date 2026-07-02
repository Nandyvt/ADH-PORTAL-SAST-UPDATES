export const accountNavData = {
  panelData: {
    account: {
      heading: "",
      items: [
        /* {
          title: "Dashboard",
          iconDetails: {
            auiIcon: "dashboard",
            localPath: "", // local path from consuming systems
            customStyle: `{width : 20px}`,
          },
          path: "/dashboard",
        }, */
        {
          title: "Profile",
          iconDetails: {
            auiIcon: "snapshot-avatar",
            localPath: "",
          },
          path: "/profile",
        },

        {
          title: "Sign Out",
          iconDetails: {
            auiIcon: "snapshot-logout",
            localPath: "",
          },
          path: "/ssologout",
        },
      ],
    },
  },
};

export const userDetails = {
  userName: "ADH User",
};

export const ecoSystemNavData = {
  items: ["React - ShopCPR", "Training Center", "Find A Course", "Donate"],
};
