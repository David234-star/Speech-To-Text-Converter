// services/api.ts
// import axios from 'axios';
import { FieldValues } from 'react-hook-form';

// IMPORTANT: Replace with your actual Flask backend URL
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

/*
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
*/

// You can add interceptors here to handle tokens for authenticated requests
// For example:
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Mock API functions (replace with actual calls)

// Auth
export const signInUser = async (data: FieldValues) => {
  // const response = await api.post('/auth/login', data);
  // return response.data;
  console.log('Signing in user:', data.email);
  return { user: { email: data.email, username: 'DemoUser' }, token: 'fake-jwt-token' };
};

export const signUpUser = async (data: FieldValues) => {
  // const response = await api.post('/auth/register', data);
  // return response.data;
  console.log('Signing up user:', data.email);
  return { user: { email: data.email, username: data.username }, token: 'fake-jwt-token' };
};

// Transcription
export const uploadAudioFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  // const response = await api.post('/transcribe/upload', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // });
  // return response.data;
  console.log('Uploading file:', file.name);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
  return { transcription: `This is a mock transcription for the file: ${file.name}` };
};

// History
export const fetchHistory = async () => {
  // const response = await api.get('/history');
  // return response.data;
  console.log('Fetching history...');
  return [
    { id: 1, name: 'Project Kickoff Meeting.mp3', date: '2025-11-10', duration: '45:12' },
    { id: 2, name: 'Live Recording - Brainstorm', date: '2025-11-09', duration: '12:34' },
  ];
};

export const deleteHistory = async (id: number) => {
  // await api.delete(`/history/${id}`);
  console.log(`Deleting history item: ${id}`);
  return { success: true };
};