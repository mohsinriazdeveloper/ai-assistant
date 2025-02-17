import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useUpdateUserMutation } from "../ReduxToolKit/aiAssistantOtherApis";

type State = {
  run: boolean;
  stepIndex: number;
  steps: Step[];
};

interface TourGuideProps {
  start: boolean;
  setStartTour: Dispatch<SetStateAction<boolean>>;
  onTourEnd: () => void;
}

const TourGuide: FC<TourGuideProps> = ({ start, setStartTour, onTourEnd }) => {
  const [updateUser, isLoading] = useUpdateUserMutation();

  const [progress, setProgerss] = useState<number>(1);
  const totalSTeps: number = 4;

  const generateSteps = (val: number): Step[] => [
    {
      content: (
        <div className="bg-[#343434] rounded-lg h-full">
          <p className="text-center text-xl font-medium mb-2">
            Start a short tour guide
          </p>
        </div>
      ),
      locale: { skip: <strong aria-label="skip">Skip</strong> },
      styles: {
        options: {
          width: 300,
        },
      },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <div className="bg-[#343434] rounded-lg h-full">
          <p className="text-center text-xl font-medium mb-2">1</p>
          <p className="text-center font-medium mb-2">Upload Data Sources</p>
          <p className="text-center text-xs font-medium">
            Use the tabs of the left to upload unique data source to your AI
          </p>
        </div>
      ),
      placement: "left",
      styles: {
        options: {
          width: "235px",
        },
      },
      target: "#step-1",
    },
    {
      content: (
        <div className="bg-[#343434] rounded-lg h-full">
          <p className="text-center text-xl font-medium mb-2">2</p>
          <p className="text-center font-medium mb-2">Train your AI</p>
          <p className="text-center text-xs font-medium">
            Once Data Sources are Uploaded and saved, simply click Train agent
            to update Data
          </p>
        </div>
      ),
      placement: "top",
      styles: {
        options: {
          width: "235px",
        },
      },
      target: "#step-2",
    },
    {
      content: (
        <div className="bg-[#343434] rounded-lg h-full">
          <p className="text-center text-xl font-medium mb-2">3</p>
          <p className="text-center font-medium mb-2">Test Your AI</p>
          <p className="text-center text-xs font-medium">
            Test your chatbot using text or voice by moving to the “Chat” tab.
          </p>
        </div>
      ),

      placement: "top",
      styles: {
        options: {
          width: "235px",
        },
      },
      target: "#step-3",
    },
  ];

  const [{ run, steps }, setState] = useState<State>({
    run: start,
    stepIndex: 0,
    steps: generateSteps(progress),
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      steps: generateSteps(progress),
    }));
  }, [progress]);

  useEffect(() => {
    if (start) {
      setState((prevState) => ({
        ...prevState,
        run: true,
        stepIndex: 0,
      }));
    }
  }, [start]);

  const handleJoyrideCallback = async (data: CallBackProps) => {
    const { status, type, index } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED];
    if (finishedStatuses.includes(status)) {
      setState({ steps, run: false, stepIndex: 0 });
      setStartTour(false);
      onTourEnd();
      try {
        updateUser({ is_first_interaction_with_agent: false }).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      scrollToFirstStep
      hideCloseButton
      disableCloseOnEsc
      disableOverlayClose
      disableScrolling
      debug
      styles={{
        overlay: {
          border: "6px solid #8c8c8c",
        },
        spotlight: {
          border: "2px solid #8c8c8c",
        },
        options: {
          zIndex: 100,
          arrowColor: "#343434",
          backgroundColor: "#343434",
          textColor: "#ffffff",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: "#7D7D7D",
          //   secondaryColor: "#ffffff",
        },
        buttonClose: {
          display: "none",
        },
        buttonBack: {
          display: "none",
        },
        buttonNext: {
          width: "100%",
        },
      }}
      locale={{
        next: "Got it",
        last: "Got it",
      }}
    />
  );
};

export default TourGuide;
