// ============================================
// ZARAI KALKAN — Data Table Component
// ============================================

/**
 * Renders a semantic data table
 * @param {Array} columns Array of column config: { key, label, render: (row) => string }
 * @param {Array} data Array of objects representing rows
 * @param {Object} options Configuration options
 */
export function renderDataTable(columns, data, options = {}) {
  const { 
    emptyMessage = 'No records found',
    tableClass = '',
    rowClass = () => ''
  } = options;

  if (!data || data.length === 0) {
    return `
      <div class="empty-state" style="padding: var(--space-6) 0;">
        <div class="empty-state-title" style="font-size: var(--text-sm);">No Data Available</div>
        <p class="empty-state-text" style="font-size: var(--text-xs);">${emptyMessage}</p>
      </div>
    `;
  }

  const headerHtml = columns
    .map(col => `<th style="${col.style || ''}">${col.label}</th>`)
    .join('');

  const rowsHtml = data
    .map((row, index) => {
      const customClass = typeof rowClass === 'function' ? rowClass(row, index) : '';
      const cellsHtml = columns
        .map(col => {
          const content = typeof col.render === 'function' ? col.render(row, index) : (row[col.key] ?? '');
          return `<td style="${col.style || ''}">${content}</td>`;
        })
        .join('');
      return `<tr class="${customClass}">${cellsHtml}</tr>`;
    })
    .join('');

  return `
    <div class="data-table-wrapper">
      <table class="data-table ${tableClass}">
        <thead>
          <tr>
            ${headerHtml}
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

export default renderDataTable;
