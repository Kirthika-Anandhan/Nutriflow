import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Task, 
  Upgrade, 
  GymArea, 
  Stats, 
  CharacterState, 
  DailyChallenge 
} from '../types';
import { 
  generateRandomTask, 
  calculateStreakBonus, 
  generateDailyChallenge,
  updateCharacterState,
  getRandomMotivationalMessage
} from '../utils/gameUtils';
import soundManager from '../utils/soundManager';

interface GameState {
  // Game state
  coins: number;
  streak: number;
  lastLogin: string | null;
  characterPosition: { x: number; y: number };
  currentArea: GymArea;
  showShop: boolean;
  showStats: boolean;
  showCustomization: boolean;
  showSettings: boolean;
  tasks: Task[];
  upgrades: Upgrade[];
  unlockedAreas: GymArea[];
  stats: Stats;
  character: CharacterState;
  dailyChallenges: DailyChallenge[];
  motivationalMessage: string | null;
  cooldowns: Record<string, number>; // Task ID to timestamp
  gymLevel: number; // Visual upgrade level of the gym (1-5)
  
  // Actions
  setCoins: (coins: number) => void;
  addCoins: (amount: number) => void;
  setStreak: (streak: number) => void;
  setCharacterPosition: (position: { x: number; y: number }) => void;
  setCurrentArea: (area: GymArea) => void;
  toggleShop: () => void;
  toggleStats: () => void;
  toggleCustomization: () => void;
  toggleSettings: () => void;
  completeTask: (task: Task) => void;
  purchaseUpgrade: (upgradeId: string) => void;
  performAction: (action: string) => void;
  handleAreaClick: (area: GymArea, position: { x: number; y: number }) => void;
  updateDailyChallenge: (type: string, amount: number) => void;
  purchaseOutfit: (outfitId: string, cost: number) => void;
  purchaseAccessory: (accessoryId: string, cost: number) => void;
  checkDailyChallenges: () => void;
  checkDailyLogin: () => void;
  restCharacter: () => void;
  drinkWater: () => void;
  showMessage: (message: string) => void;
  clearMessage: () => void;
  updateCooldowns: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      coins: 100,
      streak: 0,
      lastLogin: null,
      characterPosition: { x: 50, y: 50 },
      currentArea: 'cardio',
      showShop: false,
      showStats: false,
      showCustomization: false,
      showSettings: false,
      tasks: [
        generateRandomTask('cardio'),
        generateRandomTask('strength'),
        generateRandomTask('wellness')
      ],
      upgrades: [
        { id: 'treadmill', name: 'Premium Treadmill', area: 'cardio', cost: 150, owned: false, description: 'Increases cardio coins by 20%', boostAmount: 20 },
        { id: 'weights', name: 'Heavy Weights Set', area: 'strength', cost: 200, owned: false, description: 'Increases strength coins by 25%', boostAmount: 25 },
        { id: 'yogamat', name: 'Pro Yoga Mat', area: 'wellness', cost: 100, owned: false, description: 'Increases wellness coins by 15%', boostAmount: 15 },
        { id: 'juicebar', name: 'Juice Bar', area: 'nutrition', cost: 300, owned: false, description: 'Adds a nutrition section to your gym', unlockArea: 'nutrition' },
        { id: 'pool', name: 'Swimming Pool', area: 'cardio', cost: 500, owned: false, description: 'Adds a swimming area to your gym', visualLevel: 2 },
        { id: 'sauna', name: 'Sauna Room', area: 'wellness', cost: 400, owned: false, description: 'Adds a relaxation area to your gym', unlockArea: 'wellness' },
        { id: 'homearea', name: 'Home Relaxation Area', area: 'home', cost: 600, owned: false, description: 'Adds a home area for resting and planning', unlockArea: 'home' },
        { id: 'lighting', name: 'Premium Lighting', area: 'general', cost: 250, owned: false, description: 'Enhances the gym atmosphere with better lighting', visualLevel: 1 },
        { id: 'flooring', name: 'Professional Flooring', area: 'general', cost: 350, owned: false, description: 'Upgrade to professional gym flooring', visualLevel: 1 },
        { id: 'speakers', name: 'Sound System', area: 'general', cost: 400, owned: false, description: 'Add a premium sound system to your gym', visualLevel: 2 }
      ],
      unlockedAreas: ['cardio', 'strength'],
      stats: {
        workoutsCompleted: 0,
        waterDrank: 0,
        meditationMinutes: 0,
        coinsEarned: 0,
        streakRecord: 0,
        challengesCompleted: 0
      },
      character: {
        stamina: 100,
        hydration: 100,
        outfit: 'default',
        accessories: [],
        mood: 'energetic'
      },
      dailyChallenges: [generateDailyChallenge()],
      motivationalMessage: null,
      cooldowns: {},
      gymLevel: 1,

      // Actions
      setCoins: (coins) => set({ coins }),
      
      addCoins: (amount) => {
        set(state => ({ 
          coins: state.coins + amount,
          stats: {
            ...state.stats,
            coinsEarned: state.stats.coinsEarned + amount
          }
        }));
        soundManager.play('coins');
      },
      
      setStreak: (streak) => set(state => {
        const newState = { streak };
        // Update streak record if needed
        if (streak > state.stats.streakRecord) {
          newState.stats = {
            ...state.stats,
            streakRecord: streak
          };
        }
        return newState;
      }),
      
      setCharacterPosition: (position) => set({ characterPosition: position }),
      
      setCurrentArea: (area) => set({ currentArea: area }),
      
      toggleShop: () => {
        soundManager.play('click');
        set(state => ({ showShop: !state.showShop }));
      },
      
      toggleStats: () => {
        soundManager.play('click');
        set(state => ({ showStats: !state.showStats }));
      },
      
      toggleCustomization: () => {
        soundManager.play('click');
        set(state => ({ showCustomization: !state.showCustomization }));
      },
      
      toggleSettings: () => {
        soundManager.play('click');
        set(state => ({ showSettings: !state.showSettings }));
      },
      
      completeTask: (task) => {
        const state = get();
        
        // Check if character has enough stamina and hydration
        if (state.character.stamina < 10 || state.character.hydration < 10) {
          set({ motivationalMessage: "You're too exhausted! Rest or drink water first." });
          soundManager.play('error');
          return;
        }
        
        // Check cooldown
        const now = Date.now();
        const cooldownTime = state.cooldowns[task.id];
        if (cooldownTime && now < cooldownTime) {
          const remainingSeconds = Math.ceil((cooldownTime - now) / 1000);
          set({ motivationalMessage: `This task is on cooldown. Available in ${remainingSeconds} seconds.` });
          soundManager.play('error');
          return;
        }
        
        // Calculate reward with upgrades bonus
        let reward = task.reward;
        const areaUpgrades = state.upgrades.filter(u => u.owned && u.area === task.area);
        
        // Apply bonuses from owned upgrades
        areaUpgrades.forEach(upgrade => {
          if (upgrade.boostAmount) {
            reward *= (1 + upgrade.boostAmount / 100);
          }
        });
        
        // Apply streak bonus for 7+ day streaks
        if (state.streak >= 7) {
          reward *= 1.5; // 50% bonus for 7+ day streaks
        }
        
        // Round the reward
        reward = Math.round(reward);
        
        // Update character state
        const updatedCharacter = updateCharacterState(state.character, 'workout');
        
        // Set cooldown
        const cooldownDuration = task.cooldown || 60; // Default 60 seconds if not specified
        const newCooldowns = {
          ...state.cooldowns,
          [task.id]: now + (cooldownDuration * 1000)
        };
        
        // Update coins and stats
        set(state => ({
          coins: state.coins + reward,
          stats: {
            ...state.stats,
            coinsEarned: state.stats.coinsEarned + reward,
            workoutsCompleted: state.stats.workoutsCompleted + 1
          },
          character: updatedCharacter,
          cooldowns: newCooldowns,
          motivationalMessage: getRandomMotivationalMessage(task.area, task.animation)
        }));
        
        // Update daily challenges
        get().updateDailyChallenge('workout', 1);
        
        // Replace completed task with a new one
        set(state => ({
          tasks: state.tasks.map(t => 
            t.id === task.id ? generateRandomTask(task.area) : t
          )
        }));
        
        // Play sound effect
        soundManager.play('success');
      },
      
      purchaseUpgrade: (upgradeId) => {
        const state = get();
        const upgrade = state.upgrades.find(u => u.id === upgradeId);
        if (!upgrade) return;
        
        if (state.coins >= upgrade.cost) {
          // Deduct coins
          set(state => ({ coins: state.coins - upgrade.cost }));
          
          // Update upgrades
          set(state => ({
            upgrades: state.upgrades.map(u => 
              u.id === upgradeId ? { ...u, owned: true } : u
            )
          }));
          
          // Unlock new areas if applicable
          if (upgrade.unlockArea && !state.unlockedAreas.includes(upgrade.unlockArea)) {
            set(state => ({
              unlockedAreas: [...state.unlockedAreas, upgrade.unlockArea!]
            }));
          }
          
          // Update gym level if applicable
          if (upgrade.visualLevel) {
            set(state => ({
              gymLevel: Math.max(state.gymLevel, upgrade.visualLevel!)
            }));
          }
          
          // Show success message
          set({ motivationalMessage: `You purchased ${upgrade.name}!` });
          
          // Play sound effect
          soundManager.play('levelUp');
        } else {
          // Show error message
          set({ motivationalMessage: `Not enough coins! You need ${upgrade.cost - state.coins} more coins.` });
          
          // Play error sound
          soundManager.play('error');
        }
      },
      
      performAction: (action) => {
        switch (action) {
          case 'drinkWater':
            get().drinkWater();
            break;
          case 'meditate':
            const state = get();
            // Update character state
            const updatedCharacter = updateCharacterState(state.character, 'meditate');
            
            // Update stats
            set(state => ({
              character: updatedCharacter,
              stats: {
                ...state.stats,
                meditationMinutes: state.stats.meditationMinutes + 5
              },
              coins: state.coins + 10,
              motivationalMessage: getRandomMotivationalMessage('wellness', 'meditate')
            }));
            
            // Update daily challenges
            get().updateDailyChallenge('meditation', 5);
            
            // Play sound effect
            soundManager.play('success');
            break;
          case 'rest':
            get().restCharacter();
            break;
          default:
            break;
        }
      },
      
      handleAreaClick: (area, position) => {
        const state = get();
        if (state.unlockedAreas.includes(area)) {
          soundManager.play('click');
          set({ 
            currentArea: area,
            characterPosition: position
          });
        } else {
          set({ motivationalMessage: `You need to unlock the ${area} area first!` });
          soundManager.play('error');
        }
      },
      
      updateDailyChallenge: (type, amount) => {
        set(state => {
          const updatedChallenges = state.dailyChallenges.map(challenge => {
            if (challenge.type === type && !challenge.completed) {
              const newAmount = challenge.currentAmount + amount;
              const completed = newAmount >= challenge.targetAmount;
              
              // If newly completed, add reward
              if (completed && !challenge.completed) {
                setTimeout(() => {
                  get().addCoins(challenge.reward);
                  set(state => ({
                    stats: {
                      ...state.stats,
                      challengesCompleted: state.stats.challengesCompleted + 1
                    },
                    motivationalMessage: `Challenge completed: ${challenge.title}! +${challenge.reward} coins!`
                  }));
                  soundManager.play('achievement');
                }, 500);
              }
              
              return {
                ...challenge,
                currentAmount: newAmount,
                completed
              };
            }
            return challenge;
          });
          
          return { dailyChallenges: updatedChallenges };
        });
      },
      
      purchaseOutfit: (outfitId, cost) => {
        const state = get();
        if (state.coins >= cost) {
          set(state => ({
            coins: state.coins - cost,
            character: {
              ...state.character,
              outfit: outfitId
            },
            motivationalMessage: "New outfit equipped!"
          }));
          soundManager.play('success');
        } else {
          set({ motivationalMessage: `Not enough coins! You need ${cost - state.coins} more coins.` });
          soundManager.play('error');
        }
      },
      
      purchaseAccessory: (accessoryId, cost) => {
        const state = get();
        if (state.coins >= cost) {
          set(state => ({
            coins: state.coins - cost,
            character: {
              ...state.character,
              accessories: [...state.character.accessories, accessoryId]
            },
            motivationalMessage: "New accessory equipped!"
          }));
          soundManager.play('success');
        } else {
          set({ motivationalMessage: `Not enough coins! You need ${cost - state.coins} more coins.` });
          soundManager.play('error');
        }
      },
      
      checkDailyChallenges: () => {
        const now = new Date();
        
        set(state => {
          // Filter out expired challenges
          const activeChallenges = state.dailyChallenges.filter(challenge => {
            const expiryDate = new Date(challenge.expiresAt);
            return now < expiryDate;
          });
          
          // Add new challenges if needed
          const newChallenges = [...activeChallenges];
          if (newChallenges.length < 3) {
            for (let i = newChallenges.length; i < 3; i++) {
              newChallenges.push(generateDailyChallenge());
            }
          }
          
          return { dailyChallenges: newChallenges };
        });
      },
      
      checkDailyLogin: () => {
        const today = new Date().toDateString();
        const state = get();
        
        if (state.lastLogin) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayString = yesterday.toDateString();
          
          if (state.lastLogin === yesterdayString) {
            // Consecutive day login
            const newStreak = state.streak + 1;
            set({ streak: newStreak });
            
            // Bonus coins for streak
            const streakBonus = calculateStreakBonus(newStreak);
            set(state => ({ 
              coins: state.coins + streakBonus,
              motivationalMessage: `Daily streak: ${newStreak}! You earned ${streakBonus} bonus coins!`
            }));
            
            soundManager.play('achievement');
          } else if (state.lastLogin !== today) {
            // Not consecutive, reset streak
            set({ 
              streak: 1,
              motivationalMessage: "Welcome back! You've started a new streak."
            });
          }
        }
        
        // Update last login
        set({ lastLogin: today });
        
        // Check and update daily challenges
        get().checkDailyChallenges();
      },
      
      restCharacter: () => {
        const state = get();
        // Only allow rest in home area or if very low stamina
        if (state.currentArea === 'home' || state.character.stamina < 20) {
          const updatedCharacter = updateCharacterState(state.character, 'rest');
          set({ 
            character: updatedCharacter,
            motivationalMessage: "You took some time to rest and recover stamina."
          });
          soundManager.play('success');
        } else {
          set({ motivationalMessage: "You can only rest in the home area, unless you're very tired." });
          soundManager.play('error');
        }
      },
      
      drinkWater: () => {
        const state = get();
        const updatedCharacter = updateCharacterState(state.character, 'drink');
        
        set(state => ({
          character: updatedCharacter,
          stats: {
            ...state.stats,
            waterDrank: state.stats.waterDrank + 1
          },
          coins: state.coins + 5,
          motivationalMessage: "You drank water! +5 coins for staying hydrated!"
        }));
        
        // Update daily challenges
        get().updateDailyChallenge('water', 1);
        
        // Play sound effect
        soundManager.play('water');
      },
      
      showMessage: (message) => {
        set({ motivationalMessage: message });
        // Auto-clear after 5 seconds
        setTimeout(() => {
          const currentMessage = get().motivationalMessage;
          if (currentMessage === message) {
            set({ motivationalMessage: null });
          }
        }, 5000);
      },
      
      clearMessage: () => set({ motivationalMessage: null }),
      
      updateCooldowns: () => {
        const now = Date.now();
        set(state => {
          const updatedCooldowns = { ...state.cooldowns };
          let changed = false;
          
          // Remove expired cooldowns
          Object.keys(updatedCooldowns).forEach(taskId => {
            if (updatedCooldowns[taskId] <= now) {
              delete updatedCooldowns[taskId];
              changed = true;
            }
          });
          
          return changed ? { cooldowns: updatedCooldowns } : {};
        });
      }
    }),
    {
      name: 'health-tycoon-storage',
      partialize: (state) => ({
        coins: state.coins,
        streak: state.streak,
        lastLogin: state.lastLogin,
        upgrades: state.upgrades,
        unlockedAreas: state.unlockedAreas,
        stats: state.stats,
        character: state.character,
        gymLevel: state.gymLevel
      })
    }
  )
);