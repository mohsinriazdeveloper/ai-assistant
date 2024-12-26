export const getContent = (id: number | undefined) => ({
  navBar: [
    {
      title: "Chat",
      url: `/agent/${id}/chat`,
    },
    {
      title: "Sources",
      url: `/agent/${id}/sources`,
    },
    {
      title: "Connections",
      url: `/agent/${id}/connections`,
    },
    {
      title: "Model",
      url: `/agent/${id}/model`,
    },
    {
      title: "Tools",
      url: `/agent/${id}/tools`,
    },
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
        title: "Aggregator",
        url: "aggregator",
      },
    ],
  },
  modelTabs: {
    heading: "Settings",
    tabs: [
      {
        title: "General",
        url: "general",
      },
      {
        title: "Model",
        url: "model",
      },
    ],
  },
};
