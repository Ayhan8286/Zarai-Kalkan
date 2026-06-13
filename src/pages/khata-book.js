// ============================================
// ZARAI KALKAN — Khata Book Page
// ============================================

import store from '../store.js';
import { renderStatsCard } from '../components/stats-card.js';
import { renderBadge } from '../components/badge.js';
import { renderFilterBar } from '../components/filter-bar.js';
import { formatCurrency, formatDate, generateId, debounce, icons } from '../utils/helpers.js';
import { t } from '../i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export default function khataBookPage(container) {
  let searchQuery = '';
  let selectedFilter = 'all'; // 'all', 'pending', 'overdue', 'cleared'

  function render() {
    const state = store.getState();
    const customers = state.customers || [];

    // Process customer list (calculate overdue status based on 30+ days no payment and balance > 0)
    const processedCustomers = customers.map(c => {
      let isOverdue = false;
      if (c.totalDue > 0) {
        if (!c.lastPaymentDate) {
          isOverdue = true;
        } else {
          const lastDate = new Date(c.lastPaymentDate);
          const diffTime = Math.abs(new Date() - lastDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 30) isOverdue = true;
        }
      }
      const calculatedStatus = c.totalDue === 0 ? 'cleared' : (isOverdue ? 'overdue' : 'pending');
      return {
        ...c,
        status: calculatedStatus
      };
    });

    // Filter customers
    const filteredCustomers = processedCustomers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.phone.includes(searchQuery);
      
      let matchesFilter = true;
      if (selectedFilter !== 'all') {
        matchesFilter = c.status === selectedFilter;
      }

      return matchesSearch && matchesFilter;
    });

    // Stats calculations
    const totalCustomers = processedCustomers.length;
    const totalDue = processedCustomers.reduce((sum, c) => sum + (c.totalDue || 0), 0);
    const clearedAccounts = processedCustomers.filter(c => c.status === 'cleared').length;

    container.innerHTML = `
      <div class="khata-page animate-fade-in">
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="page-title font-bold" style="font-size: var(--text-2xl); color: var(--color-primary);">${t('navKhataBook') || 'Khata Book (Credit Ledger)'}</h2>
            <p class="text-xs text-muted">Track customers' credits, shopkeeper tab records, and receive outstanding balances.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-customer">
            ${icons.plus} ${t('addCustomer') || 'Add Customer'}
          </button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          ${renderStatsCard('Total Customers', totalCustomers, '', 'blue', 'users')}
          ${renderStatsCard('Total Credit Outstanding', formatCurrency(totalDue), '', totalDue > 0 ? 'red' : 'green', 'trendingDown', totalDue > 0 ? 'negative' : 'positive')}
          ${renderStatsCard('Cleared Accounts', clearedAccounts, '', 'green', 'award', 'positive')}
        </div>

        <!-- Filters & Search -->
        <div class="card mb-6">
          <div class="card-body-full">
            ${renderFilterBar({
              searchPlaceholder: 'Search customer name or phone number...',
              searchValue: searchQuery,
              filters: [
                {
                  id: 'filter-khata-status',
                  label: 'Status',
                  selected: selectedFilter,
                  options: [
                    { value: 'all', label: 'All Accounts' },
                    { value: 'pending', label: 'Pending Balance' },
                    { value: 'overdue', label: 'Overdue Balance' },
                    { value: 'cleared', label: 'Fully Cleared' }
                  ]
                }
              ]
            })}

            <!-- Grid of Customer Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); margin-top: var(--space-4);">
              ${filteredCustomers.map(c => {
                const badgeType = c.status === 'cleared' ? 'success' : (c.status === 'overdue' ? 'danger' : 'warning');
                const badgeText = c.status.toUpperCase();
                const overdueStyle = c.status === 'overdue' ? 'color: var(--color-danger); font-weight: var(--font-bold);' : '';

                return `
                  <div class="card card-clickable" style="border: 1px solid var(--color-border-light); display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div class="card-body-full">
                      <div class="flex justify-between items-start mb-2">
                        <div>
                          <h4 class="font-bold" style="font-size: var(--text-base);">${c.name}</h4>
                          <p class="text-xs text-muted">${c.phone}</p>
                        </div>
                        ${renderBadge(badgeText, badgeType)}
                      </div>
                      
                      <div style="margin: var(--space-4) 0; padding: var(--space-3); background: var(--color-bg); border-radius: var(--radius-md);">
                        <div class="flex justify-between items-center mb-1 text-xs">
                          <span class="text-muted">Balance Due:</span>
                          <span style="${overdueStyle}">${formatCurrency(c.totalDue)}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs">
                          <span class="text-muted">Last Payment:</span>
                          <span>${formatCurrency(c.lastPayment || 0)}</span>
                        </div>
                        <div class="flex justify-between items-center text-xs mt-1" style="font-size: 10px; opacity: 0.85;">
                          <span class="text-muted">Last Active:</span>
                          <span>${c.lastPaymentDate ? formatDate(c.lastPaymentDate) : 'No recent payment'}</span>
                        </div>
                      </div>
                    </div>

                    <div class="card-footer" style="padding: var(--space-3) var(--space-4); background: var(--color-bg-alt); gap: var(--space-2);">
                      <button class="btn btn-secondary btn-sm flex-1 record-payment-btn" data-id="${c.id}" ${c.totalDue === 0 ? 'disabled' : ''}>Payment</button>
                      <button class="btn btn-secondary btn-sm flex-1 record-debt-btn" data-id="${c.id}">Add Debt</button>
                      <button class="btn btn-outline btn-sm flex-1 view-history-btn" data-id="${c.id}">History</button>
                    </div>
                  </div>
                `;
              }).join('')}
              
              ${filteredCustomers.length === 0 ? `
                <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
                  <div class="empty-state-title">No customers found</div>
                  <p class="empty-state-text">No ledger accounts match your search query.</p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    document.getElementById('btn-add-customer')?.addEventListener('click', openAddCustomerModal);

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value;
        render();
      }, 300));
    }

    document.getElementById('filter-khata-status')?.addEventListener('change', (e) => {
      selectedFilter = e.target.value;
      render();
    });

    container.querySelectorAll('.record-payment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cust = customers.find(c => c.id === id);
        if (cust) openPaymentModal(cust);
      });
    });

    container.querySelectorAll('.record-debt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cust = customers.find(c => c.id === id);
        if (cust) openDebtModal(cust);
      });
    });

    container.querySelectorAll('.view-history-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cust = customers.find(c => c.id === id);
        if (cust) openHistoryModal(cust);
      });
    });
  }

  function openAddCustomerModal() {
    const content = `
      <form id="add-cust-form">
        <div class="form-group">
          <label class="form-label">Customer Name</label>
          <input type="text" class="form-input" id="cust-name" placeholder="e.g. Mohammad Bilal" required>
        </div>
        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <input type="tel" class="form-input" id="cust-phone" placeholder="e.g. 0300-1234567" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" id="cust-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Account</button>
        </div>
      </form>
    `;

    openModal('Add New Khata Customer', content);
    document.getElementById('cust-cancel')?.addEventListener('click', closeModal);

    document.getElementById('add-cust-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cust-name').value;
      const phone = document.getElementById('cust-phone').value;

      const newCust = {
        id: generateId(),
        name,
        phone,
        totalDue: 0,
        lastPayment: 0,
        lastPaymentDate: null,
        status: 'cleared',
        history: []
      };

      store.addToArray('customers', newCust);
      showToast(`Account created for ${name}`, 'success');
      closeModal();
      render();
    });
  }

  function openPaymentModal(customer) {
    const content = `
      <form id="record-payment-form">
        <div class="form-group">
          <label class="form-label">Customer Name</label>
          <input type="text" class="form-input" value="${customer.name}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Current Balance Due</label>
          <input type="text" class="form-input" value="${formatCurrency(customer.totalDue)}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Payment Amount Received (Rs.)</label>
          <input type="number" class="form-input" id="payment-amount" min="1" max="${customer.totalDue}" placeholder="e.g. 2000" required>
        </div>
        <div class="form-group">
          <label class="form-label">Date Received</label>
          <input type="date" class="form-input" id="payment-date" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" id="payment-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Record Payment</button>
        </div>
      </form>
    `;

    openModal('Record Balance Payment', content);
    document.getElementById('payment-cancel')?.addEventListener('click', closeModal);

    document.getElementById('record-payment-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('payment-amount').value);
      const date = document.getElementById('payment-date').value;

      const newBalance = customer.totalDue - amount;
      const historyEntry = {
        id: generateId(),
        date,
        type: 'payment',
        amount: amount,
        description: 'Balance Payment Received'
      };

      const history = [...(customer.history || []), historyEntry];

      store.updateInArray('customers', customer.id, {
        totalDue: newBalance,
        lastPayment: amount,
        lastPaymentDate: date,
        history
      });

      // Also log to general accounting transactions as an inflow
      const newTxn = {
        id: generateId(),
        date,
        description: `Khata Payment: ${customer.name}`,
        category: 'Khata Payment',
        amount: amount,
        type: 'Sale'
      };
      store.addToArray('transactions', newTxn);

      showToast(`Recorded Rs. ${amount} payment from ${customer.name}`, 'success');
      closeModal();
      render();
    });
  }

  function openDebtModal(customer) {
    const content = `
      <form id="record-debt-form">
        <div class="form-group">
          <label class="form-label">Customer Name</label>
          <input type="text" class="form-input" value="${customer.name}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Credit / Debt Description</label>
          <input type="text" class="form-input" id="debt-desc" placeholder="e.g. Purchase of 2 fertilizer bags on credit" required>
        </div>
        <div class="form-group">
          <label class="form-label">Debt Amount (Rs.)</label>
          <input type="number" class="form-input" id="debt-amount" min="1" placeholder="e.g. 3500" required>
        </div>
        <div class="form-group">
          <label class="form-label">Date Issued</label>
          <input type="date" class="form-input" id="debt-date" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none;">
          <button type="button" class="btn btn-secondary" id="debt-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Record Debt</button>
        </div>
      </form>
    `;

    openModal('Add Credit / Debt Entry', content);
    document.getElementById('debt-cancel')?.addEventListener('click', closeModal);

    document.getElementById('record-debt-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = document.getElementById('debt-desc').value;
      const amount = parseFloat(document.getElementById('debt-amount').value);
      const date = document.getElementById('debt-date').value;

      const newBalance = customer.totalDue + amount;
      const historyEntry = {
        id: generateId(),
        date,
        type: 'debt',
        amount: amount,
        description: desc
      };

      const history = [...(customer.history || []), historyEntry];

      store.updateInArray('customers', customer.id, {
        totalDue: newBalance,
        history
      });

      showToast(`Recorded Rs. ${amount} credit to ${customer.name}`, 'success');
      closeModal();
      render();
    });
  }

  function openHistoryModal(customer) {
    const history = customer.history || [];
    const timelineHtml = history.length === 0
      ? '<div class="text-center text-muted" style="padding: var(--space-6) 0;">No credit transaction history for this customer.</div>'
      : `
        <div class="timeline" style="max-height: 400px; overflow-y: auto; padding-inline-start: var(--space-4);">
          ${history.slice().sort((a,b) => new Date(b.date) - new Date(a.date)).map(h => {
            const isPayment = h.type === 'payment';
            const dotClass = isPayment ? 'success' : 'warning';
            const typeLabel = isPayment ? 'Payment Received' : 'Debt Registered';
            const amtColor = isPayment ? 'text-success' : 'text-danger';
            const amtPrefix = isPayment ? '-' : '+';
            
            return `
              <div class="timeline-item">
                <div class="timeline-marker">
                  <div class="timeline-dot ${dotClass}"></div>
                  <div class="timeline-line"></div>
                </div>
                <div class="timeline-content">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="timeline-title">${h.description}</h4>
                      <p class="timeline-description text-muted">${typeLabel}</p>
                    </div>
                    <span class="${amtColor} font-semibold" style="font-size: var(--text-sm);">${amtPrefix}${formatCurrency(h.amount)}</span>
                  </div>
                  <div class="timeline-date">${formatDate(h.date)}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

    const content = `
      <div>
        <div class="flex justify-between items-center mb-4" style="background: var(--color-bg); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md);">
          <div>
            <h4 class="font-bold">${customer.name}</h4>
            <p class="text-xs text-muted">Phone: ${customer.phone}</p>
          </div>
          <div class="text-end">
            <div class="text-xs text-muted">Outstanding balance:</div>
            <h3 class="font-bold ${customer.totalDue > 0 ? 'text-danger' : 'text-success'}">${formatCurrency(customer.totalDue)}</h3>
          </div>
        </div>
        
        <h4 class="font-semibold mb-3" style="font-size: var(--text-sm);">Activity History Ledger</h4>
        ${timelineHtml}

        <div class="modal-footer" style="padding-bottom: 0; padding-right: 0; border: none; margin-top: var(--space-4);">
          <button class="btn btn-secondary" onclick="closeModal()">Close Ledger</button>
        </div>
      </div>
    `;

    openModal('Khata Customer Statement', content, { size: 'lg' });
  }

  // Initial render
  render();
}
