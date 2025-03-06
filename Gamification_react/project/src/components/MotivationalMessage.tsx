import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MotivationalMessageProps {
  message: string | null;
  onClose: () => void;
}

const MotivationalMessage: React.FC<MotivationalMessageProps> = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              type: "spring",
              damping: 20,
              stiffness: 300
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            scale: 0.8,
            transition: {
              duration: 0.2
            }
          }}
        >
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg max-w-md text-center font-medium"
            animate={{ 
              boxShadow: [
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              ]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
          >
            <div className="flex items-center justify-center">
              <span>{message}</span>
              <motion.button 
                className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotivationalMessage;