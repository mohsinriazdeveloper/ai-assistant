"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPause, FaPlay, FaRedo, FaStop } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import {
  useAgentVoiceMutation,
  useGetAllAgentsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { useAppDispatch, useAppSelector } from "../ReduxToolKit/hook";
import {
  selectVoiceResponse,
  voiceResponce,
} from "../ReduxToolKit/voiceResSlice";

interface VoiceAssistantProps {
  agentId: number;
  specificChatId: number | null;
}

const VoiceAssistant: FC<VoiceAssistantProps> = ({
  agentId,
  specificChatId,
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

  const dispatch = useAppDispatch();
  const inText = useAppSelector(selectVoiceResponse);
  // const stopAudioPlaying = useAppSelector(selectVoiceResponse);
  const [agentVoice] = useAgentVoiceMutation();
  const { data: allAgents } = useGetAllAgentsQuery();
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
        setError("Voice input was not clearly taken. Please record again.");
      } finally {
        setIsProcessing(false);
      }
    },
    [allAgents, agentVoice, agentId, dispatch]
  );

  // useEffect(() => {
  //   return () => {};
  // });

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
    //@ts-ignore
    mediaStream.getTracks().forEach((track) => {
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
        setIsPlaying(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
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
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeAudio = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
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
    <div className="container mx-auto h-[500px] flex flex-col items-center py-10 gap-10">
      <div className="mb-6 text-center">
        <p className="font-bold text-gray-800">Voice Assistant</p>
        <p className="text-sm font-semibold text-gray-500">
          Record your voice and get the response
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={startRecording}
            type="button"
            className={`flex items-center justify-center bg-blue-500 text-white rounded-full p-4 transition-transform transform ${
              isRecording || isPlaying
                ? "scale-100 cursor-not-allowed"
                : "scale-105 hover:scale-110"
            } `}
            disabled={isRecording || isPlaying}
          >
            <FaMicrophone size={24} />
          </button>
          <button
            className={`flex items-center justify-center bg-red-500 text-white rounded-full p-4 transition-transform transform ${
              !isRecording
                ? "scale-100 cursor-not-allowed"
                : "scale-105 hover:scale-110"
            }`}
            onClick={stopRecording}
            type="button"
            disabled={!isRecording}
          >
            <FaStop size={24} />
          </button>
        </div>
        {isProcessing && <ClipLoader color="#000" size={50} />}
        {error && (
          <div className="mt-4 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
        <div className="overflow-y-scroll scrollbar-hide">
          <div className="h-[274px]">
            {inText && (
              <div className="mt-6 text-center bg-white p-4 rounded shadow-md">
                <p className="text-lg font-semibold text-gray-700">Response:</p>
                <p className="text-md text-gray-600">{inText}</p>
                {isPlaying && (
                  <div className="flex items-center justify-center mt-4">
                    {!isPaused ? (
                      <button
                        onClick={pauseAudio}
                        className="flex items-center justify-center bg-yellow-500 text-white rounded-full p-3 transition-transform transform hover:scale-110"
                      >
                        <FaPause size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={resumeAudio}
                        className="flex items-center justify-center bg-green-500 text-white rounded-full p-3 transition-transform transform hover:scale-110"
                      >
                        <FaPlay size={20} />
                      </button>
                    )}
                  </div>
                )}
                <button
                  onClick={resetResponse}
                  className="flex items-center justify-center bg-green-500 text-white rounded-full p-3 mt-4 transition-transform transform hover:scale-110"
                >
                  <FaRedo size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
