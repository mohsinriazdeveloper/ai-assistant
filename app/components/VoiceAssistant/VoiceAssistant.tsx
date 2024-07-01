"use client";
import React, { useState, useEffect, useCallback, useRef, FC } from "react";
import { ClipLoader } from "react-spinners";
import { FaMicrophone, FaStop, FaRedo, FaPlay, FaPause } from "react-icons/fa";
import {
  useAgentVoiceMutation,
  useGetAllAgentsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";

interface VoiceAssistantProps {
  agentId: number;
}

const VoiceAssistant: FC<VoiceAssistantProps> = ({ agentId }) => {
  const [response, setResponse] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [agentVoice] = useAgentVoiceMutation();
  const { data: allAgents } = useGetAllAgentsQuery();

  const handleStop = useCallback(
    async (blobUrl: string | null) => {
      if (!blobUrl) {
        setError("Recording failed. Please try again.");
        return;
      }

      // if (!allAgents || !allAgents.id) {
      if (!agentId) {
        setError("Agent information is not available. Please try again.");
        return;
      }

      setIsProcessing(true);
      setError(null); // Clear any existing errors
      try {
        // Fetch the original blob
        const originalBlob = await fetch(blobUrl).then((r) => r.blob());

        // Create a FormData object and append the new Blob
        const formData = new FormData();
        formData.append("audio", originalBlob, "audio.wav");
        formData.append("agent_id", agentId.toString());

        // Send the FormData object to the server using Redux Toolkit mutation
        const result = await agentVoice(formData).unwrap();

        const responseText = result.response;

        setResponse(responseText);
      } catch (error) {
        console.error("Error processing audio:", error);
        setError("Voice input was not clearly taken. Please record again.");
      } finally {
        setIsProcessing(false);
      }
    },
    [allAgents, agentVoice]
  );

  useEffect(() => {
    if (mediaBlobUrl) {
      handleStop(mediaBlobUrl);
      setMediaBlobUrl(null); // Clear the blob URL after processing
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
      const mediaRecorder = new MediaRecorder(stream);
      mediaChunksRef.current = [];

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
      utteranceRef.current = utterance;
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
    setResponse("");
    setIsPlaying(false);
    setIsPaused(false);
    setError(null); // Clear any existing errors
    speechSynthesis.cancel(); // Cancel any ongoing speech synthesis
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
        {response && (
          <div className="mt-6 text-center bg-white p-4 rounded shadow-md w-3/4">
            <p className="text-lg font-semibold text-gray-700">Response:</p>
            <p className="text-md text-gray-600">{response}</p>
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
  );
};

export default VoiceAssistant;
