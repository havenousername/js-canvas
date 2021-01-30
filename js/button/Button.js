"use strict";

/**
 * @param {string} label
 * @param {'is-primary' | 'is-secondary' | 'is-danger'} type
 * @param {object} handlers
 * @param {string | null} appendId
 * @param {string | null} id
 */

const createButton = (label,  type, handlers ,appendId = null, id = null ) => {
    if (!label && !type) {
        throw new Error('Argument passing error. Please enter all required parameters(2 in this case)');
    }
    const button = document.createElement('button');
    button.classList.add('is-button');
    button.classList.add(type);
    button.innerHTML = label;
    if (handlers && handlers.click) {
        button.addEventListener('click', () => {
            handlers.click();
        })
    }
    if (id) {
        button.id = id;
    }
    if (appendId) {
        const el = document.getElementById(appendId);
        el.appendChild(button);
    } else {
        const footer = document.getElementById('footer')
        footer.appendChild(button);
    }
}
