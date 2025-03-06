import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, CheckCircle2 } from 'lucide-react';
import { DailyChallenge } from '../types';
import { useGameStore } from '../store/gameStore';

interface DailyChallengesProps {
  challenges: DailyChallenge[];
  onClose: () => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({ challenges, onClose }) => {
  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const panelVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const challengeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };
  
  // Format expiry time
  const formatExpiryTime = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    
    const diffMs = expiry.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m`;
    } else {
      return `${diffMins}m`;
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div 
        className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl w-full max-w-md overflow-hidden flex flex-col"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-black/30 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Award className="text-yellow-400" />
            Daily Challenges
          </h2>
          
          <motion.button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>
        
        {/* Challenges content */}
        <div className="p-6">
          <p className="text-gray-300 mb-4">Complete these daily challenges to earn bonus rewards!</p>
          
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div 
                key={challenge.id}
                className={`rounded-lg p-4 ${
                  challenge.completed 
                    ? 'bg-green-900/20 border border-green-500/30' 
                    : 'bg-white/5'
                }`}
                variants={challengeVariants}
                custom={index}
                initial="hidden"
                animate="visible"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{challenge.title}</h3>
                  <motion.span 
                    className="text-yellow-400 font-bold flex items-center gap-1"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      repeatDelay: 1
                    }}
                  >
                    <Coins size={14} />
                    {challenge.reward}
                  </motion.span>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{challenge.description}</p>
                
                <div className="flex justify-between items-center">
                  {/* Progress bar */}
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{challenge.currentAmount} / {challenge.targetAmount}</span>
                      {!challenge.completed && (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock size={12} />
                          <span>{formatExpiryTime(challenge.expiresAt)}</span>
                        </div>
                      )}
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${challenge.completed ? 'bg-green-500' : 'bg-indigo-500'}`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.min(100, (challenge.currentAmount / challenge.targetAmount) * 100)}%` 
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  {challenge.completed ? (
                    <motion.div 
                      className="bg-green-800 text-green-200 p-1 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 3,
                        delay: index * 0.2
                      }}
                    >
                      <CheckCircle2 size={18} />
                    </motion.div>
                  ) : (
                    <div className="text-xs text-gray-400">In progress</div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {challenges.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No active challenges. Check back tomorrow!
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add missing Coins component
const Coins = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);

export default DailyChallenges;