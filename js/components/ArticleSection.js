import { createElement, clearContainer, getProfile } from '../utils/dom.js';
import { articles } from '../data/content.js';
import { renderDashboard } from './Dashboard.js'; // Back nav

export function renderArticles(container) {
    clearContainer(container);

    const header = createElement('div', 'header-row');
    const backBtn = createElement('button', 'icon-btn', '←');
    backBtn.onclick = () => renderDashboard(container);

    const title = createElement('h2', '', 'Insights');

    header.appendChild(backBtn);
    header.appendChild(title);

    const list = createElement('div', 'article-list fade-in');

    articles.forEach(article => {
        const item = createElement('div', 'article-item');
        item.textContent = article.title;
        item.onclick = () => showArticleModal(article);
        list.appendChild(item);
    });

    container.appendChild(header);
    container.appendChild(list);
}

function showArticleModal(article) {
    const modal = createElement('div', 'app-modal');
    // Close on click outside
    modal.onclick = (e) => {
        if (e.target === modal) document.body.removeChild(modal);
    };

    const content = createElement('div', 'app-modal-content');

    // Header with Title and Close
    const header = createElement('div', 'app-modal-header');
    const title = createElement('h3', 'app-modal-title', article.longTitle || article.title);
    const closeBtn = createElement('button', 'app-modal-close', '×');
    closeBtn.onclick = () => document.body.removeChild(modal);

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Scrollable Body
    const body = createElement('div', 'app-modal-body');
    body.innerHTML = article.content; // Rendering HTML content

    content.appendChild(header);
    content.appendChild(body);
    modal.appendChild(content);

    document.body.appendChild(modal);
}
