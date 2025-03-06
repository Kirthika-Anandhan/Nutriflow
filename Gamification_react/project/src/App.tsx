import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Droplets, Wind, Timer, Coins, Award, TrendingUp, ShoppingBag, User, Settings, Calendar } from 'lucide-react';
import Character from './components/Character';
import GymEnvironment from './components/GymEnvironment';
import UpgradeShop from './components/UpgradeShop';
import TaskPanel from './components/TaskPanel';
import StatsPanel from './components/StatsPanel';
import CustomizationPanel from './components/CustomizationPanel';
import DailyChallenges from './components/DailyChallenges';
import MotivationalMessage from './components/MotivationalMessage';
import { Task, Upgrade, GymArea } from './types';
import { generateRandomTask } from './utils/gameUtils';
import { useGameStore } from './store/gameStore';
import soundManager from './utils/soundManager';

function App() {
  const { 
    coins, 
    streak, 
    characterPosition, 
    currentArea, 
    showShop, 
    showStats, 
    tasks, 
    upgrades, 
    unlockedAreas, 
    stats, 
    dailyChallenges,
    motivationalMessage,
    
    setCharacterPosition, 
    setCurrentArea, 
    toggleShop, 
    toggleStats, 
    completeTask, 
    purchaseUpgrade, 
    performAction, 
    handleAreaClick,
    checkDailyLogin,
    clearMessage,
    updateCooldowns
  } = useGameStore();
  
  const [showCustomization, setShowCustomization] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Initialize game state and check daily login
  useEffect(() => {
    checkDailyLogin();
    
    // Start background music
    soundManager.play('music');
    
    // Update cooldowns periodically
    const cooldownInterval = setInterval(() => {
      updateCooldowns();
    }, 1000);
    
    return () => {
      clearInterval(cooldownInterval);
      soundManager.stop('music');
    };
  }, []);
  
  // Header button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.9 }
  };
  
  // Quick action button variants
  const quickActionVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.9 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <motion.header 
        className="p-4 flex justify-between items-center bg-black/30 backdrop-blur-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
          >
            <Dumbbell className="text-yellow-400" size={28} />
          </motion.div>
          <h1 className="text-2xl font-bold">Health Tycoon</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div 
            className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full"
            animate={{ 
              scale: [1, 1.03, 1],
              backgroundColor: ["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.25)", "rgba(0, 0, 0, 0.2)"]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 3
            }}
          >
            <Coins className="text-yellow-400" />
            <span className="font-bold">{coins}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full"
            animate={{ 
              scale: streak >= 7 ? [1, 1.05, 1] : 1,
              backgroundColor: streak >= 7 ? ["rgba(0, 0, 0, 0.2)", "rgba(234, 179, 8, 0.2)", "rgba(0, 0, 0, 0.2)"] : undefined
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
          >
            <Award className={streak >= 7 ? "text-yellow-400" : "text-gray-400"} />
            <span className="font-bold">{streak} day streak</span>
            {streak >= 7 && (
              <motion.span 
                className="text-xs bg-yellow-500 text-yellow-900 px-1.5 py-0.5 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5
                }}
              >
                +50%
              </motion.span>
            )}
          </motion.div>
          
          <motion.button 
            onClick={() => setShowChallenges(true)}
            className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition-colors"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Calendar size={20} />
          </motion.button>
          
          <motion.button 
            onClick={() => setShowCustomization(true)}
            className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition-colors"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <User size={20} />
          </motion.button>
          
          <motion.button 
            onClick={() => toggleStats()}
            className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition-colors"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <TrendingUp size={20} />
          </motion.button>
          
          <motion.button 
            onClick={() => toggleShop()}
            className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition-colors"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <ShoppingBag size={20} />
          </motion.button>
          
          <motion.button 
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition-colors"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </motion.header>

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        {/* Main Game Area */}
        <motion.div 
          className="flex-1 bg-black/20 backdrop-blur-md rounded-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GymEnvironment 
            currentArea={currentArea}
            unlockedAreas={unlockedAreas}
            upgrades={upgrades.filter(u => u.owned)}
            onAreaClick={handleAreaClick}
          />
          
          <Character position={characterPosition} />
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <motion.button 
              onClick={() => performAction('drinkWater')}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors"
              title="Drink Water (+5 coins)"
              variants={quickActionVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Droplets size={20} />
            </motion.button>
            
            <motion.button 
              onClick={() => performAction('meditate')}
              className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors"
              title="Meditate (+10 coins)"
              variants={quickActionVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Wind size={20} />
            </motion.button>
            
            <motion.button 
              onClick={() => performAction('rest')}
              className="p-3 rounded-full bg-amber-600 hover:bg-amber-500 transition-colors"
              title="Rest (Recover stamina)"
              variants={quickActionVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Timer size={20} />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Side Panel */}
        <motion.div 
          className="w-full md:w-80 flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Current Area Info */}
          <motion.div 
            className="bg-black/20 backdrop-blur-md rounded-xl p-4"
            whileHover={{ 
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.2 }
            }}
          >
            <h2 className="text-xl font-bold mb-2 capitalize">{currentArea} Area</h2>
            <p className="text-gray-300 mb-4">
              {currentArea === 'cardio' && 'Improve your cardiovascular health and burn calories.'}
              {currentArea === 'strength' && 'Build muscle and increase your strength.'}
              {currentArea === 'wellness' && 'Focus on mental health and relaxation.'}
              {currentArea === 'nutrition' && 'Fuel your body with healthy options.'}
              {currentArea === 'home' && 'Rest and recover your energy.'}
            </p>
            
            {/* Daily challenges preview */}
            {dailyChallenges.length > 0 && (
              <motion.div 
                className="mt-2 bg-indigo-900/30 rounded-lg p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ 
                  backgroundColor: "rgba(79, 70, 229, 0.4)",
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowChallenges(true)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm flex items-center gap-1">
                    <Calendar size={14} className="text-yellow-400" />
                    Daily Challenges
                  </h3>
                  <span className="text-xs text-indigo-300">{dailyChallenges.filter(c => c.completed).length}/{dailyChallenges.length}</span>
                </div>
                
                {dailyChallenges.slice(0, 1).map(challenge => (
                  <div key={challenge.id} className="text-xs text-gray-300 flex justify-between">
                    <span>{challenge.title}</span>
                    <span className="text-yellow-400">{challenge.currentAmount}/{challenge.targetAmount}</span>
                  </div>
                ))}
                
                <div className="text-xs text-indigo-300 text-center mt-1">
                  Click to view all challenges
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Tasks */}
          <TaskPanel 
            tasks={tasks.filter(task => task.area === currentArea || task.area === 'general')}
            onCompleteTask={completeTask}
          />
        </motion.div>
      </div>
      
      {/* Modals */}
      <AnimatePresence>
        {/* Upgrade Shop Modal */}
        {showShop && (
          <UpgradeShop 
            upgrades={upgrades}
            coins={coins}
            onPurchase={purchaseUpgrade}
            onClose={() => toggleShop()}
          />
        )}
        
        {/* Stats Modal */}
        {showStats && (
          <StatsPanel 
            stats={stats}
            streak={streak}
            onClose={() => toggleStats()}
          />
        )}
        
        {/* Customization Modal */}
        {showCustomization && (
          <CustomizationPanel 
            onClose={() => setShowCustomization(false)}
          />
        )}
        
        {/* Daily Challenges Modal */}
        {showChallenges && (
          <DailyChallenges 
            challenges={dailyChallenges}
            onClose={() => setShowChallenges(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Motivational Message */}
      <MotivationalMessage 
        message={motivationalMessage}
        onClose={clearMessage}
      />
    </div>
  );
}

export default App;