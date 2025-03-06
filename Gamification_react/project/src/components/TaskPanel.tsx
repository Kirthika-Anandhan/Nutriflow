import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../types';
import { useGameStore } from '../store/gameStore';

interface TaskPanelProps {
  tasks: Task[];
  onCompleteTask: (task: Task) => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ tasks, onCompleteTask }) => {
  const { cooldowns, character } = useGameStore();
  const now = Date.now();
  
  // Check if a task is on cooldown
  const isOnCooldown = (taskId: string) => {
    return cooldowns[taskId] && now < cooldowns[taskId];
  };
  
  // Get remaining cooldown time in seconds
  const getRemainingCooldown = (taskId: string) => {
    if (!cooldowns[taskId] || now >= cooldowns[taskId]) return 0;
    return Math.ceil((cooldowns[taskId] - now) / 1000);
  };
  
  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Check if character has enough energy for task
  const hasEnoughEnergy = () => {
    return character.stamina >= 10 && character.hydration >= 10;
  };
  
  // Task card animation variants
  const taskCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
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
  
  // Button animation variants
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

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-xl p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Clock size={20} className="text-yellow-400" />
        Available Tasks
      </h2>
      
      {tasks.length === 0 ? (
        <motion.p 
          className="text-gray-400 text-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No tasks available in this area.
        </motion.p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const onCooldown = isOnCooldown(task.id);
            const cooldownTime = getRemainingCooldown(task.id);
            const disabled = onCooldown || !hasEnoughEnergy();
            
            return (
              <motion.div 
                key={task.id} 
                className={`bg-white/5 rounded-lg p-3 ${!disabled ? 'hover:bg-white/10' : ''} transition-colors relative overflow-hidden`}
                variants={taskCardVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={!disabled ? "hover" : undefined}
              >
                {/* Difficulty badge */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{task.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.difficulty === 'easy' ? 'bg-green-900/50 text-green-300' :
                    task.difficulty === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-red-900/50 text-red-300'
                  }`}>
                    {task.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{task.description}</p>
                
                <div className="flex justify-between items-center">
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
                    +{task.reward} coins
                  </motion.span>
                  
                  {/* Cooldown indicator */}
                  {onCooldown ? (
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock size={14} />
                      <span>{formatTime(cooldownTime)}</span>
                    </div>
                  ) : !hasEnoughEnergy() ? (
                    <div className="flex items-center gap-1 text-orange-400 text-sm">
                      <AlertTriangle size={14} />
                      <span>Low energy</span>
                    </div>
                  ) : (
                    <motion.button 
                      onClick={() => onCompleteTask(task)}
                      className="flex items-center gap-1 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded-md text-sm transition-colors"
                      variants={buttonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle size={16} />
                      Complete
                    </motion.button>
                  )}
                </div>
                
                {/* Progress bar for cooldown */}
                {onCooldown && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-indigo-600"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ 
                      duration: cooldownTime,
                      ease: "linear"
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskPanel;