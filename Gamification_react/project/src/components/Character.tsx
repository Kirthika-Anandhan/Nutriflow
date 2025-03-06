import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface CharacterProps {
  position: { x: number; y: number };
}

const Character: React.FC<CharacterProps> = ({ position }) => {
  const { character } = useGameStore();
  const { mood, outfit, accessories } = character;
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechText, setShowSpeechText] = useState('');
  const [isResting, setIsResting] = useState(false);
  
  // Motivational quotes for speech bubbles
  const motivationalQuotes = [
    "Let's crush this workout!",
    "Feeling stronger every day!",
    "Health is wealth!",
    "One more rep!",
    "Stay hydrated!",
    "Mind over matter!",
    "Progress, not perfection!",
    "You've got this!",
    "Consistency is key!",
    "No pain, no gain!"
  ];
  
  // Randomly show speech bubbles
  useEffect(() => {
    const speechInterval = setInterval(() => {
      // 15% chance to show a speech bubble if not already showing
      if (Math.random() < 0.15 && !showSpeechBubble && !isResting) {
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setShowSpeechText(randomQuote);
        setShowSpeechBubble(true);
        
        // Hide after 3 seconds
        setTimeout(() => {
          setShowSpeechBubble(false);
        }, 3000);
      }
    }, 8000);
    
    return () => clearInterval(speechInterval);
  }, [showSpeechBubble, isResting]);
  
  // Determine character color based on outfit
  const getOutfitColor = () => {
    switch (outfit) {
      case 'sporty':
        return 'bg-red-400';
      case 'casual':
        return 'bg-blue-400';
      case 'pro':
        return 'bg-purple-400';
      case 'yoga':
        return 'bg-green-400';
      default:
        return 'bg-yellow-400';
    }
  };
  
  // Determine face expression based on mood
  const getFaceExpression = () => {
    switch (mood) {
      case 'energetic':
        return (
          <>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <div className="w-3 h-1.5 bg-black rounded-full absolute top-4.5 transform translate-y-[1px] rotate-[10deg]"></div>
          </>
        );
      case 'tired':
        return (
          <>
            <div className="flex gap-1">
              <div className="w-1 h-0.5 bg-black rounded-full"></div>
              <div className="w-1 h-0.5 bg-black rounded-full"></div>
            </div>
            <div className="w-2 h-1 bg-black rounded-full absolute top-5"></div>
          </>
        );
      case 'exhausted':
        return (
          <>
            <div className="flex gap-1">
              <div className="w-1 h-0.5 bg-black rounded-full transform rotate-12"></div>
              <div className="w-1 h-0.5 bg-black rounded-full transform -rotate-12"></div>
            </div>
            <div className="w-2 h-1 bg-black rounded-full absolute top-5 transform -rotate-12"></div>
          </>
        );
      default: // normal
        return (
          <>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <div className="w-3 h-1 bg-black rounded-full absolute top-5"></div>
          </>
        );
    }
  };
  
  // Render accessories
  const renderAccessories = () => {
    return (
      <>
        {accessories.includes('headband') && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-red-500 rounded-full"></div>
        )}
        {accessories.includes('waterbottle') && (
          <div className="absolute -right-6 top-2 w-2 h-4 bg-blue-300 rounded-sm"></div>
        )}
        {accessories.includes('gloves') && (
          <>
            <div className="absolute -left-5 top-3 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
            <div className="absolute -right-5 top-3 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
          </>
        )}
        {accessories.includes('smartwatch') && (
          <div className="absolute -left-5 top-1 w-2 h-2 bg-black rounded-sm"></div>
        )}
        {accessories.includes('earbuds') && (
          <>
            <div className="absolute -left-1 -top-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute -right-1 -top-1 w-1 h-1 bg-white rounded-full"></div>
          </>
        )}
      </>
    );
  };
  
  // Animation variants based on mood
  const characterVariants = {
    energetic: {
      y: [0, -5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    },
    normal: {
      y: [0, -2, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }
      }
    },
    tired: {
      y: [0, -1, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    },
    exhausted: {
      rotate: [-2, 2, -2],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut"
        }
      }
    },
    resting: {
      scale: 0.9,
      y: 5,
      rotate: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Speech bubble animation
  const speechBubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  // Simulate resting animation
  const toggleRest = () => {
    if (!isResting && character.stamina < 50) {
      setIsResting(true);
      setTimeout(() => {
        setIsResting(false);
      }, 3000);
    }
  };

  return (
    <motion.div 
      className="absolute transition-all duration-500 ease-in-out z-10"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        ...(isResting ? characterVariants.resting : characterVariants[mood])
      }}
      onClick={toggleRest}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div 
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-xs font-medium min-w-[100px] text-center"
            variants={speechBubbleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {speechText}
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={`w-12 h-12 ${getOutfitColor()} rounded-full flex items-center justify-center relative shadow-lg`}>
        {/* Character face */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          {getFaceExpression()}
        </div>
        
        {/* Arms */}
        <motion.div 
          className={`absolute w-2 h-6 ${getOutfitColor()} rounded-full -left-4 top-3`}
          animate={{ 
            rotate: isResting ? 30 : (mood === 'energetic' ? [0, 15, 0, -15, 0] : [0, 5, 0, -5, 0])
          }}
          transition={{ 
            repeat: isResting ? 0 : Infinity, 
            duration: mood === 'energetic' ? 1 : 2
          }}
        />
        <motion.div 
          className={`absolute w-2 h-6 ${getOutfitColor()} rounded-full -right-4 top-3`}
          animate={{ 
            rotate: isResting ? 30 : (mood === 'energetic' ? [0, -15, 0, 15, 0] : [0, -5, 0, 5, 0])
          }}
          transition={{ 
            repeat: isResting ? 0 : Infinity, 
            duration: mood === 'energetic' ? 1 : 2
          }}
        />
        
        {/* Legs */}
        <motion.div 
          className={`absolute w-2 h-6 ${getOutfitColor()} rounded-full -left-2 -bottom-5`}
          animate={{ 
            rotate: isResting ? 45 : (mood === 'exhausted' ? 0 : [0, 5, 0, -5, 0])
          }}
          transition={{ 
            repeat: isResting ? 0 : Infinity, 
            duration: 1.5
          }}
        />
        <motion.div 
          className={`absolute w-2 h-6 ${getOutfitColor()} rounded-full -right-2 -bottom-5`}
          animate={{ 
            rotate: isResting ? 45 : (mood === 'exhausted' ? 0 : [0, -5, 0, 5, 0])
          }}
          transition={{ 
            repeat: isResting ? 0 : Infinity, 
            duration: 1.5
          }}
        />
        
        {/* Accessories */}
        {renderAccessories()}
        
        {/* Sweat drops for tired/exhausted */}
        {(mood === 'tired' || mood === 'exhausted') && (
          <motion.div 
            className="absolute -right-3 -top-1"
            animate={{ 
              y: [0, 5],
              opacity: [1, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1,
              repeatDelay: 0.5
            }}
          >
            💦
          </motion.div>
        )}
        
        {/* Z's for resting */}
        {isResting && (
          <>
            <motion.div 
              className="absolute -right-2 -top-4 text-xs font-bold text-blue-300"
              animate={{ 
                y: [-2, -6],
                x: [0, 4],
                opacity: [0, 1, 0],
                scale: [0.5, 1]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                delay: 0
              }}
            >
              z
            </motion.div>
            <motion.div 
              className="absolute -right-4 -top-8 text-sm font-bold text-blue-300"
              animate={{ 
                y: [-2, -8],
                x: [0, 6],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                delay: 0.5
              }}
            >
              Z
            </motion.div>
            <motion.div 
              className="absolute -right-6 -top-12 text-base font-bold text-blue-300"
              animate={{ 
                y: [-2, -10],
                x: [0, 8],
                opacity: [0, 1, 0],
                scale: [0.5, 1.4]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                delay: 1
              }}
            >
              Z
            </motion.div>
          </>
        )}
      </div>
      
      {/* Status indicators */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-1">
        {/* Stamina indicator */}
        <div className="w-6 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${character.stamina}%` }}
            animate={{ 
              backgroundColor: character.stamina < 30 ? ['#ef4444', '#f87171', '#ef4444'] : undefined
            }}
            transition={{ 
              repeat: character.stamina < 30 ? Infinity : 0,
              duration: 1
            }}
          ></motion.div>
        </div>
        
        {/* Hydration indicator */}
        <div className="w-6 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${character.hydration}%` }}
            animate={{ 
              backgroundColor: character.hydration < 30 ? ['#3b82f6', '#60a5fa', '#3b82f6'] : undefined
            }}
            transition={{ 
              repeat: character.hydration < 30 ? Infinity : 0,
              duration: 1
            }}
          ></motion.div>
        </div>
      </div>
      
      {/* Water bottle indicator when hydration is low */}
      {character.hydration < 40 && (
        <motion.div 
          className="absolute -top-10 -right-6 text-sm"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5
          }}
        >
          💧
        </motion.div>
      )}
    </motion.div>
  );
};

export default Character;