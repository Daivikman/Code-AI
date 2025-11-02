import React, { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon, LoadingIcon, CopyIcon, CheckIcon } from './IconComponents';
import { getVoiceResponse } from '../services/geminiService';

// Fix: Add types for the experimental SpeechRecognition API to the global window object.
// This resolves TypeScript errors for `window.SpeechRecognition` and `window.webkitSpeechRecognition`.
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Browser-specific SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
}

const VoiceAssistantPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState<{ speaker: 'User' | 'CodeAI', text: string }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel(); // Stop any previous speech
    window.speechSynthesis.speak(utterance);
  };

  const processTranscript = async (text: string) => {
    setTranscript(prev => [...prev, { speaker: 'User', text }]);
    setIsLoading(true);

    const aiResponseText = await getVoiceResponse(text);

    setTranscript(prev => [...prev, { speaker: 'CodeAI', text: aiResponseText }]);
    speak(aiResponseText);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      const currentTranscript = event.results[0][0].transcript;
      processTranscript(currentTranscript);
    };
  }, []);
  
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [transcript]);

  const handleToggleListen = () => {
    if (!recognition) {
        alert("Sorry, your browser doesn't support speech recognition.");
        return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      setTranscript([]); // Clear previous conversation
      recognition.start();
    }
  };

  const handleCopy = (text: string, index: number) => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const getButtonState = () => {
    if (isLoading) return { text: 'Processing...', disabled: true, className: 'bg-gray-600', icon: <LoadingIcon className="h-10 w-10 text-white animate-spin" /> };
    if (isListening) return { text: 'Listening...', disabled: false, className: 'bg-red-500 animate-pulse', icon: <MicrophoneIcon className="h-10 w-10 text-white" /> };
    return { text: 'Tap to speak', disabled: false, className: 'bg-cyan-500 hover:bg-cyan-400', icon: <MicrophoneIcon className="h-10 w-10 text-white" /> };
  };

  const buttonState = getButtonState();

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-orbitron font-bold text-cyan-400">Voice Assistant</h1>
        <p className="text-gray-400 mt-2">Speak your commands. Code, query, and create with your voice.</p>
      </div>
      
      <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-6 min-h-[50vh] flex flex-col">
        <div ref={scrollRef} className="flex-grow space-y-4 overflow-y-auto pr-2">
          {transcript.map((line, index) => (
            <div key={index} className={`relative group flex flex-col p-3 rounded-lg max-w-[80%] ${line.speaker === 'User' ? 'bg-cyan-800 self-end ml-auto' : 'bg-gray-700 self-start mr-auto'}`}>
              <p className={`text-white text-sm whitespace-pre-wrap ${line.speaker === 'CodeAI' ? 'pr-8' : ''}`}>{line.text}</p>
              <span className="text-xs text-gray-400 self-start mt-1">{line.speaker}</span>
              {line.speaker === 'CodeAI' && (
                  <button
                    onClick={() => handleCopy(line.text, index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full text-gray-400 bg-gray-800/50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:text-white"
                    aria-label="Copy response"
                  >
                    {copiedIndex === index ? (
                      <CheckIcon className="h-4 w-4 text-green-400" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </button>
              )}
            </div>
          ))}
           {transcript.length === 0 && (
            <div className="text-center text-gray-500 flex-grow flex items-center justify-center">
              <p>Click the microphone to start a new conversation.</p>
            </div>
           )}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center">
          <button 
            onClick={handleToggleListen}
            disabled={buttonState.disabled}
            className={`relative rounded-full p-6 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 ${buttonState.className}`}
            aria-label={buttonState.text}
          >
            {isListening && !isLoading && (
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
            )}
            {buttonState.icon}
          </button>
          <p className="mt-4 text-gray-400">{buttonState.text}</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;