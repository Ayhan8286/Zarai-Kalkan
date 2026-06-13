// ============================================
// ZARAI KALKAN — Filter Bar Component
// ============================================

import { icons } from '../utils/helpers.js';

/**
 * Renders a standard search and filter bar.
 * @param {Object} options Config object:
 *   - searchPlaceholder {string}
 *   - searchValue {string}
 *   - filters {Array} Array of filters: { id, label, selected, options: [{value, label}] }
 */
export function renderFilterBar(options = {}) {
  const {
    searchPlaceholder = 'Search...',
    searchValue = '',
    filters = []
  } = options;

  const filtersHtml = filters
    .map(f => {
      const selectOptions = f.options
        .map(opt => `<option value="${opt.value}" ${opt.value === f.selected ? 'selected' : ''}>${opt.label}</option>`)
        .join('');
      return `
        <select class="filter-select" id="${f.id}" aria-label="${f.label || 'Filter'}">
          ${selectOptions}
        </select>
      `;
    })
    .join('');

  return `
    <div class="filter-bar">
      <div class="search-input-wrapper">
        <span class="search-input-icon">${icons.search}</span>
        <input type="text" class="search-input" id="search-input" placeholder="${searchPlaceholder}" value="${searchValue}">
      </div>
      ${filtersHtml}
    </div>
  `;
}

export default renderFilterBar;
