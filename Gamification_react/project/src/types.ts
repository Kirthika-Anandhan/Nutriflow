export type GymArea = 'cardio' | 'strength' | 'wellness' | 'nutrition' | 'home';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  area: GymArea | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  cooldown?: number; // Cooldown in seconds
  animation?: string; // Animation to play when completing
}

export interface Upgrade {
  id: string;
  name: string;
  area: GymArea;
  cost: number;
  owned: boolean;
  description: string;
  boostAmount?: number; // Percentage boost for rewards
  unlockArea?: GymArea; // Area this upgrade unlocks
  visualLevel?: number; // Visual enhancement level (1-3)
}

export interface Stats {
  workoutsCompleted: number;
  waterDrank: number;
  meditationMinutes: number;
  coinsEarned: number;
  streakRecord: number;
  challengesCompleted: number;
}

export interface CharacterState {
  stamina: number; // 0-100
  hydration: number; // 0-100
  outfit: string; // Default, sporty, casual, pro
  accessories: string[]; // Array of owned accessories
  mood: 'energetic' | 'normal' | 'tired' | 'exhausted';
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  reward: number;
  type: 'workout' | 'water' | 'meditation' | 'streak';
  completed: boolean;
  expiresAt: string; // ISO date string
}

export interface SoundEffect {
  id: string;
  src: string;
  volume?: number;
  loop?: boolean;
}

export interface MotivationalMessage {
  id: string;
  text: string;
  area?: GymArea;
  activity?: string;
}