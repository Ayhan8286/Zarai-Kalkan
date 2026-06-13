// ============================================
// ZARAI KALKAN — Progress Bar Component
// ============================================

/**
 * Renders a progress bar
 * @param {number} percentage 0 to 100
 * @param {string} type 'warning', 'danger', or '' (default/success)
 */
export function renderProgressBar(percentage = 0, type = '') {
  const cleanPct = Math.min(100, Math.max(0, percentage));
  return `
    <div class="progress-bar" role="progressbar" aria-valuenow="${cleanPct}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar-fill ${type}" style="width: ${cleanPct}%"></div>
    </div>
  `;
}

export default renderProgressBar;
