// ============================================
// ZARAI KALKAN — Shopkeeper Dashboard Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderDataTable } from '../components/data-table.js';
import { renderBadge } from '../components/badge.js';
import { formatCurrency, formatDate, generateId, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function shopkeeperDashboard(container) {
  // Low stock inventory mock data
  let lowStockInventory = [
    { id: 'inv_1', name: 'Urea Fertilizer (Sacks)', stock: 3, minLimit: 10, unit: 'Sacks' },
    { id: 'inv_2', name: 'Premium Wheat Seed', stock: 1, minLimit: 5, unit: 'Packets' },
    { id: 'inv_3', name: 'Kiryana Cooking Oil (Ghee)', stock: 2, minLimit: 8, unit: 'Cartons' },
    { id: 'inv_4', name: 'Basmati Rice (Sacks)', stock: 4, minLimit: 10, unit: 'Sacks' }
  ];

  function render() {
    const state = store.getState();
    const txns = state.transactions || [];
    const customers = state.customers || [];

    // Calculate shop stats
    const revenue = txns.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const purchases = Math.abs(txns.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    const outstandingCredit = customers.reduce((sum, c) => sum + (c.totalDue || 0), 0);
    const lowStockAlertsCount = lowStockInventory.filter(i => i.stock < i.minLimit).length;

    container.innerHTML = `
      <div class="dashboard-page animate-fade-in">
        <!-- Hero Banner -->
        <div class="hero-banner" style="background: linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1e88e5 100%);">
          <div class="hero-content">
            <div class="hero-greeting">${t('greeting') || 'Assalam-o-Alaikum'},</div>
            <h2 class="hero-name">${currentUser.name || 'Muhammad Aslam'}</h2>
            <div class="hero-meta">
              <div class="hero-meta-item">
                <span>📍</span>
                <span>${currentUser.village || 'Multan'}</span>
              </div>
              <div class="hero-meta-item">
                <span>🏪</span>
                <span>${currentUser.businessName || 'Al-Rehman Kiryana Store'}</span>
              </div>
              <div class="hero-badge">
                <span>Verified Retail Partner 🛡️</span>
              </div>
            </div>
          </div>
          <div class="hero-illustration">
            <svg viewBox="0 0 64 64" width="100" height="100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: rgba(255,255,255,0.95);">
              <rect x="8" y="16" width="48" height="40" rx="4" stroke-width="2.5"/>
              <path d="M4 16 L60 16" stroke-width="3"/>
              <path d="M18 16 V8 Q32 4 46 8 V16" stroke-width="2"/>
            </svg>
          </div>
        </div>

        <!-- Quick Actions Row -->
        <div class="mb-6">
          <h4 class="font-semibold mb-2" style="font-size: var(--text-sm); color: #1565c0;">Retail Operations</h4>
          <div class="quick-actions">
            <button class="quick-action-btn" id="action-shop-sale" style="background: rgba(21, 101, 192, 0.08); color: #1565c0; border-color: rgba(21, 101, 192, 0.2);">
              ${icons.plus} Record Shop Sale
            </button>
            <button class="quick-action-btn" id="action-shop-purchase" style="background: rgba(21, 101, 192, 0.08); color: #1565c0; border-color: rgba(21, 101, 192, 0.2);">
              ${icons.minus} Record stock Purchase
            </button>
            <button class="quick-action-btn" id="action-shop-khata" style="background: rgba(21, 101, 192, 0.08); color: #1565c0; border-color: rgba(21, 101, 192, 0.2);">
              📒 Open Khata Book
            </button>
            <button class="quick-action-btn" id="action-shop-reports" style="background: rgba(21, 101, 192, 0.08); color: #1565c0; border-color: rgba(21, 101, 192, 0.2);">
              ${icons.fileText} Sales Statements
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          ${renderStatsCard('Shop Sales Revenue', formatCurrency(revenue), '', 'green', 'trendingUp', 'positive')}
          ${renderStatsCard('Wholesale Stock Expenses', formatCurrency(purchases), '', 'red', 'trendingDown', 'negative')}
          ${renderStatsCard('Total Outstanding Credit', formatCurrency(outstandingCredit), '', 'amber', 'users')}
          ${renderStatsCard('Low Stock Alerts', lowStockAlertsCount, '', lowStockAlertsCount > 0 ? 'red' : 'green', 'package')}
        </div>

        <!-- Two-column Layout -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- Low Stock Warnings -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">Low Stock Alert (Inventory)</h3>
            </div>
            <div class="card-body-full">
              ${renderDataTable(
                [
                  { key: 'name', label: 'Item Name', render: r => `<strong>${r.name}</strong>` },
                  { key: 'stock', label: 'Stock Left', render: r => `<span class="text-danger font-semibold">${r.stock} ${r.unit}</span>` },
                  {
                    key: 'actions',
                    label: 'Reorder',
                    style: 'width: 100px; text-align: center;',
                    render: r => `<button class="btn btn-primary btn-sm reorder-btn" data-id="${r.id}">Refill</button>`
                  }
                ],
                lowStockInventory,
                { emptyMessage: 'All inventory items are in stock!' }
              )}
            </div>
          </div>

          <!-- Khata Balances Preview -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">Outstanding Khata Customers</h3>
              <span class="card-header-action" id="btn-go-khata-shortcut">Go to Khata</span>
            </div>
            <div class="card-body-full">
              ${renderDataTable(
                [
                  { key: 'name', label: 'Customer', render: r => `<strong>${r.name}</strong>` },
                  { key: 'phone', label: 'Phone', render: r => r.phone },
                  { key: 'due', label: 'Balance Due', style: 'text-align: right;', render: r => `<span class="text-danger font-semibold">${formatCurrency(r.totalDue)}</span>` }
                ],
                customers.filter(c => c.totalDue > 0).slice(0, 4),
                { emptyMessage: 'All khata customer accounts are fully cleared! 🟢' }
              )}
            </div>
          </div>
        </div>

        <!-- Recent Ledger entries -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-header-title">Recent Shop Transactions</h3>
          </div>
          <div class="card-body-full">
            ${renderDataTable(
              [
                { key: 'date', label: 'Date', render: r => formatDate(r.date) },
                { key: 'description', label: 'Description' },
                { key: 'category', label: 'Inventory category', render: r => renderBadge(r.category, 'neutral') },
                { key: 'amount', label: 'Amount', style: 'text-align: right;', render: r => {
                    const isPositive = r.amount > 0;
                    return `<span class="${isPositive ? 'text-success' : 'text-danger'} font-semibold">${formatCurrency(r.amount)}</span>`;
                  }
                }
              ],
              txns.slice(0, 5),
              { emptyMessage: 'No shop transactions recorded yet.' }
            )}
          </div>
        </div>
      </div>
    `;

    // Bindings
    document.getElementById('action-shop-sale')?.addEventListener('click', () => openTransactionModal('Sale'));
    document.getElementById('action-shop-purchase')?.addEventListener('click', () => openTransactionModal('Purchase'));
    document.getElementById('action-shop-khata')?.addEventListener('click', () => window.router.navigate('/khata-book'));
    document.getElementById('action-shop-reports')?.addEventListener('click', () => window.router.navigate('/reports'));
    document.getElementById('btn-go-khata-shortcut')?.addEventListener('click', () => window.router.navigate('/khata-book'));

    container.querySelectorAll('.reorder-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = lowStockInventory.find(i => i.id === id);
        if (item) {
          lowStockInventory = lowStockInventory.map(i => i.id === id ? { ...i, stock: i.minLimit + 5 } : i);
          showToast(`Refilled stock for "${item.name}". Added wholesale record to ledger.`, 'success');
          
          // Log wholesale stock purchase to general transactions as outflow
          const newTxn = {
            id: generateId(),
            date: new Date().toISOString().split('T')[0],
            description: `Wholesale inventory refill: ${item.name}`,
            category: 'Shop Inventory Purchase',
            amount: -12000,
            type: 'Purchase'
          };
          store.addToArray('transactions', newTxn);
          render();
        }
      });
    });
  }

  function openTransactionModal(type) {
    const categories = type === 'Sale'
      ? ['Shop Sales Inflow', 'Credit Repayment Received', 'Asset Sale']
      : ['Shop Inventory Purchase', 'Utility Electricity Bill', 'Store Rent', 'Transport Cost'];

    const content = `
      <form id="shop-txn-form" class="animate-fade-in">
        <div class="form-group">
          <label class="form-label">Type</label>
          <input type="text" class="form-input" value="${type === 'Sale' ? 'Shop Sale (Inflow)' : 'Shop Purchase (Outflow)'}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="shop-cat">
            ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <input type="text" class="form-input" id="shop-desc" placeholder="e.g. Sold flour and cooking oil pack" required>
        </div>
        <div class="form-group">
          <label class="form-label">Amount (Rs.)</label>
          <input type="number" class="form-input" id="shop-amount" min="1" placeholder="e.g. 1200" required>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="shop-date" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary" style="background: #1565c0; color: white;">Save Receipt</button>
        </div>
      </form>
    `;

    openModal(`Record Shop ${type === 'Sale' ? 'Receipt' : 'Expense'}`, content);

    document.getElementById('shop-txn-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('shop-cat').value;
      const desc = document.getElementById('shop-desc').value;
      const rawAmt = parseFloat(document.getElementById('shop-amount').value);
      const date = document.getElementById('shop-date').value;

      const amount = type === 'Sale' ? rawAmt : -rawAmt;

      const newTxn = {
        id: generateId(),
        date,
        description: desc,
        category,
        amount,
        type
      };

      store.addToArray('transactions', newTxn);
      showToast('Receipt saved to ledger!', 'success');
      closeModal();
      render();
    });
  }

  // Get shopkeeper profile from mock users
  const state = store.getState();
  const currentUser = state.currentUser || {};

  // Initial render
  render();
}
