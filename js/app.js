import { renderWelcome } from './components/Onboarding.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    // Initial Route - Start with Onboarding
    renderWelcome(app);
});
