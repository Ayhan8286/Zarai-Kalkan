// ============================================
// ZARAI KALKAN — Modal Component
// Reusable modal/popup system
// ============================================

import { icons } from '../utils/helpers.js';

let currentModalCleanup = null;

export function openModal(title, content, options = {}) {
  closeModal(); // Close any existing modal

  const modalRoot = document.getElementById('modal-root');
  const { size = '', onClose = null } = options;

  modalRoot.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal ${size === 'lg' ? 'modal-lg' : ''}">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" id="modal-close-btn">${icons.x}</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    </div>
  `;

  // Event listeners
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  const handleClose = () => {
    if (onClose) onClose();
    closeModal();
  };

  closeBtn.addEventListener('click', handleClose);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) handleClose();
  });

  // ESC key
  const handleEsc = (e) => {
    if (e.key === 'Escape') handleClose();
  };
  document.addEventListener('keydown', handleEsc);

  currentModalCleanup = () => {
    document.removeEventListener('keydown', handleEsc);
  };

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    modalRoot.innerHTML = '';
  }
  if (currentModalCleanup) {
    currentModalCleanup();
    currentModalCleanup = null;
  }
  document.body.style.overflow = '';
}

// Open a confirmation dialog
export function openConfirm(title, message, onConfirm) {
  const content = `
    <p style="margin-bottom: var(--space-5); color: var(--color-text-secondary);">${message}</p>
    <div class="modal-footer" style="padding: 0; border: none;">
      <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
      <button class="btn btn-danger" id="confirm-ok">Confirm</button>
    </div>
  `;

  openModal(title, content);

  document.getElementById('confirm-cancel')?.addEventListener('click', closeModal);
  document.getElementById('confirm-ok')?.addEventListener('click', () => {
    onConfirm();
    closeModal();
  });
}

export default { openModal, closeModal, openConfirm };
