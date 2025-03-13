export const getContent = (id: number | undefined) => ({
  navBar: [
    {
      id: 3,
      title: "Chat",
      url: `/agent/${id}/chat`,
    },
    {
      id: 4,
      title: "Sources",
      url: `/agent/${id}/sources`,
    },
    { id: 5, title: "Connections", url: `/agent/${id}/connections` },
    { id: 6, title: "Agent Settings", url: `/agent/${id}/model` },
    { id: 7, title: "Tools", url: `/agent/${id}/tools` },
  ],
});

export const sideBarOptions = {
  connectionsTabs: {
    heading: "API Connections",
    tabs: [
      {
        title: "Finance",
        url: "finance",
      },
      {
        title: "Real-estate",
        url: "realestate",
      },
    ],
  },
  sourcesTabs: {
    heading: "Sources",
    tabs: [
      {
        title: "Files",
        url: "files",
      },
      {
        title: "Text",
        url: "text",
      },
      {
        title: "Q&A",
        url: "qa",
      },
      {
        title: "Image Training",
        url: "imageTraining",
      },
      {
        title: "Website",
        url: "website",
      },
    ],
  },
  toolsTabs: {
    heading: "Dashboard",
    tabs: [
      {
        title: "Dashboard (API)",
        url: "dashboard",
      },
      {
        title: "Reports",
        url: "aggregator",
      },
    ],
  },
  modelTabs: {
    heading: "Settings",
    tabs: [
      {
        title: "Model",
        url: "model",
      },
      {
        title: "General",
        url: "general",
      },
    ],
  },
};
