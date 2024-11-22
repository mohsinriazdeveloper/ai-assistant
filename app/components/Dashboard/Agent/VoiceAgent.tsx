import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import MicBubbles from "@/app/assets/icons/micBubbles.png";
import Image from "next/image";
import { FaRegCirclePause, FaRegCircleStop } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import BigCloud from "@/app/assets/Images/bigCloud.png";
import SmallCloud from "@/app/assets/Images/smallCloud.png";
import { FaMicrophone, FaRedo } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../ReduxToolKit/hook";
import {
  selectVoiceResponse,
  voiceResponce,
} from "../../ReduxToolKit/voiceResSlice";
import {
  useAgentVoiceMutation,
  useGetAllAgentsQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import ResponseImg from "@/app/assets/Images/aiResponse.png";
import { MdOutlinePlayCircle } from "react-icons/md";
import { PiRecordFill } from "react-icons/pi";
import toast from "react-hot-toast";
interface VoiceAgentProps {
  agentId: number;
  specificChatId: number | null;
  setIsVoice: Dispatch<SetStateAction<boolean>>;
}

const VoiceAgent: FC<VoiceAgentProps> = ({
  agentId,
  specificChatId,
  setIsVoice,
}) => {
  const [response, setResponse] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  let mediaStream: MediaStream | null = null; // Store media stream
  const [audioSteps, setAudioSteps] = useState<string>("speaking");

  const dispatch = useAppDispatch();
  const inText = useAppSelector(selectVoiceResponse);
  // const stopAudioPlaying = useAppSelector(selectVoiceResponse);
  const [agentVoice] = useAgentVoiceMutation();
  const { data: allAgents } = useGetAllAgentsQuery();

  useEffect(() => {
    startRecording();
    return () => {
      stopRecording();
    };
  }, []);

  useEffect(() => {
    if (inText === "") {
      speechSynthesis.cancel();
    }
  }, [inText]);
  const handleStop = useCallback(
    async (blobUrl: string | null) => {
      if (!blobUrl) {
        setError("Recording failed. Please try again.");
        return;
      }

      if (!agentId) {
        setError("Agent information is not available. Please try again.");
        return;
      }

      setIsProcessing(true);
      setError(null);
      try {
        const originalBlob = await fetch(blobUrl).then((r) => r.blob());

        const formData = new FormData();
        formData.append("audio", originalBlob, "audio.wav");
        formData.append("agent_id", agentId.toString());
        formData.append(
          "chat_session_id",
          specificChatId?.toString() ?? "null"
        );

        const result = await agentVoice(formData).unwrap();

        const responseText = result.response;
        dispatch(
          voiceResponce({
            inText: responseText,
          })
        );
        setResponse(responseText);
      } catch (error) {
        console.error("Error processing audio:", error);
        toast.error("Voice input was not clearly taken. Please record again.");
        setAudioSteps("speaking");
      } finally {
        setIsProcessing(false);
      }
    },
    [allAgents, agentVoice, agentId, dispatch]
  );

  useEffect(() => {
    return () => {};
  });

  useEffect(() => {
    if (mediaBlobUrl) {
      handleStop(mediaBlobUrl);
      setMediaBlobUrl(null);
    }
  }, [mediaBlobUrl, handleStop]);

  useEffect(() => {
    if (response) {
      playTextAsSpeech(response);
    }
  }, [response]);

  const startRecording = () => {
    setIsRecording(true);
    resetResponse();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaStream = stream; // Store the media stream
      const mediaRecorder = new MediaRecorder(stream);
      mediaChunksRef.current = [];

      // Create audio context to analyze input
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      const bufferLength = analyserRef.current.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyserRef.current);

      // Function to check for silence
      const checkForSilence = () => {
        analyserRef.current?.getByteTimeDomainData(dataArray);
        const maxAmplitude = Math.max(...dataArray);

        // If the amplitude is low, consider it silence
        if (Math.abs(maxAmplitude - 128) < 5) {
          // Tolerance around 128 for silence
          if (!silenceTimeoutRef.current) {
            silenceTimeoutRef.current = setTimeout(() => {
              stopRecording(); // Stop recording if silent for 4 seconds
            }, 7000); // 4 seconds timeout
          }
        } else {
          // Clear the silence timeout if there is sound
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
          }
        }

        // Keep checking for silence while recording
        if (isRecording) {
          requestAnimationFrame(checkForSilence);
        }
      };

      checkForSilence(); // Start checking for silence

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mediaChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(mediaChunksRef.current, { type: "audio/webm" });
        const blobUrl = URL.createObjectURL(blob);
        setMediaBlobUrl(blobUrl);
        setIsRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    // Stop the media stream to turn off the microphone
    mediaStream?.getTracks().forEach((track) => {
      if (track.readyState === "live" && track.kind === "audio") {
        track.stop(); // Stop each audio track
      }
    });
    mediaStream = null; // Clear the media stream reference
    // if (mediaStream) {
    //   mediaStream.getTracks().forEach((track) => {
    //     if (track.readyState === "live" && track.kind === "audio") {
    //       track.stop(); // Stop each audio track
    //     }
    //   });
    //   mediaStream = null; // Clear the media stream reference
    // }

    // Clear any existing silence detection timeout
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    // Stop audio context and reset for future recordings
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsRecording(false); // Ensure the state is updated to not recording
  };

  const playTextAsSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onstart = () => {
        setAudioSteps("response"); // Set audioSteps to "response" when playing starts
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setAudioSteps("speaking"); // Set audioSteps back to "speaking" when playing ends
        setIsPlaying(false);
        setIsPaused(false);
        startRecording();
      };

      utterance.onerror = () => {
        setAudioSteps("speaking"); // Handle errors by resetting to "speaking"
        setIsPlaying(false);
        setIsPaused(false);
      };

      speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-Speech not supported in this browser.");
    }
  };

  const pauseAudio = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      setIsPaused(true);
      speechSynthesis.pause();
    }
  };

  const resumeAudio = () => {
    if (speechSynthesis.paused) {
      setIsPaused(false);
      speechSynthesis.resume();
    }
  };

  const resetResponse = () => {
    dispatch(voiceResponce({ inText: "" }));

    setResponse("");
    setIsPlaying(false);
    setIsPaused(false);
    setError(null);
    speechSynthesis.cancel();
  };
  return (
    <div className="h-screen">
      <div className="h-[65vh] flex flex-col justify-end items-center">
        <div className="h-full flex items-end mb-7">
          {audioSteps === "speaking" && (
            <span className="relative flex w-[200px] h-[200px]">
              <span className="animate-slowPulse absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full w-[200px] h-[200px] bg-white"></span>
            </span>
          )}
          {audioSteps === "analyzing" && (
            <div className="">
              <div className="animate-slowSpin">
                <Image
                  src={BigCloud}
                  alt=""
                  className="w-[75%] animate-slowPulse"
                />
              </div>
              <Image src={SmallCloud} alt="" />
            </div>
          )}
          {audioSteps === "response" && (
            <Image
              src={ResponseImg}
              alt=""
              className="w-[75%] animate-slowPulse"
            />
          )}
        </div>
        {audioSteps === "speaking" && <Image src={MicBubbles} alt="" />}
        {audioSteps !== "speaking" && (
          <FaMicrophone className="text-[#808080] text-2xl cursor-pointer" />
        )}
        {audioSteps === "speaking" && (
          <p className="font-customAnta text-2xl text-white mt-2">
            Start Speaking
          </p>
        )}
        {audioSteps === "analyzing" && (
          <p className="font-customAnta text-2xl text-[#dddddd] mt-2">
            Click to Cancel
          </p>
        )}
        {audioSteps === "response" && (
          <p className="font-customAnta text-2xl text-[#dddddd] mt-2">
            Click to interrupt
          </p>
        )}
      </div>
      <div className="h-[35vh] pt-8">
        <div className="flex justify-center items-end gap-10">
          <div className="relative flex justify-end">
            {/* {audioSteps === "startRecording" && (
              <div className="relative group">
                <PiRecordFill
                  className="text-white ml-auto text-3xl cursor-pointer"
                  onClick={() => {
                    setAudioSteps("speaking"), startRecording();
                  }}
                />
                <span className="w-max absolute right-0 bottom-0 translate-y-full text-xs text-white bg-gray-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Start Recording
                </span>
              </div>
            )} */}
            {audioSteps === "speaking" && (
              <div className="relative group">
                <FaRegCircleStop
                  className="text-white ml-auto text-3xl cursor-pointer"
                  onClick={() => {
                    setAudioSteps("analyzing"), stopRecording();
                  }}
                />
                <span className="w-max absolute right-0 bottom-0 translate-y-full text-xs text-white bg-gray-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Stop Recording
                </span>
              </div>
            )}
            {audioSteps === "response" && (
              <>
                {!isPaused ? (
                  <FaRegCirclePause
                    className="text-white ml-auto text-3xl"
                    onClick={pauseAudio}
                  />
                ) : (
                  <MdOutlinePlayCircle
                    className="text-white ml-auto text-3xl"
                    onClick={resumeAudio}
                  />
                )}
              </>
            )}
          </div>
          <div>
            <div
              onClick={() => {
                setIsVoice(false), resetResponse();
              }}
              className="bg-[#ff7d75] w-12 h-12 rounded-full flex justify-center items-center text-white text-2xl"
            >
              <RxCross2 />
            </div>
          </div>
          {response && ( // Conditionally render FaRedo based on response state
            <div>
              <FaRedo
                className="text-white ml-auto text-xl cursor-pointer"
                onClick={() => {
                  resetResponse(), startRecording();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default VoiceAgent;
