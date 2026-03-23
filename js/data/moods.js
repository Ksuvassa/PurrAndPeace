export const moods = [
    { id: 'aggressive', label: 'Aggressive', icon: '😾', color: '#2c3e50', category: 'stress' }, // Dark Blue/Grey
    { id: 'scared', label: 'Scared', icon: '🙀', color: '#4a69bd', category: 'stress' }, // Dark Blue
    { id: 'grumpy', label: 'Grumpy', icon: '😠', color: '#6a89cc', category: 'stress' }, // Dull Blue
    { id: 'restless', label: 'Restless', icon: '⚡', color: '#82ccdd', category: 'stress' }, // Light Blue
    { id: 'aloof', label: 'Aloof', icon: '😒', color: '#b8e994', category: 'neutral' }, // Pale Green
    { id: 'relaxed', label: 'Relaxed', icon: '😌', color: '#78e08f', category: 'neutral' }, // Green
    { id: 'playful', label: 'Playful', icon: '😼', color: '#f6b93b', category: 'harmony' }, // Yellow/Orange
    { id: 'affectionate', label: 'Affectionate', icon: '😽', color: '#e55039', category: 'harmony' }, // Warm Orange/Red
    { id: 'purring', label: 'Purring', icon: '😸', color: '#eb2f06', category: 'harmony' }, // Red/Pink
    { id: 'zen', label: 'Zen', icon: '🧘', color: '#ff9f43', category: 'harmony' }  // Amber
];

// Note: I adjusted the colors to try and respect the "Cool/Dark (Stress) -> Warm/Bright (Harmony)" instruction,
// while also acknowledging the "Red/Grumpy" comment by making Stress cooler/darker and Harmony warmer.
