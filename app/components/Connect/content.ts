import Ecobee from "@/app/assets/Images/ecobee.webp";
import GoogleNest from "@/app/assets/Images/googleNest.webp";
import PhilipsHue from "@/app/assets/Images/philiphsHue.jpg";
import Ring from "@/app/assets/Images/ring.webp";

export const connectionContent = {
  sideBarOptions: [
    {
      title: "Finance",
      url: "finance",
    },
    {
      title: "Real-estate",
      url: "realestate",
    },
  ],
  integrationOptions: [
    {
      logo: GoogleNest,
      title: "GoogleNest",
      description:
        "Connect your agent with thousands of apps using Google Nest",
      buttonText: "Coming Soon",
    },
    {
      logo: PhilipsHue,
      title: "Philiphs Hue",
      description:
        "Connect your agent with thousands of apps using Philiphs Hue",
      buttonText: "Coming Soon",
    },
    {
      logo: Ecobee,
      title: "Ecobee",
      description: "Connect your agent with thousands of apps using Ecobee",
      buttonText: "Coming Soon",
    },
    {
      logo: Ring,
      title: "Ring",
      description: "Connect your agent with thousands of apps using Ring",
      buttonText: "Coming Soon",
    },
  ],
};
