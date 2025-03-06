import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Salad, Timer, Home, Music, Volume2 } from 'lucide-react';
import { GymArea, Upgrade } from '../types';
import { useGameStore } from '../store/gameStore';

interface GymEnvironmentProps {
  currentArea: GymArea;
  unlockedAreas: GymArea[];
  upgrades: Upgrade[];
  onAreaClick: (area: GymArea, position: { x: number; y: number }) => void;
}

const GymEnvironment: React.FC<GymEnvironmentProps> = ({ 
  currentArea, 
  unlockedAreas, 
  upgrades, 
  onAreaClick 
}) => {
  const { gymLevel } = useGameStore();
  
  // Check if specific upgrades are owned
  const hasPool = upgrades.some(u => u.id === 'pool');
  const hasJuiceBar = upgrades.some(u => u.id === 'juicebar');
  const hasSauna = upgrades.some(u => u.id === 'sauna');
  const hasPremiumTreadmill = upgrades.some(u => u.id === 'treadmill');
  const hasHeavyWeights = upgrades.some(u => u.id === 'weights');
  const hasYogaMat = upgrades.some(u => u.id === 'yogamat');
  const hasHomeArea = upgrades.some(u => u.id === 'homearea');
  const hasPremiumLighting = upgrades.some(u => u.id === 'lighting');
  const hasPremiumFlooring = upgrades.some(u => u.id === 'flooring');
  const hasSoundSystem = upgrades.some(u => u.id === 'speakers');

  // Get background style based on gym level and upgrades
  const getBackgroundStyle = () => {
    let bgGradient = 'from-gray-800 to-gray-900';
    
    if (gymLevel >= 3) {
      bgGradient = 'from-indigo-900 to-purple-900';
    } else if (gymLevel >= 2) {
      bgGradient = 'from-blue-900 to-indigo-800';
    }
    
    return `bg-gradient-to-b ${bgGradient}`;
  };

  // Area hover animation variants
  const areaHoverVariants = {
    initial: { scale: 1, boxShadow: '0 0 0 rgba(255, 255, 255, 0)' },
    hover: { 
      scale: 1.02, 
      boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={`w-full h-[500px] relative ${getBackgroundStyle()} overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-500"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-purple-500"></div>
        <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-green-500"></div>
        
        {/* Premium lighting effects */}
        {hasPremiumLighting && (
          <>
            <motion.div 
              className="absolute top-0 left-1/4 w-40 h-40 rounded-full bg-yellow-400 opacity-5"
              animate={{ 
                opacity: [0.05, 0.08, 0.05],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-blue-400 opacity-5"
              animate={{ 
                opacity: [0.05, 0.08, 0.05],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </>
        )}
        
        {/* Sound system visualization */}
        {hasSoundSystem && (
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <Music size={16} className="text-white opacity-30" />
            <div className="flex items-end h-4 gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="w-1 bg-white opacity-30 rounded-t"
                  animate={{ 
                    height: [
                      `${Math.random() * 8 + 4}px`, 
                      `${Math.random() * 16 + 4}px`,
                      `${Math.random() * 8 + 4}px`
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Premium flooring */}
      {hasPremiumFlooring && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-800 to-transparent opacity-50">
          <div className="absolute inset-0 flex flex-wrap opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-1/10 h-8 border-t border-l border-gray-600"></div>
            ))}
          </div>
        </div>
      )}
      
      {/* Cardio Area */}
      <motion.div 
        className={`absolute top-[10%] left-[20%] w-[25%] h-[35%] rounded-lg ${
          currentArea === 'cardio' 
            ? 'bg-blue-600/40 border-2 border-blue-400' 
            : 'bg-blue-900/20 hover:bg-blue-800/30 cursor-pointer'
        } transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center`}
        onClick={() => onAreaClick('cardio', { x: 20, y: 30 })}
        variants={areaHoverVariants}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ 
            y: currentArea === 'cardio' ? [0, -5, 0] : 0
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Timer size={32} className="text-blue-300 mb-2" />
        </motion.div>
        <h3 className="text-lg font-bold text-white">Cardio Zone</h3>
        
        {/* Upgraded equipment */}
        {hasPremiumTreadmill && (
          <div className="mt-2 px-3 py-1 bg-blue-500/30 rounded-full text-xs text-blue-200 flex items-center gap-1">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-2 h-2 rounded-full bg-blue-300"
            />
            Premium Treadmill
          </div>
        )}
        
        {hasPool && (
          <div className="mt-2 px-3 py-1 bg-blue-500/30 rounded-full text-xs text-blue-200 flex items-center gap-1">
            <motion.div
              animate={{ 
                y: [0, -2, 0],
                opacity: [1, 0.7, 1]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💦
            </motion.div>
            Swimming Pool
          </div>
        )}
      </motion.div>
      
      {/* Strength Area */}
      <motion.div 
        className={`absolute top-[10%] right-[20%] w-[25%] h-[35%] rounded-lg ${
          currentArea === 'strength' 
            ? 'bg-red-600/40 border-2 border-red-400' 
            : 'bg-red-900/20 hover:bg-red-800/30 cursor-pointer'
        } transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center`}
        onClick={() => onAreaClick('strength', { x: 80, y: 30 })}
        variants={areaHoverVariants}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ 
            rotate: currentArea === 'strength' ? [0, 5, 0, -5, 0] : 0
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Dumbbell size={32} className="text-red-300 mb-2" />
        </motion.div>
        <h3 className="text-lg font-bold text-white">Strength Zone</h3>
        
        {/* Upgraded equipment */}
        {hasHeavyWeights && (
          <div className="mt-2 px-3 py-1 bg-red-500/30 rounded-full text-xs text-red-200 flex items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🏋️
            </motion.div>
            Heavy Weights Set
          </div>
        )}
      </motion.div>
      
      {/* Wellness Area - Only show if unlocked */}
      {unlockedAreas.includes('wellness') && (
        <motion.div 
          className={`absolute bottom-[10%] left-[20%] w-[25%] h-[35%] rounded-lg ${
            currentArea === 'wellness' 
              ? 'bg-purple-600/40 border-2 border-purple-400' 
              : 'bg-purple-900/20 hover:bg-purple-800/30 cursor-pointer'
          } transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center`}
          onClick={() => onAreaClick('wellness', { x: 20, y: 70 })}
          variants={areaHoverVariants}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ 
              scale: currentArea === 'wellness' ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <Heart size={32} className="text-purple-300 mb-2" />
          </motion.div>
          <h3 className="text-lg font-bold text-white">Wellness Zone</h3>
          
          {/* Upgraded equipment */}
          {hasYogaMat && (
            <div className="mt-2 px-3 py-1 bg-purple-500/30 rounded-full text-xs text-purple-200 flex items-center gap-1">
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                🧘
              </motion.div>
              Pro Yoga Mat
            </div>
          )}
          
          {hasSauna && (
            <div className="mt-2 px-3 py-1 bg-purple-500/30 rounded-full text-xs text-purple-200 flex items-center gap-1">
              <motion.div
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.05, 1]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🔥
              </motion.div>
              Sauna Room
            </div>
          )}
        </motion.div>
      )}
      
      {/* Nutrition Area - Only show if unlocked */}
      {unlockedAreas.includes('nutrition') && (
        <motion.div 
          className={`absolute bottom-[10%] right-[20%] w-[25%] h-[35%] rounded-lg ${
            currentArea === 'nutrition' 
              ? 'bg-green-600/40 border-2 border-green-400' 
              : 'bg-green-900/20 hover:bg-green-800/30 cursor-pointer'
          } transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center`}
          onClick={() => onAreaClick('nutrition', { x: 80, y: 70 })}
          variants={areaHoverVariants}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ 
              y: currentArea === 'nutrition' ? [0, -3, 0] : 0
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <Salad size={32} className="text-green-300 mb-2" />
          </motion.div>
          <h3 className="text-lg font-bold text-white">Nutrition Zone</h3>
          
          {/* Upgraded equipment */}
          {hasJuiceBar && (
            <div className="mt-2 px-3 py-1 bg-green-500/30 rounded-full text-xs text-green-200 flex items-center gap-1">
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🥤
              </motion.div>
              Juice Bar
            </div>
          )}
        </motion.div>
      )}
      
      {/* Home Area - Only show if unlocked */}
      {unlockedAreas.includes('home') && (
        <motion.div 
          className={`absolute top-[35%] left-[40%] w-[20%] h-[30%] rounded-lg ${
            currentArea === 'home' 
              ? 'bg-amber-600/40 border-2 border-amber-400' 
              : 'bg-amber-900/20 hover:bg-amber-800/30 cursor-pointer'
          } transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center`}
          onClick={() => onAreaClick('home', { x: 50, y: 50 })}
          variants={areaHoverVariants}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ 
              scale: currentArea === 'home' ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <Home size={32} className="text-amber-300 mb-2" />
          </motion.div>
          <h3 className="text-lg font-bold text-white">Home Zone</h3>
          
          <div className="mt-2 px-3 py-1 bg-amber-500/30 rounded-full text-xs text-amber-200 flex items-center gap-1">
            <motion.div
              animate={{ 
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🛋️
            </motion.div>
            Relaxation Area
          </div>
        </motion.div>
      )}
      
      {/* Locked areas indicators */}
      {!unlockedAreas.includes('wellness') && (
        <div className="absolute bottom-[10%] left-[20%] w-[25%] h-[35%] rounded-lg bg-gray-900/50 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-dashed border-gray-700">
          <motion.div 
            className="text-gray-400 mb-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🔒
          </motion.div>
          <h3 className="text-lg font-bold text-gray-400">Wellness Zone</h3>
          <p className="text-xs text-gray-500 mt-1">Unlock with Sauna Room</p>
        </div>
      )}
      
      {!unlockedAreas.includes('nutrition') && (
        <div className="absolute bottom-[10%] right-[20%] w-[25%] h-[35%] rounded-lg bg-gray-900/50 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-dashed border-gray-700">
          <motion.div 
            className="text-gray-400 mb-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🔒
          </motion.div>
          <h3 className="text-lg font-bold text-gray-400">Nutrition Zone</h3>
          <p className="text-xs text-gray-500 mt-1">Unlock with Juice Bar</p>
        </div>
      )}
      
      {!unlockedAreas.includes('home') && (
        <div className="absolute top-[35%] left-[40%] w-[20%] h-[30%] rounded-lg bg-gray-900/50 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-dashed border-gray-700">
          <motion.div 
            className="text-gray-400 mb-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🔒
          </motion.div>
          <h3 className="text-lg font-bold text-gray-400">Home Zone</h3>
          <p className="text-xs text-gray-500 mt-1">Unlock with Home Area</p>
        </div>
      )}
      
      {/* Center area - common space */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 flex items-center justify-center"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.25, 0.2]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        <div className="text-white text-opacity-70 text-xs">Center Hub</div>
      </motion.div>
      
      {/* Sound system controls if upgraded */}
      {hasSoundSystem && (
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <motion.div 
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Music size={14} className="text-white/70" />
          </motion.div>
          <motion.div 
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 size={14} className="text-white/70" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GymEnvironment;