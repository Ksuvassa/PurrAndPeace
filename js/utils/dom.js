export function createElement(tag, className, text = '', attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    return el;
}

export function clearContainer(container) {
    container.innerHTML = '';
}

export function saveProfile(data) {
    const current = getProfile();
    const updated = { ...current, ...data };
    localStorage.setItem('purrProfile', JSON.stringify(updated));
}

export function getProfile() {
    return JSON.parse(localStorage.getItem('purrProfile')) || {};
}

export function setSmartImage(container, imageUrl, fallbackContent, options = {}) {
    // Clear and set fallback initially
    container.innerHTML = '';
    container.textContent = fallbackContent;
    // Ensure container can center the text/emoji
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.background = 'transparent'; // Reset in case it had one

    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        container.textContent = '';
        container.style.display = 'flex'; // Keep flex for centering if needed

        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Pose illustration';
        imgElement.className = 'smart-image fade-in';

        // Style to fit container
        imgElement.style.maxWidth = '100%';
        imgElement.style.maxHeight = '100%';
        imgElement.style.objectFit = 'contain';

        // Apply transform if scale option is present
        if (options.scale) {
            imgElement.style.transform = `scale(${options.scale})`;
            imgElement.style.transition = 'transform 0.3s'; // Smooth change if dynamic
        }

        container.appendChild(imgElement);
    };
    // On error, the fallback text remains.
}
