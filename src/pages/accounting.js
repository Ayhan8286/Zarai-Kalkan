// ============================================
// ZARAI KALKAN — Accounting Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { renderFilterBar } from '../components/filter-bar.js';
import { renderChart } from '../components/chart-widget.js';
import { formatCurrency, formatDate, generateId, debounce, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal, openConfirm } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function accountingPage(container) {
  let incomeChart = null;
  let categoryChart = null;

  let searchQuery = '';
  let selectedType = 'all';
  let sortOrder = 'newest';

  function render() {
    const state = store.getState();
    const allTxns = state.transactions || [];

    // Filter data
    let filteredTxns = allTxns.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesType = true;
      if (selectedType !== 'all') {
        if (selectedType === 'Sale') matchesType = t.amount > 0;
        else if (selectedType === 'Expense') matchesType = t.amount < 0;
        else matchesType = t.type === selectedType;
      }

      return matchesSearch && matchesType;
    });

    // Sort data
    filteredTxns.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Calculate Stats
    const income = allTxns.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = Math.abs(allTxns.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    const profit = income - expenses;
    const count = allTxns.length;

    container.innerHTML = `
      <div class="accounting-page animate-fade-in">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navAccounting') || 'Ledger Accounting'}</h2>
            <p class="text-xs text-muted">Manage your rural business incomes, expenses, purchases and loans.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-txn-top">
            ${icons.plus} ${t('addTransaction') || 'Add Record'}
          </button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard('Total Inflow (Income)', formatCurrency(income), '', 'green', 'trendingUp', 'positive')}
          ${renderStatsCard('Total Outflow (Expenses)', formatCurrency(expenses), '', 'red', 'trendingDown', 'negative')}
          ${renderStatsCard('Net Profit/Loss', formatCurrency(profit), '', profit >= 0 ? 'blue' : 'amber', 'award', profit >= 0 ? 'positive' : 'negative')}
          ${renderStatsCard('Total Records', count, '', 'neutral', 'fileText')}
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- Income vs Expense Trend -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">Monthly Cash Flow Trend</h3>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="income-chart-canvas"></canvas>
              </div>
            </div>
          </div>

          <!-- Expense Category Breakdown -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">Expenses Breakdown</h3>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="category-chart-canvas"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter and Search Controls -->
        <div class="card mb-6">
          <div class="card-body-full">
            ${renderFilterBar({
              searchPlaceholder: 'Search descriptions or categories...',
              searchValue: searchQuery,
              filters: [
                {
                  id: 'filter-type',
                  label: 'Type',
                  selected: selectedType,
                  options: [
                    { value: 'all', label: 'All Types' },
                    { value: 'Sale', label: 'Sale / Income' },
                    { value: 'Expense', label: 'Expense / Outflow' },
                    { value: 'Debt', label: 'Credit / Loan' }
                  ]
                },
                {
                  id: 'filter-sort',
                  label: 'Sort',
                  selected: sortOrder,
                  options: [
                    { value: 'newest', label: 'Newest First' },
                    { value: 'oldest', label: 'Oldest First' }
                  ]
                }
              ]
            })}

            <!-- Data Table -->
            <div class="mt-4">
              ${renderDataTable(
                [
                  { key: 'date', label: 'Date', style: 'width: 120px;', render: r => formatDate(r.date) },
                  { key: 'type', label: 'Type', style: 'width: 110px;', render: r => {
                      const type = r.amount > 0 ? 'success' : (r.type === 'Debt' ? 'warning' : 'danger');
                      const label = r.amount > 0 ? 'Income' : (r.type || 'Expense');
                      return renderBadge(label, type);
                    }
                  },
                  { key: 'description', label: 'Description', render: r => `<strong>${r.description}</strong>` },
                  { key: 'category', label: 'Category', style: 'width: 180px;', render: r => renderBadge(r.category, 'neutral') },
                  { key: 'amount', label: 'Amount', style: 'text-align: right; width: 140px;', render: r => {
                      const isPositive = r.amount > 0;
                      return `<span class="${isPositive ? 'text-success' : 'text-danger'} font-semibold">${formatCurrency(r.amount)}</span>`;
                    }
                  },
                  {
                    key: 'actions',
                    label: '',
                    style: 'width: 100px; text-align: center;',
                    render: r => `
                      <div class="table-actions" style="justify-content: center;">
                        <button class="btn btn-ghost btn-icon btn-sm edit-txn-btn" data-id="${r.id}">${icons.edit}</button>
                        <button class="btn btn-ghost btn-icon btn-sm delete-txn-btn" data-id="${r.id}">${icons.trash}</button>
                      </div>
                    `
                  }
                ],
                filteredTxns,
                { emptyMessage: 'No transactions match your search/filter criteria. Click "Add Record" to create one.' }
              )}
            </div>
          </div>
        </div>

        <!-- Floating Action Button -->
        <button class="fab" id="fab-add-txn" title="Add Transaction">
          ${icons.plus}
        </button>
      </div>
    `;

    // Initialize Charts
    initCharts(allTxns);

    // Event listeners
    document.getElementById('btn-add-txn-top')?.addEventListener('click', () => openFormModal());
    document.getElementById('fab-add-txn')?.addEventListener('click', () => openFormModal());

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value;
        render();
      }, 300));
    }

    document.getElementById('filter-type')?.addEventListener('change', (e) => {
      selectedType = e.target.value;
      render();
    });

    document.getElementById('filter-sort')?.addEventListener('change', (e) => {
      sortOrder = e.target.value;
      render();
    });

    // Edit and Delete buttons inside the table
    container.querySelectorAll('.edit-txn-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const txn = allTxns.find(t => t.id === id);
        if (txn) openFormModal(txn);
      });
    });

    container.querySelectorAll('.delete-txn-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openConfirm('Delete Transaction', 'Are you sure you want to permanently delete this transaction record? This will update all dashboard metrics.', () => {
          store.removeFromArray('transactions', id);
          showToast('Transaction deleted successfully', 'success');
          render();
        });
      });
    });
  }

  function initCharts(txns) {
    // 1. Line Chart: Monthly Cash Flow
    // Calculate last 6 months dynamic totals
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyIncome = [0, 0, 0, 0, 0, 0];
    const monthlyExpenses = [0, 0, 0, 0, 0, 0];

    txns.forEach(t => {
      const d = new Date(t.date);
      const mIdx = d.getMonth(); // 0-11
      // For demo, map months to Jan-Jun (0-5)
      const mappedIdx = mIdx % 6; 
      if (t.amount > 0) {
        monthlyIncome[mappedIdx] += t.amount;
      } else {
        monthlyExpenses[mappedIdx] += Math.abs(t.amount);
      }
    });

    // If all are zero (e.g. fresh custom list), use mock trend
    if (monthlyIncome.every(x => x === 0) && monthlyExpenses.every(x => x === 0)) {
      monthlyIncome.splice(0, 6, 35000, 42000, 38000, 45000, 52000, 48500);
      monthlyExpenses.splice(0, 6, 22000, 28000, 25000, 30000, 35000, 31200);
    }

    incomeChart = renderChart('income-chart-canvas', 'line', {
      labels: months,
      datasets: [
        {
          label: 'Inflow (Income)',
          data: monthlyIncome,
          borderColor: '#2E7D32',
          backgroundColor: 'rgba(46, 125, 50, 0.05)',
          borderWidth: 3,
          tension: 0.3,
          fill: true
        },
        {
          label: 'Outflow (Expenses)',
          data: monthlyExpenses,
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.05)',
          borderWidth: 3,
          tension: 0.3,
          fill: true
        }
      ]
    });

    // 2. Doughnut Chart: Categories
    const categoriesMap = {};
    txns.filter(t => t.amount < 0).forEach(t => {
      categoriesMap[t.category] = (categoriesMap[t.category] || 0) + Math.abs(t.amount);
    });

    const categories = Object.keys(categoriesMap);
    const categoryTotals = Object.values(categoriesMap);
    const colors = ['#2E7D32', '#8D6E63', '#F9A825', '#2196F3', '#E65100', '#7B1FA2'];

    // If empty categories, use mock
    const chartLabels = categories.length > 0 ? categories : ['Seeds & Fertilizer', 'Fuel', 'Labor', 'Equipment'];
    const chartData = categoryTotals.length > 0 ? categoryTotals : [12500, 7000, 9500, 2200];

    categoryChart = renderChart('category-chart-canvas', 'doughnut', {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: colors.slice(0, chartLabels.length),
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    }, {
      plugins: {
        legend: {
          position: 'right'
        }
      }
    });
  }

  function openFormModal(existingTxn = null) {
    const isEdit = !!existingTxn;
    const title = isEdit ? 'Edit Transaction Record' : 'Record New Transaction';

    const saleCats = ['Wheat Crop Sale', 'Vegetable Sale', 'Cotton Sale', 'Dairy Product Sale', 'Government Subsidy'];
    const expenseCats = ['Seeds & Fertilizers', 'Tractor Fuel', 'Tube Well Electricity', 'Farm Labor Wage', 'Pesticide Spray'];
    const debtCats = ['Outstanding credit', 'Equipment loan payment', 'Seed dealer debt'];

    const type = isEdit ? (existingTxn.amount > 0 ? 'Sale' : (existingTxn.type || 'Expense')) : 'Sale';
    const category = isEdit ? existingTxn.category : saleCats[0];
    const amount = isEdit ? Math.abs(existingTxn.amount) : '';
    const date = isEdit ? existingTxn.date : new Date().toISOString().split('T')[0];
    const desc = isEdit ? existingTxn.description : '';

    const content = `
      <form id="txn-form">
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-select" id="form-type" ${isEdit ? 'disabled' : ''}>
            <option value="Sale" ${type === 'Sale' ? 'selected' : ''}>Sale / Income</option>
            <option value="Expense" ${type === 'Expense' ? 'selected' : ''}>Expense / Outflow</option>
            <option value="Debt" ${type === 'Debt' ? 'selected' : ''}>Credit / Debt / Loan</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="form-category">
            <!-- Populated dynamically -->
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <input type="text" class="form-input" id="form-desc" value="${desc}" placeholder="e.g. Bought Urea bags" required>
        </div>
        <div class="form-group">
          <label class="form-label">Amount (Rs.)</label>
          <input type="number" class="form-input" id="form-amount" value="${amount}" min="1" placeholder="e.g. 5000" required>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="form-date" value="${date}" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" id="form-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Record</button>
        </div>
      </form>
    `;

    openModal(title, content);

    const typeSelect = document.getElementById('form-type');
    const categorySelect = document.getElementById('form-category');

    function updateCategoryDropdown(selectedType) {
      let cats = saleCats;
      if (selectedType === 'Expense') cats = expenseCats;
      if (selectedType === 'Debt') cats = debtCats;

      categorySelect.innerHTML = cats.map(c => `
        <option value="${c}" ${c === category ? 'selected' : ''}>${c}</option>
      `).join('');
    }

    // Initial category population
    updateCategoryDropdown(type);

    typeSelect.addEventListener('change', (e) => {
      updateCategoryDropdown(e.target.value);
    });

    document.getElementById('form-cancel')?.addEventListener('click', closeModal);

    document.getElementById('txn-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const chosenType = typeSelect.value;
      const chosenCat = categorySelect.value;
      const chosenDesc = document.getElementById('form-desc').value;
      const rawAmt = parseFloat(document.getElementById('form-amount').value);
      const chosenDate = document.getElementById('form-date').value;

      // Expense amounts are saved negative, sale is positive, debt is negative as well (outflow/liability)
      const finalAmt = chosenType === 'Sale' ? rawAmt : -rawAmt;

      if (isEdit) {
        // Update
        store.updateInArray('transactions', existingTxn.id, {
          category: chosenCat,
          description: chosenDesc,
          amount: finalAmt,
          date: chosenDate,
          type: chosenType
        });
        showToast('Record updated successfully', 'success');
      } else {
        // Create
        const newRecord = {
          id: generateId(),
          date: chosenDate,
          description: chosenDesc,
          category: chosenCat,
          amount: finalAmt,
          type: chosenType
        };
        store.addToArray('transactions', newRecord);
        showToast('Record added successfully', 'success');
      }

      closeModal();
      render();
    });
  }

  // Initial render
  render();

  // Cleanup: destroy Chart instances to prevent memory leaks
  return () => {
    if (incomeChart) incomeChart.destroy();
    if (categoryChart) categoryChart.destroy();
  };
}
