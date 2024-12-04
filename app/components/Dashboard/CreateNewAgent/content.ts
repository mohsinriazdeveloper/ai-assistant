import QA from "@/app/assets/icons/chatIcon.png";
import filesIcon from "@/app/assets/icons/fileIcon.png";
import GlobeIcon from "@/app/assets/icons/internetIcon.png";
import TextLines from "@/app/assets/icons/textLines.png";

export const content = {
  sideBarOptions: [
    {
      icon: filesIcon,
      title: "Files",
      url: "file",
    },
    {
      icon: TextLines,
      title: "Text",
      url: "text",
    },
    {
      icon: QA,
      title: "Q & A",
      url: "qa",
    },
    {
      icon: QA,
      title: "Image Training",
      url: "image-train",
    },
    {
      icon: GlobeIcon,
      title: "Website",
      url: "website",
    },
  ],
};
