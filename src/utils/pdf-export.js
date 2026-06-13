// ============================================
// ZARAI KALKAN — Simulated PDF Export Utility
// ============================================

import { showToast } from '../components/toast.js';

/**
 * Simulates generating and downloading a PDF report.
 * @param {string} title The title of the report
 * @param {Object} data Optional metadata to include in the simulation
 */
export function exportToPDF(title = 'Report', data = {}) {
  showToast(`Generating PDF report for "${title}"...`, 'info');
  
  setTimeout(() => {
    // Generate a temporary anchor element to simulate the download
    const dummyBlobContent = `ZARAI KALKAN FINANCIAL REPORT\nTitle: ${title}\nGenerated on: ${new Date().toLocaleString()}\nVerified: Simulated Electronic Signature`;
    const blob = new Blob([dummyBlobContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_report.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`PDF report "${title}" downloaded successfully!`, 'success');
  }, 1200);
}

export default exportToPDF;
