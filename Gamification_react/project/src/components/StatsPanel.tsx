import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, Dumbbell, Droplets, Wind, Coins, TrendingUp, Calendar } from 'lucide-react';
import { Stats } from '../types';

interface StatsPanelProps {
  stats: Stats;
  streak: number;
  onClose: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, streak, onClose }) => {
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
  
  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };
  
  const achievementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.3
      }
    })
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl w-full max-w-md overflow-hidden flex flex-col"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="p-4 bg-black/30 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Award className="text-yellow-400" />
            Your Progress
          </h2>
          
          <motion.button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>
        
        {/* Stats content */}
        <div className="p-6">
          {/* Streak highlight */}
          <motion.div 
            className="mb-4 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-lg p-4 flex items-center justify-between"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                delay: 0.1,
                duration: 0.3
              }
            }}
          >
            <div>
              <div className="text-sm text-gray-400">Current Streak</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-yellow-400">{streak}</span>
                <span className="ml-1 text-gray-400">days</span>
              </div>
              {streak >= 7 && (
                <div className="text-xs text-yellow-300 mt-1">
                  🔥 50% coin bonus active!
                </div>
              )}
            </div>
            <motion.div 
              className="bg-yellow-500/20 p-3 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3
              }}
            >
              <Calendar size={28} className="text-yellow-400" />
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Workouts */}
            <motion.div 
              className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center"
              variants={statCardVariants}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <Dumbbell size={28} className="text-blue-400 mb-2" />
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {stats.workoutsCompleted}
              </motion.div>
              <div className="text-sm text-gray-400">Workouts</div>
            </motion.div>
            
            {/* Water */}
            <motion.div 
              className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center"
              variants={statCardVariants}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <Droplets size={28} className="text-blue-400 mb-2" />
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                {stats.waterDrank}
              </motion.div>
              <div className="text-sm text-gray-400">Water Drinks</div>
            </motion.div>
            
            {/* Meditation */}
            <motion.div 
              className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center"
              variants={statCardVariants}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <Wind size={28} className="text-purple-400 mb-2" />
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                {stats.meditationMinutes}
              </motion.div>
              <div className="text-sm text-gray-400">Meditation Minutes</div>
            </motion.div>
            
            {/* Challenges */}
            <motion.div 
              className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center"
              variants={statCardVariants}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <TrendingUp size={28} className="text-green-400 mb-2" />
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                {stats.challengesCompleted}
              </motion.div>
              <div className="text-sm text-gray-400">Challenges Completed</div>
            </motion.div>
          </div>
          
          {/* Total coins earned */}
          <motion.div 
            className="mt-4 bg-white/5 rounded-lg p-4 flex items-center justify-between"
            variants={statCardVariants}
            custom={4}
            initial="hidden"
            animate="visible"
          >
            <div>
              <div className="text-sm text-gray-400">Total Coins Earned</div>
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                {stats.coinsEarned}
              </motion.div>
            </div>
            <motion.div 
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 5
              }}
            >
              <Coins size={32} className="text-yellow-400" />
            </motion.div>
          </motion.div>
          
          {/* Achievements */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3 border-b border-white/10 pb-2">Achievements</h3>
            
            <div className="space-y-3">
              {stats.workoutsCompleted >= 5 && (
                <motion.div 
                  className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
                  variants={achievementVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    className="bg-yellow-500/20 p-2 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 3,
                      delay: 1
                    }}
                  >
                    <Dumbbell size={20} className="text-yellow-400" />
                  </motion.div>
                  <div>
                    <div className="font-bold">Workout Warrior</div>
                    <div className="text-xs text-gray-400">Completed 5+ workouts</div>
                  </div>
                </motion.div>
              )}
              
              {stats.waterDrank >= 5 && (
                <motion.div 
                  className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
                  variants={achievementVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    className="bg-blue-500/20 p-2 rounded-full"
                    animate={{ 
                      y: [0, -3, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      delay: 1.5
                    }}
                  >
                    <Droplets size={20} className="text-blue-400" />
                  </motion.div>
                  <div>
                    <div className="font-bold">Hydration Hero</div>
                    <div className="text-xs text-gray-400">Drank water 5+ times</div>
                  </div>
                </motion.div>
              )}
              
              {stats.meditationMinutes >= 15 && (
                <motion.div 
                  className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
                  variants={achievementVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    className="bg-purple-500/20 p-2 rounded-full"
                    animate={{ 
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      delay: 2
                    }}
                  >
                    <Wind size={20} className="text-purple-400" />
                  </motion.div>
                  <div>
                    <div className="font-bold">Zen Master</div>
                    <div className="text-xs text-gray-400">Meditated for 15+ minutes</div>
                  </div>
                </motion.div>
              )}
              
              {streak >= 3 && (
                <motion.div 
                  className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
                  variants={achievementVariants}
                  custom={3}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    className="bg-green-500/20 p-2 rounded-full"
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 3,
                      delay: 2.5
                    }}
                  >
                    <Award size={20} className="text-green-400" />
                  </motion.div>
                  <div>
                    <div className="font-bold">Consistency King</div>
                    <div className="text-xs text-gray-400">Maintained a 3+ day streak</div>
                  </div>
                </motion.div>
              )}
              
              {/* Show this if no achievements yet */}
              {stats.workoutsCompleted < 5 && stats.waterDrank < 5 && stats.meditationMinutes < 15 && streak < 3 && (
                <motion.div 
                  className="text-center py-4 text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: {
                      delay: 0.5
                    }
                  }}
                >
                  Complete more activities to unlock achievements!
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatsPanel;