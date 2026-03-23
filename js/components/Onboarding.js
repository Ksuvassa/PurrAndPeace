import { createElement, clearContainer, saveProfile } from '../utils/dom.js';
import { renderDashboard } from './Dashboard.js';

export function renderWelcome(container) {
    clearContainer(container);

    // Background decorations (simulated with CSS classes)
    const bg = createElement('div', 'onboarding-bg');

    const content = createElement('div', 'intro-content fade-in');

    const title = createElement('h1', 'intro-title', 'Hello!\nWelcome to\nPurr and Peace');
    title.style.whiteSpace = 'pre-line'; // Allow newlines

    // "Continue" button
    const btn = createElement('button', 'btn-primary', 'Continue');
    btn.onclick = () => renderConsent(container);

    content.appendChild(title);
    content.appendChild(btn);
    container.appendChild(bg);
    container.appendChild(content);
}

export function renderConsent(container) {
    clearContainer(container);

    const content = createElement('div', 'consent-card fade-in');

    const text = createElement('p', 'consent-text',
        'Safety & Consent:\n\nThis app is designed to promote relaxation. Please listen to your body and your cat`s boundaries.\n\nYour data is stored locally on your device for anonymity.'
    );

    const btn = createElement('button', 'btn-primary', 'I Understand');
    btn.onclick = () => renderOwnerProfile(container);

    content.appendChild(text);
    content.appendChild(btn);
    container.appendChild(content);
}

function renderOwnerProfile(container) {
    clearContainer(container);

    const wrapper = createElement('div', 'profile-wizard fade-in');
    const title = createElement('h2', '', 'About You');

    // Simple 1-question at a time flow or standard form. 
    // Implementing standard form for simplicity as per "Profile" request, 
    // but styled card-like.

    const nameInput = createInput('What is your name? (Optional)');
    const ageInput = createInput('Age');
    const expInput = createInput('Yoga Experience (Beginner/Inter/Adv)');

    const btn = createElement('button', 'btn-primary', 'Next');
    btn.onclick = () => {
        saveProfile({
            ownerName: nameInput.value,
            ownerAge: ageInput.value,
            ownerExp: expInput.value
        });
        renderCatProfile(container);
    };

    wrapper.appendChild(title);
    wrapper.appendChild(nameInput);
    wrapper.appendChild(ageInput);
    wrapper.appendChild(expInput);
    wrapper.appendChild(btn);

    container.appendChild(wrapper);
}

function renderCatProfile(container) {
    clearContainer(container);

    const wrapper = createElement('div', 'profile-wizard fade-in');
    const title = createElement('h2', '', 'About Your Cat');

    const nameInput = createInput('Cat\'s Name');
    const ageInput = createInput('Age');
    const behaviorInput = createInput('Typical Behavior (Calm/Playful/Etc)');

    const btn = createElement('button', 'btn-primary', 'Finish Setup');
    btn.onclick = () => {
        saveProfile({
            catName: nameInput.value,
            catAge: ageInput.value,
            catBehavior: behaviorInput.value
        });
        // Go to Dashboard
        renderDashboard(container);
    };

    wrapper.appendChild(title);
    wrapper.appendChild(nameInput);
    wrapper.appendChild(ageInput);
    wrapper.appendChild(behaviorInput);
    wrapper.appendChild(btn);

    container.appendChild(wrapper);
}

function createInput(placeholder) {
    const input = createElement('input', 'input-field');
    input.placeholder = placeholder;
    return input;
}
