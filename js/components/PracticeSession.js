import { createElement, clearContainer, setSmartImage } from '../utils/dom.js';
import { poses, tips } from '../data/content.js';
import { createHarmonyBar } from './HarmonyBar.js';
import { renderDashboard } from './Dashboard.js';
import { renderTracker } from './Tracker.js';
import { playBeep, playBell } from '../utils/audio.js';

export function renderPractice(container) {
    clearContainer(container);

    // Select 10 random poses for the day
    const sessionPoses = poses.sort(() => 0.5 - Math.random()).slice(0, 10);
    let currentIndex = 0;

    // Layout
    const header = createElement('div', 'header-row');
    const closeBtn = createElement('button', 'icon-btn', '×');
    // We will wire up closeBtn logic later
    header.appendChild(closeBtn);

    const harmonyBar = createHarmonyBar();

    const mainContent = createElement('div', 'practice-content fade-in');

    // Elements
    const poseImage = createElement('div', 'pose-image-placeholder');
    const poseName = createElement('h2', 'pose-name');
    const poseSanskrit = createElement('h3', 'pose-sanskrit');
    const instructionBox = createElement('p', 'voice-instruction');

    const controls = createElement('div', 'practice-controls');
    const timerCircle = createElement('div', 'timer-circle', '60s');
    const nextBtn = createElement('button', 'btn-primary', 'Next');

    // Decoration
    const paws = createElement('div', 'cat-paws-decoration', '🐾 🐾');

    // Logic
    let timerInterval;

    function startTimer(duration) {
        clearInterval(timerInterval);
        let timeLeft = duration;
        timerCircle.textContent = `${timeLeft}s`;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerCircle.textContent = `${timeLeft}s`;

            if (timeLeft <= 3 && timeLeft > 0) {
                playBeep();
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerCircle.textContent = "Done";
                playBell();
            }
        }, 1000);
    }

    function cleanup() {
        clearInterval(timerInterval);
    }

    function loadPose(index) {
        if (index >= sessionPoses.length) {
            cleanup();
            finishSession();
            return;
        }

        const pose = sessionPoses[index];
        poseName.textContent = pose.name;
        poseSanskrit.textContent = pose.sanskrit;
        instructionBox.textContent = `Soft Voice: "${pose.description}"`;

        // Use smart image loading with fallback
        setSmartImage(poseImage, pose.image, '🧘‍♀️', { scale: pose.scale || 1.0 }); // Default scale 1.0

        // Start "blurred" then focus
        poseImage.classList.add('blurred');
        setTimeout(() => poseImage.classList.remove('blurred'), 500);

        // Update Harmony
        const progress = ((index + 1) / 10) * 100;
        harmonyBar.updateProgress(progress);

        // Timer
        startTimer(pose.duration || 60);

        // Random tip occasionally
        if (Math.random() > 0.7) {
            instructionBox.textContent += `\n\n(Tip: ${tips[Math.floor(Math.random() * tips.length)]})`;
        }
    }

    function finishSession() {
        clearContainer(container);
        const winScreen = createElement('div', 'win-screen fade-in');
        winScreen.innerHTML = '<h2>Namaste 🙏</h2><p>Your harmony with nature is restored.</p>';
        const homeBtn = createElement('button', 'btn-primary', 'Home');
        const logBtn = createElement('button', 'btn-secondary', 'Log Mood 🐾');

        homeBtn.onclick = () => renderDashboard(container);
        logBtn.onclick = () => renderTracker(container, { autoOpenToday: true });

        const btnGroup = createElement('div', 'preview-actions'); // Re-using or making a flex container
        btnGroup.style.display = 'flex';
        btnGroup.style.gap = '10px';
        btnGroup.style.justifyContent = 'center';

        btnGroup.appendChild(homeBtn);
        btnGroup.appendChild(logBtn);

        winScreen.appendChild(btnGroup);
        container.appendChild(winScreen);
    }

    // Wire up exit button to cleanup
    closeBtn.onclick = () => {
        cleanup();
        renderDashboard(container);
    };

    nextBtn.onclick = () => {
        currentIndex++;
        loadPose(currentIndex);
    };

    controls.appendChild(timerCircle);
    controls.appendChild(nextBtn);

    mainContent.appendChild(poseImage);
    mainContent.appendChild(poseName);
    mainContent.appendChild(poseSanskrit);
    mainContent.appendChild(instructionBox);
    mainContent.appendChild(controls);
    mainContent.appendChild(paws);

    container.appendChild(header);
    container.appendChild(harmonyBar);
    container.appendChild(mainContent);

    // Init
    loadPose(0);
}
