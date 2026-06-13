// ============================================
// ZARAI KALKAN — Risk Meter Component
// ============================================

/**
 * Renders a circular risk meter
 * @param {string} level 'green', 'yellow', or 'red'
 * @param {string} label Label text (e.g. 'Risk Level')
 * @param {string} value Value text (e.g. 'SAFE', 'WARNING', 'EMERGENCY')
 */
export function renderRiskMeter(level = 'green', label = 'Risk Level', value = 'SAFE') {
  return `
    <div class="risk-meter risk-meter-${level}">
      <div class="risk-meter-inner">
        <span class="risk-meter-label">${label}</span>
        <span class="risk-meter-value">${value}</span>
      </div>
    </div>
  `;
}

export default renderRiskMeter;
