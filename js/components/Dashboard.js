import { createElement, clearContainer, getProfile, setSmartImage } from '../utils/dom.js';
import { renderTracker } from './Tracker.js';
import { renderArticles } from './ArticleSection.js';
import { renderPractice } from './PracticeSession.js';
import { startSessionImage } from '../data/content.js';

export function renderDashboard(container) {
    clearContainer(container);

    // Header
    const header = createElement('div', 'dashboard-header');

    // Left: Cat Icon (Tracker)
    const catBtn = createElement('button', 'icon-btn');
    catBtn.textContent = '🐱'; // Placeholder icon
    catBtn.onclick = () => renderTracker(container);

    // Right: Menu Dots (Articles)
    const menuBtn = createElement('button', 'icon-btn');
    menuBtn.textContent = '⋮';
    menuBtn.onclick = () => renderArticles(container);

    header.appendChild(catBtn);
    header.appendChild(menuBtn);

    // Main Content
    const main = createElement('div', 'dashboard-main fade-in');

    // Greeting
    const profile = getProfile();
    const greeting = createElement('h2', 'greeting', `Hello, ${profile.ownerName || 'Friend'}`);

    // Central "Start Practice" Button (Card)
    const startCard = createElement('div', 'start-card');
    startCard.onclick = () => renderPractice(container);

    // Blurred Image Background (simulated)
    const imgPlaceholder = createElement('div', 'start-image');
    setSmartImage(imgPlaceholder, startSessionImage, '🧘‍♀️ 🐈');

    const startText = createElement('span', 'start-text', 'Start Practice');

    startCard.appendChild(imgPlaceholder);
    startCard.appendChild(startText);

    main.appendChild(greeting);
    main.appendChild(startCard);

    container.appendChild(header);
    container.appendChild(main);
}
