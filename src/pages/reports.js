// ============================================
// ZARAI KALKAN — Financial Reports Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderChart } from '../components/chart-widget.js';
import { exportToPDF } from '../utils/pdf-export.js';
import { formatCurrency, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { showToast } from '../components/toast.js';

export default function reportsPage(container) {
  let lineChart = null;
  let barChart = null;
  let pieChart = null;

  let selectedMonth = 'all'; // 'all', '0', '1', '2', '3', '4', '5' (Jan-Jun)
  let selectedYear = '2026';
  let selectedType = 'all'; // 'all', 'income', 'expenses', 'p&l'

  const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  function render() {
    const state = store.getState();
    const txns = state.transactions || [];

    // Calculate dynamic totals per month for Jan-Jun
    const monthlyIncome = [0, 0, 0, 0, 0, 0];
    const monthlyExpenses = [0, 0, 0, 0, 0, 0];

    txns.forEach(t => {
      const d = new Date(t.date);
      const mIdx = d.getMonth();
      const mappedIdx = mIdx % 6; // Limit to 6 slots for our simple line charts
      if (t.amount > 0) {
        monthlyIncome[mappedIdx] += t.amount;
      } else {
        monthlyExpenses[mappedIdx] += Math.abs(t.amount);
      }
    });

    // Handle initial state if empty
    if (monthlyIncome.every(x => x === 0) && monthlyExpenses.every(x => x === 0)) {
      monthlyIncome.splice(0, 6, 35000, 42000, 38000, 45000, 52000, 48500);
      monthlyExpenses.splice(0, 6, 22000, 28000, 25000, 30000, 35000, 31200);
    }

    const monthlyProfit = monthlyIncome.map((inc, i) => inc - monthlyExpenses[i]);

    // Compute stats based on selection
    let activeIncome = 0;
    let activeExpense = 0;
    let activeProfit = 0;
    let savingsRate = 0;

    if (selectedMonth === 'all') {
      activeIncome = monthlyIncome.reduce((s, x) => s + x, 0);
      activeExpense = monthlyExpenses.reduce((s, x) => s + x, 0);
      activeProfit = activeIncome - activeExpense;
      savingsRate = activeIncome > 0 ? ((activeProfit / activeIncome) * 100) : 0;
    } else {
      const idx = parseInt(selectedMonth);
      activeIncome = monthlyIncome[idx];
      activeExpense = monthlyExpenses[idx];
      activeProfit = monthlyProfit[idx];
      savingsRate = activeIncome > 0 ? ((activeProfit / activeIncome) * 100) : 0;
    }

    container.innerHTML = `
      <div class="reports-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navReports') || 'Financial Analytics & Reports'}</h2>
            <p class="text-xs text-muted">Generate financial summaries, export tax files, and audit your rural business efficiency.</p>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-outline" id="btn-print-report">
              ${icons.printer || '🖨️'} Print Statement
            </button>
            <button class="btn btn-primary" id="btn-download-pdf">
              ${icons.download} Download PDF Report
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="card mb-6">
          <div class="card-body-full flex gap-3 flex-wrap items-center">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="text-xs text-muted">Month:</span>
              <select class="filter-select" id="report-month">
                <option value="all" ${selectedMonth === 'all' ? 'selected' : ''}>All Months (Jan-Jun)</option>
                ${monthsList.map((m, idx) => `
                  <option value="${idx}" ${selectedMonth === String(idx) ? 'selected' : ''}>${m}</option>
                `).join('')}
              </select>
            </div>
            
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="text-xs text-muted">Year:</span>
              <select class="filter-select" id="report-year">
                <option value="2026" selected>2026</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="text-xs text-muted">Report Type:</span>
              <select class="filter-select" id="report-type">
                <option value="all" ${selectedType === 'all' ? 'selected' : ''}>Comprehensive P&L</option>
                <option value="income" ${selectedType === 'income' ? 'selected' : ''}>Income Ledger Only</option>
                <option value="expenses" ${selectedType === 'expenses' ? 'selected' : ''}>Expense Ledger Only</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard('Operating Revenue', formatCurrency(activeIncome), '', 'green', 'trendingUp', 'positive')}
          ${renderStatsCard('Operating Expense', formatCurrency(activeExpense), '', 'red', 'trendingDown', 'negative')}
          ${renderStatsCard('Net Profit/Loss', formatCurrency(activeProfit), '', activeProfit >= 0 ? 'blue' : 'amber', 'award', activeProfit >= 0 ? 'positive' : 'negative')}
          ${renderStatsCard('Savings & Reinvestment Rate', `${savingsRate.toFixed(1)}%`, '', 'purple', 'percent')}
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- Income vs Expense Line Chart -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">Cash Flow Trends (Line Chart)</h3>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="reports-line-canvas"></canvas>
              </div>
            </div>
          </div>

          <!-- Monthly Profits Bar Chart -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">Monthly Net Profit (Bar Chart)</h3>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="reports-bar-canvas"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Doughnut Full-width Breakdown -->
        <div class="card mb-6">
          <div class="card-header">
            <h3 class="card-header-title">Operating Expense Categories</h3>
          </div>
          <div class="card-body" style="display: flex; align-items: center; justify-content: center;">
            <div class="chart-container-sm" style="max-width: 400px; width: 100%;">
              <canvas id="reports-pie-canvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Seasonal Report Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">Monthly Statement Breakdown</h3>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'month', label: 'Month', render: r => `<strong>${r.month}</strong>` },
                { key: 'income', label: 'Revenue (Inflow)', render: r => formatCurrency(r.income) },
                { key: 'expenses', label: 'Expenses (Outflow)', render: r => formatCurrency(r.expenses) },
                { key: 'profit', label: 'Net Profit', render: r => {
                    const isPositive = r.profit >= 0;
                    return `<span class="${isPositive ? 'text-success' : 'text-danger'} font-semibold">${formatCurrency(r.profit)}</span>`;
                  }
                },
                { key: 'margin', label: 'Profit Margin', render: r => `${r.margin.toFixed(1)}%` }
              ],
              monthsList.map((m, idx) => {
                const inc = monthlyIncome[idx];
                const exp = monthlyExpenses[idx];
                const prof = monthlyProfit[idx];
                const marg = inc > 0 ? ((prof / inc) * 100) : 0;
                return {
                  month: m,
                  income: inc,
                  expenses: exp,
                  profit: prof,
                  margin: marg,
                  index: idx
                };
              }),
              {
                rowClass: (r) => selectedMonth !== 'all' && String(r.index) === selectedMonth ? 'active-report-row' : '',
                emptyMessage: 'No monthly summary available.'
              }
            )}
          </div>
        </div>
      </div>
    `;

    // Initialize Charts
    initCharts(monthlyIncome, monthlyExpenses, monthlyProfit, txns);

    // Event Listeners
    document.getElementById('btn-download-pdf').addEventListener('click', () => {
      exportToPDF(`Zarai_Kalkan_${selectedYear}_Statement`, {
        year: selectedYear,
        month: selectedMonth,
        type: selectedType
      });
    });

    document.getElementById('btn-print-report').addEventListener('click', () => {
      showToast('Preparing statement. Opening system print window...', 'info');
      setTimeout(() => {
        window.print();
      }, 1000);
    });

    document.getElementById('report-month').addEventListener('change', (e) => {
      selectedMonth = e.target.value;
      render();
    });

    document.getElementById('report-type').addEventListener('change', (e) => {
      selectedType = e.target.value;
      render();
    });
  }

  function initCharts(monthlyIncome, monthlyExpenses, monthlyProfit, txns) {
    // 1. Line Chart
    lineChart = renderChart('reports-line-canvas', 'line', {
      labels: monthsList,
      datasets: [
        {
          label: 'Revenue',
          data: monthlyIncome,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.05)',
          borderWidth: 3,
          tension: 0.2
        },
        {
          label: 'Expenses',
          data: monthlyExpenses,
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.05)',
          borderWidth: 3,
          tension: 0.2
        }
      ]
    });

    // 2. Bar Chart
    barChart = renderChart('reports-bar-canvas', 'bar', {
      labels: monthsList,
      datasets: [
        {
          label: 'Profit / Loss',
          data: monthlyProfit,
          backgroundColor: monthlyProfit.map(v => v >= 0 ? 'rgba(76, 175, 80, 0.7)' : 'rgba(244, 67, 54, 0.7)'),
          borderColor: monthlyProfit.map(v => v >= 0 ? '#4CAF50' : '#F44336'),
          borderWidth: 1.5
        }
      ]
    });

    // 3. Expense breakdown pie
    const categoriesMap = {};
    txns.filter(t => t.amount < 0).forEach(t => {
      categoriesMap[t.category] = (categoriesMap[t.category] || 0) + Math.abs(t.amount);
    });

    const categories = Object.keys(categoriesMap);
    const categoryTotals = Object.values(categoriesMap);
    const colors = ['#2E7D32', '#8D6E63', '#F9A825', '#2196F3', '#E65100', '#7B1FA2'];

    const chartLabels = categories.length > 0 ? categories : ['Seeds & Fertilizer', 'Fuel', 'Labor', 'Equipment'];
    const chartData = categoryTotals.length > 0 ? categoryTotals : [12500, 7000, 9500, 2200];

    pieChart = renderChart('reports-pie-canvas', 'doughnut', {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: colors.slice(0, chartLabels.length),
        borderWidth: 1.5
      }]
    }, {
      plugins: {
        legend: {
          position: 'right'
        }
      }
    });
  }

  // Initial render
  render();

  return () => {
    if (lineChart) lineChart.destroy();
    if (barChart) barChart.destroy();
    if (pieChart) pieChart.destroy();
  };
}
