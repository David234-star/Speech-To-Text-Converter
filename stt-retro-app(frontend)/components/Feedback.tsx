// components/Feedback.tsx
import { useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-neon-magenta/80 text-white rounded-full flex items-center justify-center shadow-glow-magenta hover:animate-pulse-glow transition-all"
        aria-label="Open feedback form"
      >
        <FaCommentDots size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-8 w-full max-w-md m-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              aria-label="Close feedback form"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="font-orbitron text-2xl mb-4 text-white">Share Your Feedback</h2>
            <form>
              <div className="mb-4">
                <p className="mb-2">How was your experience?</p>
                <div className="flex justify-around text-3xl">
                  {['😞', '😐', '😊', '😁', '🤩'].map((emoji) => (
                    <button key={emoji} type="button" className="p-2 rounded-full hover:bg-white/20 transition-colors">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Tell us what you think..."
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-md font-semibold bg-neon-cyan text-black hover:shadow-glow-cyan transition-shadow"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;