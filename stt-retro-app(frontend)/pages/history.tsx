// pages/history.tsx
import { useEffect } from 'react';
import { FaDownload, FaTrash, FaEye } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import { fetchHistory, deleteHistory } from '@/services/api';
import toast from 'react-hot-toast';
import { HistoryItem } from '@/types';

const HistoryPage = () => {
  const { history, setHistory, deleteHistoryItem } = useAppStore();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (error) {
        toast.error("Could not fetch history.");
        console.error(error);
      }
    };
    getHistory();
  }, [setHistory]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteHistory(id);
        deleteHistoryItem(id);
        toast.success('Item deleted.');
      } catch {
        toast.error('Failed to delete item.');
      }
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-orbitron text-center mb-8">Transcription History</h1>
      {/* ... Search Bar ... */}
      <div className="space-y-4">
        {history.length > 0 ? history.map((item: HistoryItem) => (
          <div key={item.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:border-neon-cyan transition-colors">
            <div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-sm text-gray-400">{item.date} • {item.duration}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-full bg-white/10 hover:bg-neon-cyan hover:text-black transition-colors" title="Reopen"><FaEye /></button>
              <button className="p-3 rounded-full bg-white/10 hover:bg-neon-cyan hover:text-black transition-colors" title="Download"><FaDownload /></button>
              <button onClick={() => handleDelete(item.id)} className="p-3 rounded-full bg-white/10 hover:bg-neon-magenta hover:text-white transition-colors" title="Delete"><FaTrash /></button>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-400">No history found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;