// ============================================
// ZARAI KALKAN — Stats Card Component
// ============================================

import { icons } from '../utils/helpers.js';

export function renderStatsCard(title, value, changeText, type = 'blue', iconName = '', changeType = '') {
  // type: 'green', 'blue', 'amber', 'red', 'purple'
  // changeType: 'positive', 'negative'
  const iconHtml = iconName && icons[iconName] ? `
    <div class="stat-card-icon ${type}">
      ${icons[iconName]}
    </div>
  ` : '';

  const changeClass = changeType === 'positive' ? 'positive' : (changeType === 'negative' ? 'negative' : '');
  const changeIcon = changeType === 'positive' ? '↑' : (changeType === 'negative' ? '↓' : '');

  return `
    <div class="stat-card ${type}">
      <div class="stat-card-header">
        <span class="stat-card-label">${title}</span>
        ${iconHtml}
      </div>
      <div class="stat-card-value">${value}</div>
      ${changeText ? `
        <div class="stat-card-change ${changeClass}">
          <span>${changeIcon} ${changeText}</span>
        </div>
      ` : ''}
    </div>
  `;
}

export default renderStatsCard;
