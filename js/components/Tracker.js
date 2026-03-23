import { createElement, clearContainer } from '../utils/dom.js';
import { renderDashboard } from './Dashboard.js';
import { moods } from '../data/moods.js';
import { saveMoodLog, getMoodForDate, getStats } from '../utils/storage.js';

export function renderTracker(container, options = {}) {
    clearContainer(container);

    // State
    let currentDate = new Date();
    let selectedDate = null;

    // Layout
    const header = createElement('div', 'header-row');
    const backBtn = createElement('button', 'icon-btn', '←');
    backBtn.onclick = () => renderDashboard(container);

    const title = createElement('h2', '', 'Mood Calendar');

    header.appendChild(backBtn);
    header.appendChild(title);

    const content = createElement('div', 'tracker-content fade-in');

    // Controls for Month Navigation
    const monthControls = createElement('div', 'month-controls');
    const prevMonthBtn = createElement('button', 'icon-btn', '<');
    const nextMonthBtn = createElement('button', 'icon-btn', '>');
    const monthLabel = createElement('span', 'month-label');

    // Stats Section
    const stats = getStats();
    const statsBox = createElement('div', 'stats-box', `Streak: ${stats.streak} days 🔥 | Total: ${stats.total} entries`);

    // Calendar Grid
    const calendarGrid = createElement('div', 'calendar-grid');

    // Modal for logging
    const modal = createElement('div', 'mood-modal hidden');
    const modalContent = createElement('div', 'mood-modal-content');
    modal.appendChild(modalContent);
    container.appendChild(modal); // Append to container so it overlays

    function updateCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthLabel.textContent = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });

        // First day of the month
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Mon=0, Sun=6

        // Weekday headers
        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        weekDays.forEach(day => {
            const el = createElement('div', 'calendar-day-header', day);
            calendarGrid.appendChild(el);
        });

        // Empty slots
        for (let i = 0; i < startDayIndex; i++) {
            calendarGrid.appendChild(createElement('div', 'calendar-day empty'));
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const log = getMoodForDate(dateStr);

            const dayEl = createElement('div', 'calendar-day');
            const dayNum = createElement('span', 'day-num', String(day));
            dayEl.appendChild(dayNum);

            if (log) {
                const mood = moods.find(m => m.id === log.moodId);
                if (mood) {
                    dayEl.classList.add('has-mood');
                    dayEl.style.backgroundColor = mood.color;
                    dayEl.setAttribute('title', mood.label);

                    const icon = createElement('span', 'day-mood-icon', mood.icon);
                    dayEl.appendChild(icon);
                }
            }

            dayEl.onclick = () => openMoodSelector(dateStr);
            calendarGrid.appendChild(dayEl);
        }
    }

    function openMoodSelector(dateStr) {
        selectedDate = dateStr;
        modalContent.innerHTML = '';
        modal.classList.remove('hidden');

        const title = createElement('h3', 'modal-title', `How was the cat on ${dateStr}?`);
        const moodGrid = createElement('div', 'mood-selection-grid');

        moods.forEach(mood => {
            const btn = createElement('button', 'mood-select-btn');
            btn.style.backgroundColor = mood.color;
            btn.innerHTML = `<span class="mood-icon">${mood.icon}</span><span class="mood-label">${mood.label}</span>`;

            btn.onclick = () => {
                saveMoodLog(selectedDate, mood.id);
                closeModal();
                updateCalendar();
                // Update stats logic could go here or require full re-render
                // For now, let's just refresh the view
                renderTracker(container);
            };
            moodGrid.appendChild(btn);
        });

        const closeBtn = createElement('button', 'btn-secondary', 'Cancel');
        closeBtn.onclick = closeModal;

        modalContent.appendChild(title);
        modalContent.appendChild(moodGrid);
        modalContent.appendChild(closeBtn);
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    // Wiring controls
    prevMonthBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    };
    nextMonthBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    };

    monthControls.appendChild(prevMonthBtn);
    monthControls.appendChild(monthLabel);
    monthControls.appendChild(nextMonthBtn);

    content.appendChild(statsBox);
    content.appendChild(monthControls);
    content.appendChild(calendarGrid);

    container.appendChild(header);
    container.appendChild(content);

    // Initial Render
    updateCalendar();

    if (options.autoOpenToday) {
        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        openMoodSelector(todayStr);
    }
}
