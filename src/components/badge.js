// ============================================
// ZARAI KALKAN — Badge Component
// ============================================

/**
 * Renders a color-coded status badge
 * @param {string} text The badge label
 * @param {string} type 'success', 'warning', 'danger', 'info', 'neutral', 'primary'
 * @param {Object} options Config options:
 *   - dot {boolean} Renders a status indicator dot
 */
export function renderBadge(text, type = 'neutral', options = {}) {
  const { dot = false } = options;
  return `
    <span class="badge badge-${type} ${dot ? 'badge-dot' : ''}">
      ${text}
    </span>
  `;
}

export default renderBadge;
