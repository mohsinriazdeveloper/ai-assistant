import { useState } from "react";
import Joyride, { Step } from "react-joyride";

const steps: Step[] = [
  {
    target: ".step-1",
    content: "Upload data sources here.",
  },
  {
    target: ".step-2",
    content: "Train your AI after uploading the data.",
  },
  {
    target: ".step-3",
    content: "Test your AI in the chat tab.",
  },
];

const OnboardingTour = () => {
  const [run, setRun] = useState(true);

  return (
    <div>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton={false}
      />
      {/* Add target classes to the relevant elements */}
      {/* <div className="step-1">Step 1 Content</div>
      <div className="step-2">Step 2 Content</div>
      <div className="step-3">Step 3 Content</div> */}
    </div>
  );
};

export default OnboardingTour;
