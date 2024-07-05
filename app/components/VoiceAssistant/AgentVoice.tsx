"use client";
import React, { useState, useEffect, useCallback, useRef, FC } from "react";
import { ClipLoader } from "react-spinners";
import {
  FaMicrophone,
  FaRedo,
  FaPlay,
  FaPause,
  FaRegStopCircle,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import RefreshIcon from "@/app/assets/icons/reload.png";
import {
  useAgentVoiceMutation,
  useGetAllAgentsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";
import Image from "next/image";

interface AgentVoiceProps {
  agentId: number;
}

const AgentVoice: FC<AgentVoiceProps> = ({ agentId }) => {
  const [response, setResponse] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [toggleRecording, setToggleRecording] = useState<boolean>(true);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
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
        console.log("audio", blobUrl);
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

  //converting text message to audio
  const convertTextToAudio = () => {
    const audioChunks: BlobPart[] = [];

    const mediaRecorder = new MediaRecorder(new MediaStream());
    mediaChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        mediaChunksRef.current.push(event.data);
      }
    };

    const blob = new Blob(mediaChunksRef.current, { type: "audio/webm" });
    const blobUrl = URL.createObjectURL(blob);
    setMediaBlobUrl(blobUrl);
    setIsRecording(false);

    // mediaRecorderRef.current = mediaRecorder;
    // mediaRecorder.start();
    // mediaRecorder.ondataavailable = (event) => {
    //   if (event.data.size > 0) {
    //     audioChunks.push(event.data);
    //   }
    // };
    // const blob = new Blob(mediaChunksRef.current, { type: "audio/webm" });
    // handleStop(URL.createObjectURL(blob));
  };
  return (
    <div className="container mx-auto h-[500px] flex flex-col justify-between overflow-auto">
      <div className="p-3">
        <div className="flex justify-end">
          <Image
            src={RefreshIcon}
            alt=""
            className="w-6 cursor-pointer hover:rotate-180 transition-all duration-500"
          />
        </div>
        <div className="border-b border-gray-200 w-full my-3"></div>
        {/* {audioBlob && (
          <audio controls>
            <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          </audio>
        )} */}
      </div>
      <div className="flex items-center gap-2 border-t border-gray-200 p-3">
        <input
          type="text"
          placeholder="Message..."
          className="w-full focus:outline-none text-gray-900"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* {toggleRecording ? (
          <div
            onClick={() => {
              startRecording();
              setToggleRecording(false);
            }}
          >
            <FaMicrophone color="#71717A" width={24} />
          </div>
        ) : (
          <div
            onClick={() => {
              stopRecording();
              setToggleRecording(true);
            }}
          >
            <FaRegStopCircle color="#71717A" width={24} />
          </div>
        )} */}
        <div onClick={convertTextToAudio}>
          <IoMdSend color="#71717A" width={90} />
        </div>
      </div>
    </div>
  );
};

export default AgentVoice;
