import { useRef } from 'react';
import { useAppStore } from '@/store/appStore';
import { socket } from '@/services/socket';
import toast from 'react-hot-toast';

export const useLiveTranscription = () => {
  const { setRecording, isRecording, setLiveTranscript, connectSocket, disconnectSocket } = useAppStore();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    if (isRecording || !navigator.mediaDevices) {
      return;
    }
    try {
      setLiveTranscript(''); // Clear previous transcript
      connectSocket();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socket.connected) {
          socket.emit('stream_audio', event.data);
        }
      };
      
      mediaRecorder.onstart = () => {
        setRecording(true);
        toast('Recording started!', { icon: '🎤' });
      };
      
      mediaRecorder.onstop = () => {
        setRecording(false);
        // Stop all tracks to turn off the microphone indicator
        streamRef.current?.getTracks().forEach(track => track.stop());
        disconnectSocket();
        toast.success("Recording stopped.");
      };

      // Start recording and send data in chunks
      mediaRecorder.start(500); // Send data every 500ms
      
    } catch (err) {
      console.error('Error starting recording:', err);
      toast.error('Could not access microphone.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  return { startRecording, stopRecording };
};