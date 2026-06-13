// ============================================
// ZARAI KALKAN — Chart Widget Component
// ============================================

import Chart from 'chart.js/auto';

// Global options for Chart.js
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#6B7280';

export function renderChart(canvasId, type, data, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.warn(`Canvas element with id "${canvasId}" not found.`);
    return null;
  }

  const ctx = canvas.getContext('2d');
  
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: '#1A1A2E',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: true
      }
    }
  };

  // Merge options
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins
    }
  };

  return new Chart(ctx, {
    type,
    data,
    options: mergedOptions
  });
}

export default renderChart;
