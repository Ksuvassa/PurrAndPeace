const STORAGE_KEYS = {
    PROFILE: 'purrProfile',
    MOOD_LOGS: 'purrMoodLogs'
};

// Profile Helpers
export function getProfile() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || {};
}

export function saveProfile(data) {
    const current = getProfile();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
}

// Mood Log Helpers
// Log Format: { date: 'YYYY-MM-DD', moodId: 'happy', note: '...' }
export function getMoodLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MOOD_LOGS)) || {};
}

export function saveMoodLog(date, moodId, note = '') {
    const logs = getMoodLogs();
    logs[date] = { moodId, note, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEYS.MOOD_LOGS, JSON.stringify(logs));
}

export function getMoodForDate(date) {
    const logs = getMoodLogs();
    return logs[date];
}

export function getStats() {
    const logs = getMoodLogs();
    const entries = Object.values(logs);
    if (!entries.length) return { streak: 0, total: 0 };

    // Simple streak calculation (consecutive days ending today or yesterday)
    // For now, just return total count as a placeholder for detailed streak logic
    return {
        total: entries.length,
        // Placeholder for streak
        streak: calculateStreak(logs)
    };
}

function calculateStreak(logs) {
    const dates = Object.keys(logs).sort();
    if (dates.length === 0) return 0;

    let streak = 0;
    let current = new Date();
    // Check from today backwards

    // Normalize today to YYYY-MM-DD
    const todayStr = current.toISOString().split('T')[0];

    if (logs[todayStr]) {
        streak++;
    }

    // Simplistic check for previous days would go here
    // For this MVP, we might simply count days or check simple continuity. 
    // Let's doing a simple iteration backwards.

    for (let i = 1; i < 365; i++) {
        const prevDate = new Date();
        prevDate.setDate(prevDate.getDate() - i);
        const prevStr = prevDate.toISOString().split('T')[0];
        if (logs[prevStr]) {
            streak++;
        } else {
            // simpler streak: if we miss a day, maybe check if it was just "yesterday" or "today" to start
            if (i === 1 && !logs[todayStr]) {
                // If today is empty, and yesterday is empty, streak is 0.
                // If today is empty, but yesterday is full, streak continues from yesterday.
                continue;
            }
            break;
        }
    }
    return streak;
}
