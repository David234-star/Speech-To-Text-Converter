import { create } from 'zustand';
import { socket } from '@/services/socket';
import { HistoryItem } from '@/types';

export interface AppState {
  // Auth
  user: { email: string; username: string } | null;
  isAuthenticated: boolean;
  
  // Transcription
  liveTranscript: string;
  isRecording: boolean;
  isSocketConnected: boolean;

  // History
  history: HistoryItem[];

  // Actions
  login: (user: { email: string; username: string }, token: string) => void;
  logout: () => void;
  setLiveTranscript: (text: string) => void;
  setRecording: (status: boolean) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
  setHistory: (history: HistoryItem[]) => void;
  deleteHistoryItem: (id: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  liveTranscript: '',
  isRecording: false,
  isSocketConnected: false,
  history: [],

  login: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    get().disconnectSocket();
    set({ user: null, isAuthenticated: false });
  },
  setLiveTranscript: (text) => set({ liveTranscript: text }),
  setRecording: (status) => set({ isRecording: status }),

  connectSocket: () => {
    if (socket.disconnected) {
      socket.connect();
      
      socket.on('connect', () => {
        set({ isSocketConnected: true });
        console.log('Socket connected');
      });

      socket.on('transcript_update', (data: { transcript: string }) => {
        set((state) => ({ liveTranscript: state.liveTranscript + data.transcript }));
      });

      socket.on('disconnect', () => {
        set({ isSocketConnected: false });
        console.log('Socket disconnected');
      });
    }
  },
  
  disconnectSocket: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },

  setHistory: (history) => set({ history }),
  deleteHistoryItem: (id) => set((state) => ({
    history: state.history.filter((item) => item.id !== id)
  })),
}));