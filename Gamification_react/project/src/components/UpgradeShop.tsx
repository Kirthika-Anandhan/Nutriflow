import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Check, Info } from 'lucide-react';
import { Upgrade, GymArea } from '../types';

interface UpgradeShopProps {
  upgrades: Upgrade[];
  coins: number;
  onPurchase: (upgradeId: string) => void;
  onClose: () => void;
}

const UpgradeShop: React.FC<UpgradeShopProps> = ({ 
  upgrades, 
  coins, 
  onPurchase, 
  onClose 
}) => {
  // Group upgrades by area
  const groupedUpgrades: Record<string, Upgrade[]> = {
    cardio: upgrades.filter(u => u.area === 'cardio'),
    strength: upgrades.filter(u => u.area === 'strength'),
    wellness: upgrades.filter(u => u.area === 'wellness'),
    nutrition: upgrades.filter(u => u.area === 'nutrition'),
    general: upgrades.filter(u => u.area === 'general'),
    home: upgrades.filter(u => u.area === 'home')
  };
  
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
  
  const upgradeCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.2
      }
    }
  };
  
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    },
    disabled: {
      scale: 1,
      opacity: 0.5
    }
  };
  
  // Get icon for area
  const getAreaIcon = (area: GymArea) => {
    switch(area) {
      case 'cardio':
        return '🏃';
      case 'strength':
        return '💪';
      case 'wellness':
        return '🧘';
      case 'nutrition':
        return '🥗';
      case 'home':
        return '🏠';
      default:
        return '🏋️';
    }
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
        className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="p-4 bg-black/30 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-yellow-400" />
            Upgrade Shop
          </h2>
          
          <div className="flex items-center gap-4">
            <motion.div 
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
              <Coins size={18} />
              {coins} coins available
            </motion.div>
            <motion.button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>
        
        {/* Shop content */}
        <div className="p-4 overflow-y-auto flex-1">
          {Object.entries(groupedUpgrades).map(([area, areaUpgrades], areaIndex) => {
            if (areaUpgrades.length === 0) return null;
            
            return (
              <motion.div 
                key={area} 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: {
                    delay: areaIndex * 0.1
                  }
                }}
              >
                <h3 className="text-lg font-bold mb-3 capitalize border-b border-white/10 pb-2 flex items-center gap-2">
                  <span>{getAreaIcon(area as GymArea)}</span>
                  {area} Upgrades
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {areaUpgrades.map((upgrade, index) => (
                    <motion.div 
                      key={upgrade.id}
                      className={`rounded-lg p-4 ${
                        upgrade.owned 
                          ? 'bg-green-900/20 border border-green-500/30' 
                          : 'bg-white/5 hover:bg-white/10 transition-colors'
                      }`}
                      variants={upgradeCardVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover={!upgrade.owned ? "hover" : undefined}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{upgrade.name}</h4>
                        {upgrade.owned ? (
                          <motion.span 
                            className="bg-green-800 text-green-200 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                            animate={{ 
                              scale: [1, 1.05, 1],
                              backgroundColor: ['rgba(22, 101, 52, 0.8)', 'rgba(22, 101, 52, 0.6)', 'rgba(22, 101, 52, 0.8)']
                            }}
                            transition={{ 
                              repeat: Infinity,
                              duration: 2
                            }}
                          >
                            <Check size={12} />
                            Owned
                          </motion.span>
                        ) : (
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
                            {upgrade.cost}
                          </motion.span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-3">{upgrade.description}</p>
                      
                      {/* Upgrade benefits */}
                      {upgrade.boostAmount && (
                        <div className="mb-3 flex items-center gap-1 text-xs text-blue-300">
                          <Info size={12} />
                          <span>Provides a {upgrade.boostAmount}% boost to rewards</span>
                        </div>
                      )}
                      
                      {upgrade.unlockArea && (
                        <div className="mb-3 flex items-center gap-1 text-xs text-purple-300">
                          <Info size={12} />
                          <span>Unlocks the {upgrade.unlockArea} area</span>
                        </div>
                      )}
                      
                      {!upgrade.owned && (
                        <motion.button 
                          onClick={() => onPurchase(upgrade.id)}
                          disabled={coins < upgrade.cost}
                          className={`w-full py-2 rounded-md text-center ${
                            coins >= upgrade.cost
                              ? 'bg-indigo-700 hover:bg-indigo-600 transition-colors'
                              : 'bg-gray-700 cursor-not-allowed opacity-50'
                          }`}
                          variants={buttonVariants}
                          initial="idle"
                          whileHover={coins >= upgrade.cost ? "hover" : "disabled"}
                          whileTap={coins >= upgrade.cost ? { scale: 0.95 } : undefined}
                        >
                          {coins >= upgrade.cost ? 'Purchase' : 'Not enough coins'}
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
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

export default UpgradeShop;