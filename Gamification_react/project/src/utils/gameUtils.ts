import { Task, GymArea, DailyChallenge, MotivationalMessage, CharacterState } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Generate a random task based on area
export const generateRandomTask = (area: GymArea | 'general'): Task => {
  const tasks: Record<GymArea | 'general', Task[]> = {
    cardio: [
      {
        id: generateId(),
        title: 'Treadmill Sprint',
        description: 'Run on the treadmill for 10 minutes',
        reward: 30,
        area: 'cardio',
        difficulty: 'medium',
        cooldown: 60,
        animation: 'run'
      },
      {
        id: generateId(),
        title: 'Cycling Session',
        description: 'Complete a 15-minute cycling session',
        reward: 35,
        area: 'cardio',
        difficulty: 'medium',
        cooldown: 90,
        animation: 'cycle'
      },
      {
        id: generateId(),
        title: 'Jump Rope',
        description: 'Do 100 jump ropes',
        reward: 25,
        area: 'cardio',
        difficulty: 'easy',
        cooldown: 45,
        animation: 'jump'
      },
      {
        id: generateId(),
        title: 'HIIT Workout',
        description: 'Complete a 20-minute HIIT session',
        reward: 50,
        area: 'cardio',
        difficulty: 'hard',
        cooldown: 120,
        animation: 'hiit'
      },
      {
        id: generateId(),
        title: 'Swimming Laps',
        description: 'Swim 10 laps in the pool',
        reward: 40,
        area: 'cardio',
        difficulty: 'medium',
        cooldown: 90,
        animation: 'swim'
      }
    ],
    strength: [
      {
        id: generateId(),
        title: 'Bench Press',
        description: 'Complete 3 sets of bench press',
        reward: 40,
        area: 'strength',
        difficulty: 'medium',
        cooldown: 90,
        animation: 'benchPress'
      },
      {
        id: generateId(),
        title: 'Squats',
        description: 'Do 20 squats with proper form',
        reward: 30,
        area: 'strength',
        difficulty: 'medium',
        cooldown: 60,
        animation: 'squat'
      },
      {
        id: generateId(),
        title: 'Deadlift',
        description: 'Complete 3 sets of deadlifts',
        reward: 45,
        area: 'strength',
        difficulty: 'hard',
        cooldown: 120,
        animation: 'deadlift'
      },
      {
        id: generateId(),
        title: 'Push-ups',
        description: 'Do 15 push-ups',
        reward: 25,
        area: 'strength',
        difficulty: 'easy',
        cooldown: 45,
        animation: 'pushup'
      },
      {
        id: generateId(),
        title: 'Dumbbell Curls',
        description: 'Complete 3 sets of dumbbell curls',
        reward: 35,
        area: 'strength',
        difficulty: 'medium',
        cooldown: 60,
        animation: 'curl'
      }
    ],
    wellness: [
      {
        id: generateId(),
        title: 'Yoga Session',
        description: 'Complete a 15-minute yoga flow',
        reward: 35,
        area: 'wellness',
        difficulty: 'medium',
        cooldown: 60,
        animation: 'yoga'
      },
      {
        id: generateId(),
        title: 'Deep Breathing',
        description: 'Practice deep breathing for 5 minutes',
        reward: 20,
        area: 'wellness',
        difficulty: 'easy',
        cooldown: 30,
        animation: 'breathe'
      },
      {
        id: generateId(),
        title: 'Meditation',
        description: 'Meditate for 10 minutes',
        reward: 30,
        area: 'wellness',
        difficulty: 'medium',
        cooldown: 45,
        animation: 'meditate'
      },
      {
        id: generateId(),
        title: 'Stretching Routine',
        description: 'Complete a full-body stretching routine',
        reward: 25,
        area: 'wellness',
        difficulty: 'easy',
        cooldown: 40,
        animation: 'stretch'
      },
      {
        id: generateId(),
        title: 'Sauna Session',
        description: 'Relax in the sauna for 15 minutes',
        reward: 30,
        area: 'wellness',
        difficulty: 'easy',
        cooldown: 90,
        animation: 'sauna'
      }
    ],
    nutrition: [
      {
        id: generateId(),
        title: 'Protein Shake',
        description: 'Make a healthy protein shake',
        reward: 25,
        area: 'nutrition',
        difficulty: 'easy',
        cooldown: 30,
        animation: 'shake'
      },
      {
        id: generateId(),
        title: 'Meal Prep',
        description: 'Prepare a healthy meal for tomorrow',
        reward: 40,
        area: 'nutrition',
        difficulty: 'medium',
        cooldown: 120,
        animation: 'cook'
      },
      {
        id: generateId(),
        title: 'Hydration Challenge',
        description: 'Drink 8 glasses of water today',
        reward: 30,
        area: 'nutrition',
        difficulty: 'medium',
        cooldown: 60,
        animation: 'drink'
      },
      {
        id: generateId(),
        title: 'Smoothie Master',
        description: 'Create a nutritious fruit and vegetable smoothie',
        reward: 35,
        area: 'nutrition',
        difficulty: 'medium',
        cooldown: 45,
        animation: 'blend'
      },
      {
        id: generateId(),
        title: 'Juice Bar Special',
        description: 'Try the special juice of the day',
        reward: 30,
        area: 'nutrition',
        difficulty: 'easy',
        cooldown: 60,
        animation: 'juice'
      }
    ],
    home: [
      {
        id: generateId(),
        title: 'Power Nap',
        description: 'Take a 20-minute power nap to restore energy',
        reward: 15,
        area: 'home',
        difficulty: 'easy',
        cooldown: 240,
        animation: 'sleep'
      },
      {
        id: generateId(),
        title: 'Read Health Book',
        description: 'Read a chapter from a health and fitness book',
        reward: 20,
        area: 'home',
        difficulty: 'easy',
        cooldown: 120,
        animation: 'read'
      },
      {
        id: generateId(),
        title: 'Plan Workout',
        description: 'Plan your workout schedule for the next week',
        reward: 25,
        area: 'home',
        difficulty: 'medium',
        cooldown: 180,
        animation: 'plan'
      },
      {
        id: generateId(),
        title: 'Relaxation Time',
        description: 'Spend 30 minutes relaxing to restore stamina',
        reward: 20,
        area: 'home',
        difficulty: 'easy',
        cooldown: 180,
        animation: 'relax'
      }
    ],
    general: [
      {
        id: generateId(),
        title: 'Step Count',
        description: 'Reach 10,000 steps today',
        reward: 40,
        area: 'general',
        difficulty: 'medium',
        cooldown: 1440, // One day
        animation: 'walk'
      },
      {
        id: generateId(),
        title: 'Early Workout',
        description: 'Complete a workout before 9 AM',
        reward: 45,
        area: 'general',
        difficulty: 'hard',
        cooldown: 1440, // One day
        animation: 'morning'
      },
      {
        id: generateId(),
        title: 'Posture Check',
        description: 'Maintain good posture for 1 hour',
        reward: 20,
        area: 'general',
        difficulty: 'easy',
        cooldown: 120,
        animation: 'posture'
      },
      {
        id: generateId(),
        title: 'Sleep Well',
        description: 'Get 8 hours of sleep tonight',
        reward: 35,
        area: 'general',
        difficulty: 'medium',
        cooldown: 1440, // One day
        animation: 'sleep'
      }
    ]
  };

  const areaTaskList = tasks[area];
  const randomIndex = Math.floor(Math.random() * areaTaskList.length);
  return {
    ...areaTaskList[randomIndex],
    id: generateId() // Ensure a unique ID
  };
};

// Calculate bonus based on streak
export const calculateStreakBonus = (streak: number): number => {
  // Increased bonus for longer streaks
  if (streak >= 7) {
    return Math.min(100, streak * 10); // Cap at 100 coins, with 7-day multiplier
  }
  return Math.min(50, streak * 5); // Cap at 50 coins for shorter streaks
};

// Generate a daily challenge
export const generateDailyChallenge = (): DailyChallenge => {
  const challenges = [
    {
      title: 'Cardio Master',
      description: 'Complete 3 cardio workouts today',
      targetAmount: 3,
      reward: 50,
      type: 'workout' as const
    },
    {
      title: 'Strength Champion',
      description: 'Complete 3 strength workouts today',
      targetAmount: 3,
      reward: 50,
      type: 'workout' as const
    },
    {
      title: 'Hydration Hero',
      description: 'Drink water 5 times today',
      targetAmount: 5,
      reward: 40,
      type: 'water' as const
    },
    {
      title: 'Meditation Guru',
      description: 'Meditate for a total of 15 minutes today',
      targetAmount: 15,
      reward: 45,
      type: 'meditation' as const
    },
    {
      title: 'Wellness Warrior',
      description: 'Complete 2 wellness activities today',
      targetAmount: 2,
      reward: 40,
      type: 'workout' as const
    }
  ];

  const randomIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges[randomIndex];
  
  // Set expiration to end of current day
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return {
    id: generateId(),
    title: challenge.title,
    description: challenge.description,
    targetAmount: challenge.targetAmount,
    currentAmount: 0,
    reward: challenge.reward,
    type: challenge.type,
    completed: false,
    expiresAt: tomorrow.toISOString()
  };
};

// Get random motivational message
export const getRandomMotivationalMessage = (area?: GymArea, activity?: string): string => {
  const messages: MotivationalMessage[] = [
    { id: '1', text: "You're doing great! Keep it up!" },
    { id: '2', text: "That's the spirit! One step closer to your goals." },
    { id: '3', text: "Fantastic effort! Your future self will thank you." },
    { id: '4', text: "Remember, consistency is key to success!" },
    { id: '5', text: "You've got this! Every workout counts." },
    { id: '6', text: "Small steps lead to big changes. Keep going!" },
    { id: '7', text: "Your dedication is inspiring!" },
    { id: '8', text: "Progress happens one rep at a time." },
    { id: '9', text: "Feeling the burn? That's growth happening!" },
    { id: '10', text: "Health is wealth, and you're getting richer!" },
    
    // Cardio specific
    { id: '11', text: "Get that heart pumping! Cardio is great for your health.", area: 'cardio' },
    { id: '12', text: "Running towards your goals, literally!", area: 'cardio', activity: 'run' },
    { id: '13', text: "Cycling is a fantastic way to build endurance!", area: 'cardio', activity: 'cycle' },
    
    // Strength specific
    { id: '14', text: "Building strength builds confidence!", area: 'strength' },
    { id: '15', text: "Those muscles aren't going to build themselves!", area: 'strength' },
    { id: '16', text: "Great form on those squats!", area: 'strength', activity: 'squat' },
    
    // Wellness specific
    { id: '17', text: "Mental wellness is just as important as physical fitness.", area: 'wellness' },
    { id: '18', text: "Breathe in positivity, breathe out stress.", area: 'wellness', activity: 'breathe' },
    { id: '19', text: "Meditation clears the mind and strengthens focus.", area: 'wellness', activity: 'meditate' },
    
    // Nutrition specific
    { id: '20', text: "You are what you eat - choose wisely!", area: 'nutrition' },
    { id: '21', text: "Hydration is key to performance and recovery.", area: 'nutrition', activity: 'drink' },
    { id: '22', text: "That protein shake will help your muscles recover.", area: 'nutrition', activity: 'shake' },
    
    // Home specific
    { id: '23', text: "Rest is an essential part of any fitness journey.", area: 'home' },
    { id: '24', text: "A good night's sleep is crucial for recovery.", area: 'home', activity: 'sleep' },
    { id: '25', text: "Planning your workouts increases your chances of success!", area: 'home', activity: 'plan' }
  ];

  // Filter messages based on area and activity if provided
  let filteredMessages = messages;
  
  if (area && activity) {
    // First try to find messages specific to both area and activity
    const specificMessages = messages.filter(m => m.area === area && m.activity === activity);
    if (specificMessages.length > 0) {
      filteredMessages = specificMessages;
    } else {
      // If none found, try just area-specific messages
      const areaMessages = messages.filter(m => m.area === area);
      if (areaMessages.length > 0) {
        filteredMessages = areaMessages;
      }
    }
  } else if (area) {
    // Just filter by area
    const areaMessages = messages.filter(m => m.area === area);
    if (areaMessages.length > 0) {
      filteredMessages = areaMessages;
    }
  }

  const randomIndex = Math.floor(Math.random() * filteredMessages.length);
  return filteredMessages[randomIndex].text;
};

// Update character state based on actions
export const updateCharacterState = (
  currentState: CharacterState,
  action: 'workout' | 'drink' | 'rest' | 'meditate' | 'time'
): CharacterState => {
  let { stamina, hydration, mood } = currentState;
  
  switch (action) {
    case 'workout':
      stamina = Math.max(0, stamina - 15);
      hydration = Math.max(0, hydration - 10);
      break;
    case 'drink':
      hydration = Math.min(100, hydration + 25);
      break;
    case 'rest':
      stamina = Math.min(100, stamina + 30);
      break;
    case 'meditate':
      stamina = Math.min(100, stamina + 10);
      break;
    case 'time':
      // Natural decrease over time
      stamina = Math.max(0, stamina - 2);
      hydration = Math.max(0, hydration - 3);
      break;
  }
  
  // Update mood based on stamina and hydration
  if (stamina < 20 || hydration < 20) {
    mood = 'exhausted';
  } else if (stamina < 40 || hydration < 40) {
    mood = 'tired';
  } else if (stamina > 70 && hydration > 70) {
    mood = 'energetic';
  } else {
    mood = 'normal';
  }
  
  return {
    ...currentState,
    stamina,
    hydration,
    mood
  };
};

// Get available outfits
export const getAvailableOutfits = () => {
  return [
    { id: 'default', name: 'Default Outfit', cost: 0, owned: true },
    { id: 'sporty', name: 'Sporty Outfit', cost: 200, description: 'A sporty outfit for the active gym-goer' },
    { id: 'casual', name: 'Casual Outfit', cost: 300, description: 'A casual outfit for relaxed workouts' },
    { id: 'pro', name: 'Professional Outfit', cost: 500, description: 'Look like a fitness professional' },
    { id: 'yoga', name: 'Yoga Outfit', cost: 400, description: 'Perfect for yoga and meditation' }
  ];
};

// Get available accessories
export const getAvailableAccessories = () => {
  return [
    { id: 'headband', name: 'Headband', cost: 100, description: 'Keep sweat out of your eyes' },
    { id: 'waterbottle', name: 'Premium Water Bottle', cost: 150, description: 'Stay hydrated in style' },
    { id: 'gloves', name: 'Workout Gloves', cost: 200, description: 'Protect your hands during strength training' },
    { id: 'smartwatch', name: 'Smart Watch', cost: 350, description: 'Track your workouts with precision' },
    { id: 'earbuds', name: 'Wireless Earbuds', cost: 300, description: 'Listen to music while you work out' }
  ];
};