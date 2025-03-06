import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Check, User, Palette } from 'lucide-react';
import { getAvailableOutfits, getAvailableAccessories } from '../utils/gameUtils';
import { useGameStore } from '../store/gameStore';

interface CustomizationPanelProps {
  onClose: () => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'outfits' | 'accessories'>('outfits');
  const { coins, character, purchaseOutfit, purchaseAccessory } = useGameStore();
  
  const outfits = getAvailableOutfits();
  const accessories = getAvailableAccessories();
  
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
  
  const itemVariants = {
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
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.2
      }
    }
  };
  
  const tabVariants = {
    inactive: { 
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "rgba(255, 255, 255, 0.7)"
    },
    active: { 
      backgroundColor: "rgba(79, 70, 229, 0.6)",
      color: "rgba(255, 255, 255, 1)"
    }
  };
  
  // Get outfit color for preview
  const getOutfitColor = (outfitId: string) => {
    switch (outfitId) {
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
  
  // Check if accessory is owned
  const isAccessoryOwned = (accessoryId: string) => {
    return character.accessories.includes(accessoryId);
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
        className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="p-4 bg-black/30 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Palette className="text-yellow-400" />
            Character Customization
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
        
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <motion.button
            className="flex-1 py-3 px-4 text-center font-medium"
            variants={tabVariants}
            animate={activeTab === 'outfits' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('outfits')}
            whileHover={{ backgroundColor: activeTab === 'outfits' ? undefined : "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <User size={16} />
              Outfits
            </div>
          </motion.button>
          
          <motion.button
            className="flex-1 py-3 px-4 text-center font-medium"
            variants={tabVariants}
            animate={activeTab === 'accessories' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('accessories')}
            whileHover={{ backgroundColor: activeTab === 'accessories' ? undefined : "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingBag size={16} />
              Accessories
            </div>
          </motion.button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {activeTab === 'outfits' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outfits.map((outfit, index) => {
                const isOwned = outfit.owned || character.outfit === outfit.id;
                const isEquipped = character.outfit === outfit.id;
                
                return (
                  <motion.div 
                    key={outfit.id}
                    className={`rounded-lg p-4 ${
                      isEquipped 
                        ? 'bg-indigo-900/40 border border-indigo-500/30' 
                        : isOwned
                          ? 'bg-green-900/20 border border-green-500/30'
                          : 'bg-white/5 hover:bg-white/10 transition-colors'
                    }`}
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover={!isEquipped ? "hover" : undefined}
                  >
                    <div className="flex items-center gap-4">
                      {/* Outfit preview */}
                      <div className={`w-12 h-12 ${getOutfitColor(outfit.id)} rounded-full flex items-center justify-center relative`}>
                        <div className="w-8 h-8 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold">{outfit.name}</h4>
                          {isEquipped ? (
                            <span className="bg-indigo-800 text-indigo-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Check size={12} />
                              Equipped
                            </span>
                          ) : isOwned ? (
                            <span className="bg-green-800 text-green-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Check size={12} />
                              Owned
                            </span>
                          ) : (
                            <span className="text-yellow-400 font-bold">{outfit.cost} coins</span>
                          )}
                        </div>
                        
                        {outfit.description && (
                          <p className="text-sm text-gray-300 mt-1">{outfit.description}</p>
                        )}
                      </div>
                    </div>
                    
                    {!isEquipped && (
                      <div className="mt-3">
                        {isOwned ? (
                          <motion.button 
                            onClick={() => purchaseOutfit(outfit.id, 0)}
                            className="w-full py-2 rounded-md text-center bg-indigo-700 hover:bg-indigo-600 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Equip
                          </motion.button>
                        ) : (
                          <motion.button 
                            onClick={() => purchaseOutfit(outfit.id, outfit.cost)}
                            disabled={coins < outfit.cost}
                            className={`w-full py-2 rounded-md text-center ${
                              coins >= outfit.cost
                                ? 'bg-indigo-700 hover:bg-indigo-600 transition-colors'
                                : 'bg-gray-700 cursor-not-allowed opacity-50'
                            }`}
                            whileHover={coins >= outfit.cost ? { scale: 1.02 } : undefined}
                            whileTap={coins >= outfit.cost ? { scale: 0.98 } : undefined}
                          >
                            {coins >= outfit.cost ? 'Purchase' : 'Not enough coins'}
                          </motion.button>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accessories.map((accessory, index) => {
                const isOwned = isAccessoryOwned(accessory.id);
                
                return (
                  <motion.div 
                    key={accessory.id}
                    className={`rounded-lg p-4 ${
                      isOwned 
                        ? 'bg-green-900/20 border border-green-500/30' 
                        : 'bg-white/5 hover:bg-white/10 transition-colors'
                    }`}
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover={!isOwned ? "hover" : undefined}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">{accessory.name}</h4>
                      {isOwned ? (
                        <span className="bg-green-800 text-green-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Check size={12} />
                          Owned
                        </span>
                      ) : (
                        <span className="text-yellow-400 font-bold">{accessory.cost} coins</span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{accessory.description}</p>
                    
                    {!isOwned && (
                      <motion.button 
                        onClick={() => purchaseAccessory(accessory.id, accessory.cost)}
                        disabled={coins < accessory.cost}
                        className={`w-full py-2 rounded-md text-center ${
                          coins >= accessory.cost
                            ? 'bg-indigo-700 hover:bg-indigo-600 transition-colors'
                            : 'bg-gray-700 cursor-not-allowed opacity-50'
                        }`}
                        whileHover={coins >= accessory.cost ? { scale: 1.02 } : undefined}
                        whileTap={coins >= accessory.cost ? { scale: 0.98 } : undefined}
                      >
                        {coins >= accessory.cost ? 'Purchase' : 'Not enough coins'}
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
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

export default CustomizationPanel;