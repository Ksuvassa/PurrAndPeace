import { createElement } from '../utils/dom.js';

export function createHarmonyBar() {
    const container = createElement('div', 'harmony-container');

    const label = createElement('span', 'harmony-label', 'Our Shared Harmony');
    const barBg = createElement('div', 'harmony-bar-bg');
    const barFill = createElement('div', 'harmony-bar-fill');

    // Initial state
    barFill.style.width = '10%';

    barBg.appendChild(barFill);
    container.appendChild(label);
    container.appendChild(barBg);

    // Method to update progress
    container.updateProgress = (percent) => {
        barFill.style.width = `${Math.min(100, Math.max(10, percent))}%`;
    };

    return container;
}
