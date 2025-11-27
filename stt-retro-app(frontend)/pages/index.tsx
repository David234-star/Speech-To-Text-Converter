import { useState } from 'react';
import Link from 'next/link';
import { FaMicrophone, FaStop, FaUpload, FaFileAudio, FaWaveSquare } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import { uploadAudioFile } from '@/services/api';
import toast from 'react-hot-toast';
import { useLiveTranscription } from '@/hooks/useLiveTranscription';

const Dashboard = () => {
  const { isAuthenticated, liveTranscript, isRecording, user } = useAppStore();
  const { startRecording, stopRecording } = useLiveTranscription();
  
  const [file, setFile] = useState<File | null>(null);
  const [fileTranscription, setFileTranscription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success(`Selected: ${e.target.files[0].name}`);
    }
  };

  const handleTranscribeFile = async () => {
    if (!file) return toast.error('No file selected!');
    setIsUploading(true);
    const toastId = toast.loading('Uploading and transcribing...');
    try {
      const res = await uploadAudioFile(file);
      setFileTranscription(res.transcription);
      toast.success('File transcribed!', { id: toastId });
    } catch (error) {
      toast.error('Transcription failed.', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  // ---------------------------------------------------------
  // 1. LANDING PAGE VIEW (If not logged in)
  // ---------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
        <div className="space-y-4 animate-pulse-slow">
            <FaWaveSquare className="text-6xl text-neon-cyan mx-auto drop-shadow-[0_0_10px_rgba(0,245,212,0.5)]" />
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta">
            EchoScribe
            </h1>
            <p className="text-xl text-text-secondary max-w-lg mx-auto font-outfit">
            The Retro-Futuristic Speech-to-Text Engine. <br/>
            Record live or upload audio with AI precision.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link href="/auth/signin" className="px-8 py-4 rounded-full font-orbitron font-bold text-lg bg-white/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-navy hover:shadow-glow-cyan transition-all duration-300">
            Login to Terminal
            </Link>
            <Link href="/auth/signup" className="px-8 py-4 rounded-full font-orbitron font-bold text-lg bg-neon-magenta text-white hover:bg-white hover:text-neon-magenta hover:shadow-glow-magenta transition-all duration-300">
            Create Account
            </Link>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 2. DASHBOARD VIEW (If logged in)
  // ---------------------------------------------------------
  const currentTranscription = liveTranscript || fileTranscription || "System ready. Waiting for audio input...";

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center mb-4">
        <h2 className="font-orbitron text-2xl text-white">Welcome back, <span className="text-neon-cyan">{user?.username}</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls (4 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
            
          {/* Live Recording Card */}
          <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center shadow-lg group hover:border-neon-cyan/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-transparent opacity-50"></div>
            <h3 className="font-orbitron text-xl mb-6 text-neon-cyan tracking-wider">LIVE FEED</h3>
            
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-2xl
                ${isRecording 
                  ? 'border-neon-magenta bg-neon-magenta/20 shadow-glow-magenta animate-pulse' 
                  : 'border-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/20 shadow-glow-cyan'}`}
            >
              {isRecording ? <FaStop size={40} className="text-neon-magenta" /> : <FaMicrophone size={40} className="text-neon-cyan" />}
            </button>
            
            <p className="mt-6 font-mono text-sm text-text-secondary">
                {isRecording ? "● REC [ON AIR]" : "STATUS: IDLE"}
            </p>
          </div>

          {/* Upload Card */}
          <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg hover:border-neon-cyan/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-magenta to-transparent opacity-50"></div>
            <h3 className="font-orbitron text-xl mb-6 text-neon-magenta tracking-wider">DATA UPLOAD</h3>
            
            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-neon-magenta hover:bg-white/5 transition-all group">
                <FaUpload className="text-4xl text-gray-500 mb-3 group-hover:text-neon-magenta transition-colors" />
                <p className="font-outfit text-gray-300 group-hover:text-white transition-colors">{file ? file.name : 'Drop .mp3 / .wav file'}</p>
                <input type="file" className="hidden" onChange={handleFileChange} accept=".mp3,.wav,.m4a" />
            </label>
            
            <button 
                onClick={handleTranscribeFile} 
                disabled={isUploading || !file}
                className="w-full mt-4 py-3 rounded-lg font-orbitron font-bold text-sm bg-white/10 border border-white/20 hover:bg-neon-magenta hover:text-white hover:border-neon-magenta disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isUploading ? 'PROCESSING...' : 'INITIATE TRANSCRIBE'}
            </button>
          </div>
        </div>

        {/* Right Column: Output (8 cols) */}
        <div className="lg:col-span-7 h-full">
          <div className="h-full flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="font-orbitron text-lg text-neon-cyan flex items-center gap-2">
                    <FaFileAudio /> TRANSCRIPT LOG
                </h3>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
            </div>
            <div className="flex-grow p-6 overflow-y-auto font-mono text-lg leading-loose text-gray-200">
                {currentTranscription}
                {isRecording && <span className="inline-block w-2 h-5 ml-1 bg-neon-cyan animate-pulse"></span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;