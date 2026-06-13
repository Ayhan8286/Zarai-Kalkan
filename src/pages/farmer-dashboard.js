// ============================================
// ZARAI KALKAN — Farmer Dashboard Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { formatCurrency, formatDate, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function farmerDashboard(container) {
  function render() {
    const state = store.getState();
    const txns = state.transactions || [];
    const recentTxns = txns.slice(0, 5);

    // Calculate dynamic stats
    const income = txns.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = Math.abs(txns.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    const profit = income - expenses;
    const debt = state.customers ? state.customers.reduce((sum, c) => sum + (c.totalDue || 0), 0) : 8000;

    container.innerHTML = `
      <div class="dashboard-page animate-fade-in">
        <!-- Hero Banner -->
        <div class="hero-banner">
          <div class="hero-content">
            <div class="hero-greeting">${t('greeting') || 'Assalam-o-Alaikum'},</div>
            <h2 class="hero-name">${state.currentUser?.name || 'Ahmed Khan'}</h2>
            <div class="hero-meta">
              <div class="hero-meta-item">
                <span>📍</span>
                <span>${state.currentUser?.village || 'Chak 57, Bahawalpur'}</span>
              </div>
              <div class="hero-badge">
                <span>Verified Farmer ✅</span>
              </div>
            </div>
          </div>
          <div class="hero-illustration">
            <svg viewBox="0 0 64 64" width="100" height="100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: rgba(255,255,255,0.85);">
              <path d="M32 6 L32 58" stroke="currentColor" stroke-width="3"/>
              <path d="M32 20 Q12 16 16 28 Q32 30 32 20"/>
              <path d="M32 28 Q52 24 48 36 Q32 38 32 28"/>
              <path d="M32 38 Q12 34 16 46 Q32 48 32 38"/>
              <path d="M32 46 Q52 42 48 54 Q32 56 32 46"/>
            </svg>
          </div>
        </div>

        <!-- Quick Actions Row -->
        <div class="mb-6">
          <h4 class="font-semibold mb-2" style="font-size: var(--text-sm); color: var(--color-text-secondary);">${t('quickActions') || 'Quick Actions'}</h4>
          <div class="quick-actions">
            <button class="quick-action-btn" id="action-add-sale">
              ${icons.plus} ${t('addSale') || 'Add Sale'}
            </button>
            <button class="quick-action-btn" id="action-add-expense">
              ${icons.minus} ${t('addExpense') || 'Add Expense'}
            </button>
            <button class="quick-action-btn" id="action-report">
              ${icons.fileText} ${t('navReports') || 'Reports'}
            </button>
            <button class="quick-action-btn" id="action-insurance">
              ${icons.shield} ${t('navInsurance') || 'Insurance'}
            </button>
            <button class="quick-action-btn" id="action-support">
              ${icons.users} ${t('navSupport') || 'Support'}
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard(t('income') || 'Income', formatCurrency(income), '12%', 'green', 'trendingUp', 'positive')}
          ${renderStatsCard(t('expense') || 'Expenses', formatCurrency(expenses), '8%', 'red', 'trendingDown', 'negative')}
          ${renderStatsCard(t('profit') || 'Net Profit', formatCurrency(profit), '15%', 'blue', 'award', 'positive')}
          ${renderStatsCard(t('outstandingDebt') || 'Total Debt', formatCurrency(debt), '3%', 'amber', 'clock', 'negative')}
        </div>

        <!-- Two-column Layout -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- Crop Overview -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">${t('cropOverview') || 'My Crops'}</h3>
              <span class="card-header-action" id="action-crops-manage">${t('viewAll') || 'Manage'}</span>
            </div>
            <div class="card-body-full">
              ${renderDataTable(
                [
                  { key: 'name', label: t('crop') || 'Crop', render: r => `<div class="flex items-center gap-2"><span>🌾</span><strong>${r.name}</strong></div>` },
                  { key: 'acres', label: t('acres') || 'Acres', render: r => `${r.acres} Acres` },
                  { key: 'status', label: t('status') || 'Status', render: r => {
                      const type = r.status.toLowerCase() === 'healthy' ? 'success' : (r.status.toLowerCase().includes('risk') ? 'danger' : 'warning');
                      return renderBadge(r.status, type, { dot: true });
                    }
                  }
                ],
                state.crops && state.crops.length > 0 ? state.crops : [
                  { id: '1', name: 'Wheat', acres: 5, status: 'Healthy' },
                  { id: '2', name: 'Cotton', acres: 3, status: 'Moderate Risk' },
                  { id: '3', name: 'Vegetables', acres: 1, status: 'Healthy' }
                ]
              )}
            </div>
          </div>

          <!-- Weather Card -->
          <div class="card" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white;">
            <div class="card-header" style="border: none;">
              <h3 class="card-header-title" style="color: white;">${t('weather') || 'Weather & Emergency'}</h3>
              <span class="card-header-action" id="action-weather-more" style="color: #a8c0ff;">${t('details') || 'Details'}</span>
            </div>
            <div class="card-body">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <div class="text-3xl font-bold">37°C</div>
                  <div class="text-xs opacity-90">Bahawalpur (Chak 57)</div>
                </div>
                <div style="font-size: 3rem;">☀️</div>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center" style="background: rgba(255,255,255,0.1); padding: var(--space-3); border-radius: var(--radius-lg); font-size: var(--text-xs);">
                <div>
                  <div class="opacity-75">Humidity</div>
                  <div class="font-semibold">52%</div>
                </div>
                <div>
                  <div class="opacity-75">Wind</div>
                  <div class="font-semibold">12 km/h</div>
                </div>
                <div>
                  <div class="opacity-75">Rain</div>
                  <div class="font-semibold">10%</div>
                </div>
              </div>
              <div class="mt-4 flex items-center gap-3" style="background: rgba(76, 175, 80, 0.2); border: 1px solid rgba(76, 175, 80, 0.3); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);">
                <span style="font-size: 1.2rem;">🟢</span>
                <span class="text-xs">No active weather warnings. Crops safe.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="card mb-6">
          <div class="card-header">
            <h3 class="card-header-title">${t('recentTransactions') || 'Recent Financial Records'}</h3>
            <button class="btn btn-secondary btn-sm" id="action-view-accounting">${t('viewAll') || 'View All Ledger'}</button>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'date', label: t('date') || 'Date', render: r => formatDate(r.date) },
                { key: 'description', label: t('description') || 'Description' },
                { key: 'category', label: t('category') || 'Category', render: r => renderBadge(r.category, 'neutral') },
                { key: 'amount', label: t('amount') || 'Amount', style: 'text-align: right;', render: r => {
                    const isPositive = r.amount > 0;
                    return `<span class="${isPositive ? 'text-success' : 'text-danger'} font-semibold">${formatCurrency(r.amount)}</span>`;
                  }
                },
                {
                  key: 'actions',
                  label: '',
                  style: 'width: 80px;',
                  render: r => `
                    <div class="table-actions">
                      <button class="btn btn-ghost btn-icon btn-sm delete-txn-btn" data-id="${r.id}">${icons.trash}</button>
                    </div>
                  `
                }
              ],
              recentTxns,
              { emptyMessage: t('noTransactions') || 'No transactions recorded yet. Click Add Sale/Expense above to begin!' }
            )}
          </div>
        </div>

        <!-- Insurance Status & Policy Information -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">${t('insuranceStatus') || 'Insurance & Risk Protection'}</h3>
            <span class="card-header-action" id="action-insurance-manage">${t('details') || 'Manage'}</span>
          </div>
          <div class="card-body">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div style="font-size: 2.5rem; background: var(--color-primary-bg); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--color-primary);">🛡️</div>
                <div>
                  <h4 class="font-bold">Crop Protection Plan (Kharif wheat)</h4>
                  <p class="text-xs text-muted">Policy Number: ZK-CRP-99882</p>
                </div>
              </div>
              <div class="text-end">
                <div class="text-sm font-semibold text-success">Active Plan</div>
                <div class="text-xs text-muted">Rs. 100,000 Total Coverage</div>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-border-light); padding-top: var(--space-3); font-size: var(--text-xs);">
              <span>Monthly Premium: <strong>Rs. 500 / Month</strong></span>
              <span>Subscribed: <strong>12 Nov 2025</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    document.getElementById('action-add-sale')?.addEventListener('click', () => openTransactionModal('Sale'));
    document.getElementById('action-add-expense')?.addEventListener('click', () => openTransactionModal('Expense'));
    document.getElementById('action-report')?.addEventListener('click', () => window.router.navigate('/reports'));
    document.getElementById('action-insurance')?.addEventListener('click', () => window.router.navigate('/insurance'));
    document.getElementById('action-insurance-manage')?.addEventListener('click', () => window.router.navigate('/insurance'));
    document.getElementById('action-support')?.addEventListener('click', () => window.router.navigate('/loans'));
    document.getElementById('action-crops-manage')?.addEventListener('click', () => window.router.navigate('/settings'));
    document.getElementById('action-weather-more')?.addEventListener('click', () => window.router.navigate('/weather'));
    document.getElementById('action-view-accounting')?.addEventListener('click', () => window.router.navigate('/accounting'));

    // Handle Delete buttons in recent transactions table
    container.querySelectorAll('.delete-txn-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        store.removeFromArray('transactions', id);
        showToast('Transaction removed successfully', 'success');
        render();
      });
    });
  }

  function openTransactionModal(type) {
    const categories = type === 'Sale' 
      ? ['Wheat Crop Sale', 'Vegetable Sale', 'Cotton Sale', 'Dairy Product Sale', 'Government Subsidy']
      : ['Seeds & Fertilizers', 'Tractor Fuel', 'Tube Well Electricity', 'Farm Labor Wage', 'Pesticide Spray'];

    const content = `
      <form id="quick-txn-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Type</label>
          <input type="text" class="form-input" id="txn-type" value="${type}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="txn-category" required>
            ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <input type="text" class="form-input" id="txn-desc" placeholder="e.g. Sold 5 sacks of Wheat" required>
        </div>
        <div class="form-group">
          <label class="form-label">Amount (Rs.)</label>
          <input type="number" class="form-input" id="txn-amount" min="1" placeholder="e.g. 15000" required>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="txn-date" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" id="btn-close-modal">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Transaction</button>
        </div>
      </form>
    `;

    openModal(`Record New ${type === 'Sale' ? 'Sale / Income' : 'Expense'}`, content);

    // Cancel click
    document.getElementById('btn-close-modal')?.addEventListener('click', closeModal);

    // Form submit
    document.getElementById('quick-txn-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const category = document.getElementById('txn-category').value;
      const desc = document.getElementById('txn-desc').value;
      const amountVal = parseFloat(document.getElementById('txn-amount').value);
      const date = document.getElementById('txn-date').value;

      // Sale is positive, Expense is negative
      const amount = type === 'Sale' ? amountVal : -amountVal;

      const newTxn = {
        id: generateId(),
        date,
        description: desc,
        category,
        amount,
        type: type === 'Sale' ? 'Sale' : 'Expense'
      };

      store.addToArray('transactions', newTxn);
      showToast('Transaction saved successfully!', 'success');
      closeModal();
      
      // Re-render dashboard to update balances and list
      render();
    });
  }

  render();
}
